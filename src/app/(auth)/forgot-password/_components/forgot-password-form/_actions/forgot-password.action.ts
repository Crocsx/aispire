'use server';

import { headers } from 'next/headers';

import { createClient } from '~aspire/external/supabase/server';
import { ErrorUtils } from '~aspire/shared/utils';

import { PATHS } from 'src/config';

export interface ForgotPasswordHandleInput {
  email: string;
  redirectTo?: string;
}

export const forgotFormPassword = async ({
  email,
}: ForgotPasswordHandleInput) => {
  try {
    const supabase = await createClient();
    const origin = (await headers()).get('origin');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}${PATHS.auth.resetPassword()}`,
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: unknown) {
    console.log(error);
    return { success: false, error: ErrorUtils.getErrorMessage(error) };
  }
};
