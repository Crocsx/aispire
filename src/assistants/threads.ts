import { cache } from 'react';

import { createOpenAI } from '~aispire/external/openai/server';
import { createClient } from '~aispire/external/supabase/server';
import { ErrorUtils } from '~aispire/shared/utils';

export const getOrCreateThread = cache(async (assistantId: string) => {
  const supabase = await createClient();
  const openai = await createOpenAI();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  // Try to fetch existing thread
  const { data, error } = await supabase
    .from('assistant_threads')
    .select('id')
    .eq('user_id', user.id)
    .eq('assistant_id', assistantId)
    .single();

  // If not existing row, create new thread
  if (error && error.code === 'PGRST116') {
    const thread = await openai.beta.threads.create();

    await supabase.from('assistant_threads').insert([
      {
        user_id: user.id,
        assistant_id: assistantId,
        thread_id: thread.id,
      },
    ]);

    return thread;
  }

  if (error) {
    throw ErrorUtils.getErrorMessage(error);
  }

  return await openai.beta.threads.retrieve(data.id);
});
