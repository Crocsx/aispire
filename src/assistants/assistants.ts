import { cache } from 'react';

import { createOpenAI } from '~aispire/external/openai/server';
import { createClient } from '~aispire/external/supabase/server';

import { REFLECTION_COACH_CONFIG } from './config';

// Cache the entire get-or-create flow
export const getOrCreateAssistant = cache(async () => {
  const supabase = await createClient();
  const openai = await createOpenAI();

  // Try to fetch existing assistant
  const { data, error } = await supabase
    .from('assistants')
    .select('id')
    .eq('name', REFLECTION_COACH_CONFIG.name)
    .single();

  // If not existing row, create new assistant
  if (error && error.code === 'PGRST116') {
    const assistant = await openai.beta.assistants.create(
      REFLECTION_COACH_CONFIG
    );

    await supabase.from('assistants').insert([
      {
        name: REFLECTION_COACH_CONFIG.name,
        id: assistant.id,
      },
    ]);

    return assistant;
  }

  if (error) {
    throw error;
  }

  // Retrieve existing assistant
  return await openai.beta.assistants.retrieve(data.id);
});
