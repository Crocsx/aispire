'use server';

import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

import { createOpenAI } from '~aispire/external/openai/server';
import { createClient } from '~aispire/external/supabase/server';
import { ReflectionInputSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

import { getOrCreateThread } from 'src/assistants';
import { getOrCreateAssistant } from 'src/assistants/assistants';

import {
  ASSISTANT_INSTRUCTIONS,
  generateUserPrompt,
} from './reflection.prompt';

export interface SubmitReflectionAction {
  success: string;
  challenge: string;
  focus: string;
}

export const submitReflection = async ({
  success,
  challenge,
  focus,
}: SubmitReflectionAction) => {
  try {
    const supabase = await createClient();
    const openai = await createOpenAI();
    const assistant = await getOrCreateAssistant();
    const thread = await getOrCreateThread(assistant.id);

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: generateUserPrompt({
        success,
        challenge,
        focus,
      }),
    });
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id,
      instructions: ASSISTANT_INSTRUCTIONS,
      response_format: zodResponseFormat(
        z.object({
          output_summary: z.string().optional().catch(''),
          output_suggestion: z.string().optional().catch(''),
          output_points_improved: z.array(z.string()).optional().catch([]),
          output_points_to_improve: z.array(z.string()).optional().catch([]),
          output_condensed_summary: z.string().optional().catch(''),
          output_condensed_suggestion: z.string().optional().catch(''),
          incomplete: z.boolean().optional().catch(false),
        }),
        'reflection_analysis'
      ),
    });

    const messages = await openai.beta.threads.messages.list(run.thread_id);
    const message = messages.data[0];

    const messageContent = message?.content[0] as {
      type: 'text';
      text: { value: string };
    };
    if (!messageContent?.text?.value) {
      throw new Error('No content in response');
    }
    let parsedJson;
    try {
      parsedJson = JSON.parse(messageContent.text.value);
    } catch {
      parsedJson = {};
    }

    if (parsedJson.incomplete) {
      return {
        success: false,
        error: 'No enough information to provide a reflection',
        data: null,
      };
    }

    const analysis = ReflectionInputSchema.parse({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      input_success: success,
      input_challenge: challenge,
      input_focus: focus,
      ...parsedJson,
    });

    const { error } = await supabase
      .from('user_reflections')
      .insert([analysis]);

    if (error) {
      throw error;
    }

    return {
      success: true,
      error: undefined,
      data: analysis,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
