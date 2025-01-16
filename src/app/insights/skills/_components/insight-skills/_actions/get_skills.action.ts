'use server';

import { z } from 'zod';

import { createClient } from '~aispire/external/supabase/server';
import { InsightSkillsSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export type InsightSkillsData = z.infer<typeof InsightSkillsSchema>;

export const getSkills = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('insights_skills')
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
      data: data as InsightSkillsData,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
