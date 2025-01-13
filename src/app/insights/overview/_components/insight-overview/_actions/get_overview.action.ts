'use server';

import { z } from 'zod';

import { createClient } from '~aispire/external/supabase/server';
import { InsightOverviewSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export type InsightOverviewData = z.infer<typeof InsightOverviewSchema>;

export const getOverview = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('insights_overview')
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
      data: data as InsightOverviewData,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
