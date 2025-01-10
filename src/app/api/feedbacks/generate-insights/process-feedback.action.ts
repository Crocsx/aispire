import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

import { createOpenAI } from '~aispire/external/openai/server';
import { createClient } from '~aispire/external/supabase/server';
import { ReflectionInsightInputSchema } from '~aispire/shared/schema';

import { getOrCreateAssistant } from 'src/assistants';

import {
  ASSISTANT_INSTRUCTIONS,
  generateInsightPrompt,
} from './generate-insight.prompt';

export async function processUserFeedback(userId: string) {
  const supabase = await createClient();

  const openai = await createOpenAI();
  const assistant = await getOrCreateAssistant();
  const thread = await openai.beta.threads.create();

  // Calculate date 12 months ago
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  // Fetch last 12 months of data (limited to 30 records) for insight generation
  const [allReflectionsAndFeedbacks] = await Promise.all([
    supabase
      .from('user_feedback_insight')
      .select('output_summary, type')
      .eq('from_user_id', userId)
      .gte('created_at', twelveMonthsAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(30),
  ]);

  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: generateInsightPrompt(allReflectionsAndFeedbacks.data || []),
  });
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
    instructions: ASSISTANT_INSTRUCTIONS,
    response_format: zodResponseFormat(
      z.object({
        feedback_summary: z.string().optional().catch(''),
        strength_points: z.array(z.string()).optional().catch([]),
        improvement_points: z.array(z.string()).optional().catch([]),
        suggested_path: z.array(z.string()).optional().catch([]),
        suggested_ressources: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
              link: z.string(),
            })
          )
          .optional()
          .catch([]),
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

  const insights = ReflectionInsightInputSchema.parse({
    user_id: userId,
    ...parsedJson,
  });

  // Save the insight
  const { error } = await supabase
    .from('user_feedback_insight')
    .insert(insights);

  if (error) throw error;

  return userId;
}
