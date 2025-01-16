'use server';

import { z } from 'zod';

import { createClient } from '~aispire/external/supabase/server';
import { InsightImprovementsSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export type InsightImprovementsData = z.infer<typeof InsightImprovementsSchema>;

export const getImprovements = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('insights_improvements')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return {
          success: true,
          error: undefined,
          data: null,
        };
      }
      throw error;
    }

    return {
      success: true,
      error: undefined,
      data: data as InsightImprovementsData,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
