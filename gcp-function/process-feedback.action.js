const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const { zodResponseFormat } = require('openai/helpers/zod');
const { z } = require('zod');

const {
  INSIGHT_IMPROVEMENTS_ASSISTANT_INSTRUCTIONS,
  INSIGHT_OVERVIEW_ASSISTANT_INSTRUCTIONS,
  INSIGHT_SKILLS_ASSISTANT_INSTRUCTIONS,
  INSIGHT_VALUES_ASSISTANT_INSTRUCTIONS,
} = require('./_prompts/index.js');

const InsightOverviewInputSchema = z.object({
  user_id: z.string().uuid(),
  profile_summary: z.string().nullable(),
  strengths: z.array(z.string()).nullable(),
  areas_for_improvement: z.array(z.string()).nullable(),
  key_characteristics: z.array(z.string()).nullable(),
  critical_focus_areas: z.array(z.string()).nullable(),
});

const InsightImprovementsInputSchema = z.object({
  user_id: z.string().uuid(),
  run_id: z.string().uuid(),
  improvements: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      actions: z.array(z.string()),
    })
  ),
});

const InsightImprovementsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  run_id: z.string().uuid(),
  improvements: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      actions: z.array(z.string()),
    })
  ),
  created_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
});

const InsightValuesInputSchema = z.object({
  user_id: z.string().uuid(),
  be_open_rate: z.number().int().min(0).max(100).nullable(),
  be_bold_rate: z.number().int().min(0).max(100).nullable(),
  move_faster_rate: z.number().int().min(0).max(100).nullable(),
  stay_updated_rate: z.number().int().min(0).max(100).nullable(),
  achieve_together_rate: z.number().int().min(0).max(100).nullable(),
  be_open_details: z.string().nullable(),
  be_bold_details: z.string().nullable(),
  move_faster_details: z.string().nullable(),
  stay_updated_details: z.string().nullable(),
  achieve_together_details: z.string().nullable(),
});

const getOrCreateAssistant = async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Try to fetch existing assistant
  const { data, error } = await supabase
    .from('assistants')
    .select('id')
    .eq('name', 'Reflection Coach')
    .single();

  // If not existing row, create new assistant
  if (error && error.code === 'PGRST116') {
    const assistant = await openai.beta.assistants.create({
      name: 'Reflection Coach',
      instructions: `
        You are a Reflection Coach. Guide users through self-reflection with an emphasis on personal growth and alignment with company values.
        Keep your responses concise, polite, and positive. Always respond in the same language as the user.
        Encourage reflection on achievements, challenges, and areas for improvement while maintaining a forward-looking and constructive tone.
        Focus on helping the user align their personal experiences with their growth goals and AnyMind's values of openness, boldness, speed, continuous learning, and collaboration.
        Stay within the theme of personal development and avoid unnecessary tangents. 
      `,
      tools: [],
      model: 'gpt-4o-2024-08-06',
    });

    await supabase.from('assistants').insert([
      {
        name: 'Reflection Coach',
        id: assistant.id,
      },
    ]);

    return assistant;
  }

  if (error) {
    throw error;
  }

  // Retrieve existing assistant
  return await openai.beta.assistants.retrieve(data.id);
};

const SkillRatingSchema = z.object({
  rating: z.number(),
  details: z.string(),
});

const CommunicationSchema = z.object({
  clarity: SkillRatingSchema,
  listening: SkillRatingSchema,
});

const ProblemSolvingSchema = z.object({
  critical_thinking: SkillRatingSchema,
  creativity: SkillRatingSchema,
});

const CollaborationSchema = z.object({
  team_contribution: SkillRatingSchema,
  conflict_resolution: SkillRatingSchema,
});

const LeadershipSchema = z.object({
  initiative: SkillRatingSchema,
  motivation: SkillRatingSchema,
});

const InsightSkillsInputSchema = z.object({
  user_id: z.string().uuid(),
  communication: CommunicationSchema,
  problem_solving: ProblemSolvingSchema,
  collaboration: CollaborationSchema,
  leadership: LeadershipSchema,
});

const InsightSkillsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  communication: CommunicationSchema,
  problem_solving: ProblemSolvingSchema,
  collaboration: CollaborationSchema,
  leadership: LeadershipSchema,
  created_at: z.string().datetime(),
});

async function parseOpenAIResponse(messages, schema, additionalData = {}) {
  console.log('[parseOpenAIResponse] Starting to parse response');
  const message = messages.data[0];

  const messageContent = message?.content[0];

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

const generateInsightPrompt = (feedbacksAndReflections) => {
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

async function generateInsightOverview({ openai, thread, assistant, userId }) {
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

async function generateInsightValues({ openai, thread, assistant, userId }) {
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

async function processInsights(processId, userId) {
  console.log('[processInsights] Starting process for user:', userId);
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
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
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
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

module.exports = {
  processInsights,
  generateInsightPrompt,
  InsightOverviewInputSchema,
  InsightImprovementsInputSchema,
  InsightImprovementsSchema,
  InsightValuesInputSchema,
  CommunicationSchema,
  ProblemSolvingSchema,
  CollaborationSchema,
  LeadershipSchema,
  InsightSkillsInputSchema,
  InsightSkillsSchema,
  getOrCreateAssistant,
};
