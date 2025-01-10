'use server';

import { createClient } from '~aispire/external/supabase/server';
import { ErrorUtils } from '~aispire/shared/utils';

import { HistoryTimelineItemSchema } from '../_type';

export const retrieveFeedbackActivityItems = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('combined_feedback_reflections')
      .select(
        'id, output_condensed_summary, output_condensed_suggestion, user_name, from_user_id, to_user_id, avatar_url, created_at, type'
      )
      .eq('to_user_id', (await supabase.auth.getUser()).data.user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Error fetching combined data:', error);
    }

    return {
      success: true,
      error: undefined,
      data: (data || [])?.map((row) => HistoryTimelineItemSchema.parse(row)),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: undefined,
    };
  }
};
