'use client';

import { useEffect } from 'react';

import { useAuthCtx } from '~aispire/common/auth';

import { DEFAULT_LOCALE } from 'src/config';
import { getUserLocale, setUserLocale } from 'src/services';

export default function Template({ children }: { children: React.ReactNode }) {
  const { authenticated, self } = useAuthCtx();

  useEffect(() => {
    const syncLocale = async () => {
      if (
        authenticated &&
        self?.user_metadata?.locale !== (await getUserLocale())
      ) {
        setUserLocale(self?.user_metadata?.locale || DEFAULT_LOCALE);
      }
    };
    syncLocale();
  }, [authenticated, self]);

  if (!authenticated) {
    return <div style={{ background: 'white', minHeight: '100vh' }} />;
  }

  return <>{children}</>;
}
