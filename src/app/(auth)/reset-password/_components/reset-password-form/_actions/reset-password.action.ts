'use server';

import { createClient } from '~aspire/external/supabase/server';
import { ErrorUtils } from '~aspire/shared/utils';

export interface ResetPasswordHandleInput {
  password: string;
  redirectTo?: string;
}

export const resetFormPassword = async ({
  password,
}: ResetPasswordHandleInput) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.log(error);
    return { success: false, error: ErrorUtils.getErrorMessage(error) };
  }
};
