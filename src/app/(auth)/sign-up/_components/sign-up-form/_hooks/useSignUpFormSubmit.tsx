import { useState, useTransition, useCallback } from 'react';

import { manualSignUpHandler } from '../_actions';
import { toAction } from '../sign-up-form.adapter';
import { SignUpFormData } from '../sign-up-form.validator';

export const useSignUpFormSubmit = () => {
  const [error, setAuthError] = useState<string | undefined>();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(async (formData: SignUpFormData) => {
    startTransition(async () => {
      const { success, error } = await manualSignUpHandler(toAction(formData));

      if (!success) {
        return setAuthError(error);
      }
      setEmailSent(true);
    });
  }, []);

  return { isSubmitting, error, submit, emailSent };
};
