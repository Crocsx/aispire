import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { MessagesPage } from 'openai/resources/beta/threads/messages';
import { z } from 'zod';

import { createOpenAI } from '~aispire/external/openai/server';
import { createClient } from '~aispire/external/supabase/server';
import {
  CollaborationSchema,
  CommunicationSchema,
  InsightImprovementsInputSchema,
  InsightOverviewInputSchema,
  InsightSkillsInputSchema,
  InsightValuesInputSchema,
  LeadershipSchema,
  ProblemSolvingSchema,
} from '~aispire/shared/schema';

import { getOrCreateAssistant } from 'src/assistants';

import {
  INSIGHT_IMPROVEMENTS_ASSISTANT_INSTRUCTIONS,
  INSIGHT_OVERVIEW_ASSISTANT_INSTRUCTIONS,
  INSIGHT_SKILLS_ASSISTANT_INSTRUCTIONS,
  INSIGHT_VALUES_ASSISTANT_INSTRUCTIONS,
} from './_prompts';

async function parseOpenAIResponse<T>(
  messages: MessagesPage,
  schema: z.ZodSchema<T>,
  additionalData: Record<string, unknown> = {}
): Promise<T> {
  console.log('[parseOpenAIResponse] Starting to parse response');
  const message = messages.data[0];

  const messageContent = message?.content[0] as {
    type: 'text';
    text: { value: string };
  };

  if (!messageContent?.text?.value) {
    console.error('[parseOpenAIResponse] No content in response');
    throw new Error('No content in response');
  }

  let parsedJson;
  try {
    console.log(
      '[parseOpenAIResponse] Raw response:',
      messageContent.text.value
    );
    parsedJson = JSON.parse(messageContent.text.value);
  } catch (error) {
    console.error('[parseOpenAIResponse] JSON parse error:', error);
    parsedJson = {};
  }

  console.log('[parseOpenAIResponse] Parsed JSON:', parsedJson);
  return schema.parse({
    ...additionalData,
    ...parsedJson,
  });
}

export const generateInsightPrompt = (
  feedbacksAndReflections: { output_summary: string; type: string }[]
) => {
  console.log(
    '[generateInsightPrompt] Generating prompt with',
    feedbacksAndReflections.length,
    'items'
  );
  return `
Here the feedback and reflection I received:

   ${feedbacksAndReflections.map(
     (feedbacksOrReflection) => `
   - ${feedbacksOrReflection.type}:${feedbacksOrReflection.output_summary}
   
   `
   )}
   
   Please wait for instruction before replying.
`;
};

async function generateInsightOverview({
  openai,
  thread,
  assistant,
  userId,
}: {
  openai: OpenAI;
  thread: { id: string };
  assistant: { id: string };
  userId: string;
}) {
  console.log('[generateInsightOverview] Starting for user:', userId);
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
    instructions: INSIGHT_OVERVIEW_ASSISTANT_INSTRUCTIONS,
    response_format: zodResponseFormat(
      z.object({
        profile_summary: z.string().nullable(),
        strengths: z.array(z.string()).nullable(),
        areas_for_improvement: z.array(z.string()).nullable(),
        key_characteristics: z.array(z.string()).nullable(),
        critical_focus_areas: z.array(z.string()).nullable(),
      }),
      'insights_overview'
    ),
  });

  console.log('[generateInsightOverview] Run completed, fetching messages');
  const message = await openai.beta.threads.messages.list(run.thread_id);

  const insightOverview = await parseOpenAIResponse(
    message,
    InsightOverviewInputSchema,
    { user_id: userId }
  );

  console.log('[generateInsightOverview] Successfully generated overview');
  return insightOverview;
}

async function generateInsightValues({
  openai,
  thread,
  assistant,
  userId,
}: {
  openai: OpenAI;
  thread: { id: string };
  assistant: { id: string };
  userId: string;
}) {
  console.log('[generateInsightValues] Starting for user:', userId);
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
    instructions: INSIGHT_VALUES_ASSISTANT_INSTRUCTIONS,
    response_format: zodResponseFormat(
      z.object({
        be_open_rate: z.number(),
        be_open_details: z.string(),
        be_bold_rate: z.number(),
        be_bold_details: z.string(),
        move_faster_rate: z.number(),
        move_faster_details: z.string(),
        stay_updated_rate: z.number(),
        stay_updated_details: z.string(),
        achieve_together_rate: z.number(),
        achieve_together_details: z.string(),
      }),
      'insights_values'
    ),
  });

  console.log('[generateInsightValues] Run completed, fetching messages');
  const message = await openai.beta.threads.messages.list(run.thread_id);

  const insightValues = await parseOpenAIResponse(
    message,
    InsightValuesInputSchema,
    { user_id: userId }
  );

  console.log('[generateInsightValues] Successfully generated values');
  return insightValues;
}

