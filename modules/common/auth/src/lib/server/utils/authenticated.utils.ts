import { createClient } from '~aispire/external/supabase/server';

export const isAuthenticated = async () => {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  return !!user;
};
