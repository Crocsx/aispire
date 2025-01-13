'use server';

import { z } from 'zod';

import { createClient } from '~aispire/external/supabase/server';
import { InsightValuesSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export type InsightValuesData = z.infer<typeof InsightValuesSchema>;

export const getValues = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('insights_values')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      error: undefined,
      data: data as InsightValuesData,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
