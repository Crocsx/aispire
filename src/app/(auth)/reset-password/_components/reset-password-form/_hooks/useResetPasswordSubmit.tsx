import { useState, useCallback, useTransition } from 'react';

import { resetFormPassword } from '../_actions';
import { toAction } from '../reset-password-form.adapter';
import { ResetPasswordFormData } from '../reset-password-form.validator';

export const useResetPasswordSubmit = () => {
  const [error, setError] = useState<string | undefined>();
  const [passwordReset, setPasswordReset] = useState<boolean>(false);
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback((formData: ResetPasswordFormData) => {
    startTransition(async () => {
      const { error, success } = await resetFormPassword(toAction(formData));
      if (!success) {
        setError(error);
        return;
      }
      setPasswordReset(true);
    });
  }, []);

  return { submit, error, passwordReset, isSubmitting };
};
