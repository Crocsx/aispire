'use server';

import { z } from 'zod';

import { createClient } from '~aispire/external/supabase/server';
import {
  InsightOverviewSchema,
  InsightSkillsSchema,
  InsightValuesSchema,
} from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export type DashboardData = {
  insights: {
    overview: z.infer<typeof InsightOverviewSchema> | null;
    skills: z.infer<typeof InsightSkillsSchema> | null;
    values: z.infer<typeof InsightValuesSchema> | null;
  };
  feedbacks: {
    id: string;
    from_user_name: string;
    content: string;
    created_at: string;
    type: string;
  }[];
  lastReflection: {
    created_at: string;
  } | null;
};

export const getDashboardData = async () => {
  try {
    const supabase = await createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const [
      overviewResult,
      skillsResult,
      valuesResult,
      combinedActivitiesResult,
    ] = await Promise.all([
      supabase
        .from('insights_overview')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
      supabase
        .from('insights_skills')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
      supabase
        .from('insights_values')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
      supabase
        .from('combined_feedback_reflections')
        .select(
          'id, output_condensed_summary, output_condensed_suggestion, user_name, from_user_id, to_user_id, avatar_url, created_at, type'
        )
        .eq('to_user_id', userId)
        .order('created_at', { ascending: false }),
    ]);

    const feedbacks = (combinedActivitiesResult.data || [])
      .filter((item) => item.type === 'feedback')
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        from_user_name: item.user_name,
        content: item.output_condensed_summary,
        created_at: item.created_at,
        type: item.type,
      }));

    const lastReflection = (combinedActivitiesResult.data || []).find(
      (item) => item.type === 'reflection'
    );

    return {
      success: true,
      error: undefined,
      data: {
        insights: {
          overview: overviewResult.data,
          skills: skillsResult.data,
          values: valuesResult.data,
        },
        feedbacks,
        lastReflection: lastReflection
          ? { created_at: lastReflection.created_at }
          : null,
      } as DashboardData,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
