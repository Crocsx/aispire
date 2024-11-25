'use client';

import { AuthContextType, useAuthCtx } from '../../context';

export const AuthRestricted = ({
  children,
  fallback = null,
}: {
  children:
    | React.ReactNode
    | ((isAuthenticated: AuthContextType) => React.ReactNode);
  fallback?: React.ReactNode;
}) => {
  const { self, authenticated } = useAuthCtx();

  if (typeof children === 'function') {
    return <>{children({ self, authenticated })}</>;
  }

  if (!authenticated) {
    return fallback;
  }

  return children;
};