async function generateInsightSkills({
  openai,
  thread,
  assistant,
  userId,
  runId,
}: {
  openai: OpenAI;
  thread: { id: string };
  assistant: { id: string };
  userId: string;
  runId: string;
}) {
  console.log('[generateInsightSkills] Starting for user:', userId);
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
    instructions: INSIGHT_SKILLS_ASSISTANT_INSTRUCTIONS,
    response_format: zodResponseFormat(
      z.object({
        communication: CommunicationSchema,
        problem_solving: ProblemSolvingSchema,
        collaboration: CollaborationSchema,
        leadership: LeadershipSchema,
      }),
      'insights_skills'
    ),
  });

  console.log('[generateInsightSkills] Run completed, fetching messages');
  const message = await openai.beta.threads.messages.list(run.thread_id);

  const insightSkills = await parseOpenAIResponse(
    message,
    InsightSkillsInputSchema,
    { user_id: userId, run_id: runId }
  );

  console.log('[generateInsightSkills] Successfully generated skills');
  return insightSkills;
}

async function generateInsightImprovements({
  openai,
  thread,
  assistant,
  userId,
  runId,
}: {
  openai: OpenAI;
  thread: { id: string };
  assistant: { id: string };
  userId: string;
  runId: string;
}) {
  console.log('[generateInsightImprovements] Starting for user:', userId);
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
    instructions: INSIGHT_IMPROVEMENTS_ASSISTANT_INSTRUCTIONS,
    response_format: zodResponseFormat(
      z.object({
        improvements: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            actions: z.array(z.string()),
          })
        ),
      }),
      'insights_improvements'
    ),
  });

  console.log('[generateInsightImprovements] Run completed, fetching messages');
  const message = await openai.beta.threads.messages.list(run.thread_id);

  const insightImprovements = await parseOpenAIResponse(
    message,
    InsightImprovementsInputSchema,
    { user_id: userId, run_id: runId }
  );

  console.log(
    '[generateInsightImprovements] Successfully generated improvements'
  );
  return insightImprovements;
}

export async function processInsights(processId: string, userId: string) {
  console.log('[processInsights] Starting process for user:', userId);
  try {
    const supabase = await createClient();
    const openai = await createOpenAI();
    const assistant = await getOrCreateAssistant();
    const thread = await openai.beta.threads.create();

    // Calculate date 12 months ago
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    console.log('[processInsights] Fetching feedback data');
    // Fetch last 12 months of data (limited to 30 records) for insight generation
    const [allReflectionsAndFeedbacks] = await Promise.all([
      supabase
        .from('combined_feedback_reflections')
        .select('output_summary, type')
        .eq('to_user_id', userId)
        .gte('created_at', twelveMonthsAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(30),
    ]);

    const feedbackData = allReflectionsAndFeedbacks.data || [];
    console.log(
      '[processInsights] Found',
      feedbackData.length,
      'feedback items'
    );

    const params = {
      openai,
      thread,
      assistant,
      userId,
      runId: processId,
    };

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: generateInsightPrompt(feedbackData),
    });

    console.log('[processInsights] Starting insight generation sequence');
    const insightRecap = await generateInsightOverview(params);
    const { error: e } = await supabase
      .from('insights_overview')
      .insert(insightRecap);
    if (e) throw e;

    const values = await generateInsightValues(params);
    const { error: ev } = await supabase.from('insights_values').insert(values);
    if (ev) throw ev;

    const skills = await generateInsightSkills(params);
    const { error: es } = await supabase.from('insights_skills').insert(skills);
    if (es) throw es;

    const improvements = await generateInsightImprovements(params);
    const { error: ei } = await supabase
      .from('insights_improvements')
      .insert(improvements);
    if (ei) throw ei;

    console.log('[processInsights] All insights generated successfully');
    // Update process status to completed
    await supabase
      .from('insights_processes')
      .update({ status: 'completed' })
      .eq('id', processId);
  } catch (error) {
    console.error('[processInsights] Error:', error);
    const supabase = await createClient();
    // Update process status to failed
    await supabase
      .from('insights_processes')
      .update({
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      .eq('id', processId);

    throw error;
  }
}
