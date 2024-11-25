'use server';

import { createClient } from '~aspire/external/supabase/server';
import { ErrorUtils } from '~aspire/shared/utils';

export interface UpdateUserSettingsHandlerInput {
  email: string | null;
  password: string | null;
}

export const updateUserSettingsHandler = async ({
  email,
  password,
}: UpdateUserSettingsHandlerInput) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.updateUser({
      ...(email && { email }),
      ...(password && { password }),
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
