'use server';

import { headers } from 'next/headers';

import { createClient } from '~aspire/external/supabase/server';
import { ErrorUtils } from '~aspire/shared/utils';

import { PATHS } from 'src/config';

export interface ManualSignUpHandlerInput {
  email: string;
  password: string;
}

export const manualSignUpHandler = async ({
  email,
  password,
}: ManualSignUpHandlerInput) => {
  try {
    const supabase = await createClient();
    const origin = (await headers()).get('origin');

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}${PATHS.auth.validateEmail()}`,
      },
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
