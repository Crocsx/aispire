import { useCallback, useState, useTransition } from 'react';

import { updateUserPasswordHandler } from '../_actions';
import { toAction } from '../update-user-settings-password-form.adapter';
import { UpdateUserSettingsPasswordFormData } from '../update-user-settings-password-form.validator';

export const useUpdateUserPasswordSubmit = () => {
  const [error, setAuthError] = useState<string | undefined>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(
    async (formData: UpdateUserSettingsPasswordFormData) => {
      startTransition(async () => {
        const { success, error } = await updateUserPasswordHandler(
          toAction(formData)
        );

        if (!success) {
          return setAuthError(error);
        }
      });
    },
    []
  );

  return { isSubmitting, error, submit };
};
