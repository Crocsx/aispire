'use server';

import { createClient } from '~aspire/external/supabase/server';
import { ErrorUtils } from '~aspire/shared/utils';

export const googleSigninHandler = async () => {
  const supabase = await createClient();
  try {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.log(error);
      throw error;
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error(ErrorUtils.getErrorMessage(error));
    return { success: false, error: ErrorUtils.getErrorMessage(error) };
  }
};
