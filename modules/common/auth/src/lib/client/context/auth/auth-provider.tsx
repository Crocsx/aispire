'use client';

import { useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from './auth-context';
import { LoadingOverlay } from '@mantine/core';
import { createClient } from '~aispire/external/supabase';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initializing, setInitializing] = useState(true);
  const [authState, setAuthState] = useState<AuthContextType>({
    self: null,
    authenticated: false,
  });

  useEffect(() => {
    const initializeSupabase = async () => {
      const supabase = await createClient();

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log(event);
          const user = session?.user || null;
          setAuthState({ self: user, authenticated: !!user });
          setInitializing(false);
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    };

    initializeSupabase();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      <LoadingOverlay
        visible={initializing}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      {children}
    </AuthContext.Provider>
  );
};
