'use server';

import { createClient } from '~aispire/external/supabase/server';
import { FeedbackSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export const retrieveFeedback = async (id: string) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_feedbacks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Feedback not found');
    }

    return {
      success: true,
      error: undefined,
      data: FeedbackSchema.parse(data),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
