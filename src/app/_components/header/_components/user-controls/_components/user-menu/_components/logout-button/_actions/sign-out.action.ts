'use client';

import { createClient } from '~aispire/external/supabase';
import { ErrorUtils } from '~aispire/shared/utils';

export const SignOutHandler = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
    return { success: true };
  } catch (error: unknown) {
    console.error(error);
    return { success: false, error: ErrorUtils.getErrorMessage(error) };
  }
};
