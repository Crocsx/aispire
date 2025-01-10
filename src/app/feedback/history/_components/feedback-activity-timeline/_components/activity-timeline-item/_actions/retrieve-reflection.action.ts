'use server';

import { createClient } from '~aispire/external/supabase/server';
import { ReflectionSchema } from '~aispire/shared/schema';
import { ErrorUtils } from '~aispire/shared/utils';

export const retrieveReflection = async (id: string) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_reflections')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Reflection not found');
    }

    return {
      success: true,
      error: undefined,
      data: ReflectionSchema.parse(data),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: ErrorUtils.getErrorMessage(error),
      data: null,
    };
  }
};
