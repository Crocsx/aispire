import { useCallback, useState, useTransition } from 'react';

import { forgotFormPassword } from '../_actions';
import { toAction } from '../forgot-password-form.adapter';
import { ForgotPasswordFormData } from '../forgot-password-form.validator';

export const useForgotPasswordSubmit = () => {
  const [error, setError] = useState<string | undefined>();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback((formData: ForgotPasswordFormData) => {
    startTransition(async () => {
      const { error, success } = await forgotFormPassword(toAction(formData));
      if (!success) {
        setError(error);
        return;
      }
      setEmailSent(true);
    });
  }, []);

  return { emailSent, error, submit, isSubmitting };
};
