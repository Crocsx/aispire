'use client';

import { createClient } from '~aspire/external/supabase';
import { ErrorUtils } from '~aspire/shared/utils';

export interface UpdateUserEmailHandlerInput {
  email: string;
}

export const updateUserEmailHandler = async ({
  email,
}: UpdateUserEmailHandlerInput) => {
  try {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.updateUser({
      email,
    });

    if (error) {
      throw error;
    }
    return { success: true, data };
  } catch (error: unknown) {
    console.error(error);
    return { success: false, error: ErrorUtils.getErrorMessage(error) };
  }
};
