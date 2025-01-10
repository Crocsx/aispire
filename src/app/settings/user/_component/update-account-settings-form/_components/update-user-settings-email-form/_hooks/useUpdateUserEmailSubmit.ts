import { useCallback, useState, useTransition } from 'react';

import { updateUserEmailHandler } from '../_actions';
import { toAction } from '../update-user-settings-email-form.adapter';
import { UpdateUserSettingsEmailFormData } from '../update-user-settings-email-form.validator';

export const useUpdateUserEmailSubmit = () => {
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(
    async (formData: UpdateUserSettingsEmailFormData) => {
      startTransition(async () => {
        const { success, error } = await updateUserEmailHandler(
          toAction(formData)
        );

        if (!success) {
          return setError(error);
        }
      });
    },
    []
  );

  return { isSubmitting, error, submit };
};
