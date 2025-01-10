'use client';

import { createClient } from '~aispire/external/supabase';
import { ErrorUtils } from '~aispire/shared/utils';

import { Timezone } from 'src/config';

export interface UpdateUserTimezoneHandlerInput {
  timezone: Timezone;
}

export const updateUserTimezoneHandler = async ({
  timezone,
}: UpdateUserTimezoneHandlerInput) => {
  try {
    const supabase = await createClient();

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        timezone,
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
