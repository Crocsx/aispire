import { useState, useCallback, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { googleSigninHandler } from '../_actions';

export const useGoogleSignInSubmit = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(() => {
    startTransition(async () => {
      const { error, success } = await googleSigninHandler();

      if (!success) {
        setError(error);
        return;
      }

      router.push('/');
    });
  }, [router]);

  return { submit, error, isSubmitting };
};
