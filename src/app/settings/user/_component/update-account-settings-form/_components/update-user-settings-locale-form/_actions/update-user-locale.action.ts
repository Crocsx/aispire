'use client';

import { createClient } from '~aispire/external/supabase';
import { ErrorUtils } from '~aispire/shared/utils';

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
