'use client';

import { createClient } from '~aspire/external/supabase';
import { ErrorUtils } from '~aspire/shared/utils';

export interface ManualSignInHandlerInput {
  email: string;
  password: string;
}

export const manualSignInHandler = async ({
  email,
  password,
}: ManualSignInHandlerInput) => {
  try {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
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
