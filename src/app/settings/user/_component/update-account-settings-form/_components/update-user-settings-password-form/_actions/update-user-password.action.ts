'use client';

import { createClient } from '~aispire/external/supabase';
import { ErrorUtils } from '~aispire/shared/utils';

export interface UpdateUserPasswordHandlerInput {
  password: string;
}

export const updateUserPasswordHandler = async ({
  password,
}: UpdateUserPasswordHandlerInput) => {
  try {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.updateUser({
      password,
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
