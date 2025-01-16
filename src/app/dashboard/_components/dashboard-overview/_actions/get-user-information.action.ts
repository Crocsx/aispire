'use server';

import { createClient } from '~aispire/external/supabase/server';
import { ErrorUtils } from '~aispire/shared/utils';

import { TMP_PROFILE_DATA } from './_tmp';

export async function getUserInformation() {
  try {
    const supabase = await createClient();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError?.message || !session) {
      if (sessionError?.message === 'Error: Not authenticated') {
        await supabase.auth.signOut();
        return { success: false, userInformation: null };
      }
      throw new Error(sessionError?.message || 'Not authenticated');
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      if (authError?.message === 'Error: Auth session missing!') {
        await supabase.auth.signOut();
        return { success: false, userInformation: null };
      }
      throw new Error(authError?.message || 'Not authenticated');
    }

    // SHOULD COME FROM MED
    /* 
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      throw profileError;
    }*/

    return { success: true, userInformation: TMP_PROFILE_DATA };
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
    return { success: false, error: ErrorUtils.getErrorMessage(error) };
  }
}
