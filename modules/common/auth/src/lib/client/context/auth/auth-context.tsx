// 'auth-context.ts'
'use client';

import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';

export type AuthContextType = {
  readonly self?: User | null;
  readonly authenticated: boolean;
};

export const defaultAuthContext: AuthContextType = {
  self: null,
  authenticated: false,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuthCtx = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthCtx must be used within an AuthProvider');
  }
  return context;
};
