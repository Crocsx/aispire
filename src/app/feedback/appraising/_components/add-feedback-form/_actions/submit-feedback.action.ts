'use server';

import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

import { createOpenAI } from '~aispire/external/openai/server';
import { createClient } from '~aispire/external/supabase/server';
import { FeedbackInputSchema, FeedbackType } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

import { getOrCreateAssistant } from 'src/assistants';

import {
  generateUserPrompt,
  ASSISTANT_INSTRUCTIONS,
} from './submit-feedback.prompt';

export interface SubmitFeedbackAction {
  content: string;
  type: z.infer<typeof FeedbackType>;
  to_user_id: string;
}

export const submitFeedback = async ({
  content,
  type,
  to_user_id,
}: SubmitFeedbackAction) => {
  try {
    const supabase = await createClient();
    const openai = await createOpenAI();
    const assistant = await getOrCreateAssistant();
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: generateUserPrompt({ content, type, to_user_id }),
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

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const feedback = FeedbackInputSchema.parse({
      content: content,
      type: type,
      to_user_id: to_user_id,
      from_user_id: user.id,
      ...parsedJson,
    });

    const { error } = await supabase.from('user_feedbacks').insert([feedback]);

    if (error) {
      throw error;
    }

    return {
      success: true,
      error: undefined,
      data: feedback,
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
