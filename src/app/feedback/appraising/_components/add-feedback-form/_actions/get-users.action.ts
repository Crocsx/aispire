'use server';

import { z } from 'zod';

import { createClient } from '~aispire/external/supabase/server';
import { UserSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export type UserData = z.infer<typeof UserSchema>[];

export const getUsers = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('users')
      .select('id, email')
      .order('email');

    if (error) {
      throw error;
    }
    return {
      success: true,
      error: undefined,
      data: data as UserData,
    };
  } catch (error) {
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
