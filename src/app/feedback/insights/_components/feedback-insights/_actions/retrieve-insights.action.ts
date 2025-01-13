'use server';

import { z } from 'zod';

import { createClient } from '~aispire/external/supabase/server';
import { ReflectionInsightSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export type ReflectionInsight = z.infer<typeof ReflectionInsightSchema>;

export const retrieveInsights = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_feedback_reflection_insights')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    return {
      success: true,
      error: undefined,
      data: data?.[0] as ReflectionInsight,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
