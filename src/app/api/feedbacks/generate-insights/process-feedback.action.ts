import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { MessagesPage } from 'openai/resources/beta/threads/messages';
import { v4 as uuidv4 } from 'uuid';
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

  return schema.parse({
    ...additionalData,
    ...parsedJson,
  });
}

export const generateInsightPrompt = (
  feedbacksAndReflections: { output_summary: string; type: string }[]
) => `
Here the feedback and reflection I received:

   ${feedbacksAndReflections.map(
     (feedbacksOrReflection) => `
   - ${feedbacksOrReflection.type}:${feedbacksOrReflection.output_summary}
   
   `
   )}
   
   Please wait for instruction before replying.
`;

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

  const message = await openai.beta.threads.messages.list(run.thread_id);

  const insightOverview = await parseOpenAIResponse(
    message,
    InsightOverviewInputSchema,
    { user_id: userId }
  );

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

  const message = await openai.beta.threads.messages.list(run.thread_id);

  const insightValues = await parseOpenAIResponse(
    message,
    InsightValuesInputSchema,
    { user_id: userId }
  );

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

  const message = await openai.beta.threads.messages.list(run.thread_id);

  const insightSkills = await parseOpenAIResponse(
    message,
    InsightSkillsInputSchema,
    { user_id: userId, run_id: runId }
  );

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

  const message = await openai.beta.threads.messages.list(run.thread_id);

  const insightImprovements = await parseOpenAIResponse(
    message,
    InsightImprovementsInputSchema,
    { user_id: userId, run_id: runId }
  );

  return insightImprovements;
}

async function processInsights(processId: string, userId: string) {
  try {
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
        .from('combined_feedback_reflections')
        .select('output_summary, type')
        .eq('to_user_id', userId)
        .gte('created_at', twelveMonthsAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(30),
    ]);

    const feedbackData = allReflectionsAndFeedbacks.data || [];
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

    // Update process status to completed
    await supabase
      .from('insights_processes')
      .update({ status: 'completed' })
      .eq('id', processId);
  } catch (error) {
    console.log(error);
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

export async function processUserFeedback(userId: string) {
  const processId = uuidv4();
  const supabase = await createClient();

  // Create process record
  await supabase.from('insights_processes').insert({
    id: processId,
    user_id: userId,
    status: 'processing',
  });

  // Start processing in background
  processInsights(processId, userId).catch(console.error);

  return {
    processId,
    userId,
    status: 'processing',
  };
}
