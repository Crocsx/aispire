'use client';

import { useAuthCtx } from '~aispire/common/auth';

export default function Template({ children }: { children: React.ReactNode }) {
  const { authenticated } = useAuthCtx();

  if (!authenticated) {
    return <div style={{ background: 'white', minHeight: '100vh' }} />;
  }

  return <>{children}</>;
}
