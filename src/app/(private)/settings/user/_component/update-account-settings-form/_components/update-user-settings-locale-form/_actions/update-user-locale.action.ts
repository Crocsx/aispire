'use client';

import { createClient } from '~aspire/external/supabase';
import { ErrorUtils } from '~aspire/shared/utils';

import { Locale } from 'src/config';

export interface UpdateUserLocaleHandlerInput {
  locale: Locale;
}

export const uploadUserLocaleHandler = async ({
  locale,
}: UpdateUserLocaleHandlerInput) => {
  try {
    const supabase = await createClient();

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        locale,
      },
    });

    if (updateError) {
      throw updateError;
    }

    return { success: true };
  } catch (error: unknown) {
    console.error(error);
    return { success: false, error: ErrorUtils.getErrorMessage(error) };
  }
};
