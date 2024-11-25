import { useState, useCallback, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { manualSignInHandler } from '../_actions';
import { toAction } from '../sign-in-form.adapter';
import { SignInFormData } from '../sign-in-form.validator';

export const useSignInSubmit = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(
    (formData: SignInFormData) => {
      startTransition(async () => {
        const { error, success } = await manualSignInHandler(
          toAction(formData)
        );

        if (!success) {
          return setError(error);
        }
        router.push('/');
      });
    },
    [router]
  );

  return { submit, error, isSubmitting };
};
