'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthCtx } from '~aispire/common/auth';

import { PATHS } from 'src/config';

export default function Page() {
  const { self } = useAuthCtx();
  const router = useRouter();

  useEffect(() => {
    if (self) {
      router.push(PATHS.dashboard());
    }
  }, [self, router]);

  return null;
}
