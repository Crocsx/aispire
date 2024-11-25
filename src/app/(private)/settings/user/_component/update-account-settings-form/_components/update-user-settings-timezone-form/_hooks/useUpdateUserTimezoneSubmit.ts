import { useCallback, useState, useTransition } from 'react';

import { updateUserTimezoneHandler } from '../_actions';
import { toAction } from '../update-user-settings-timezone-form.adapter';
import { UpdateUserSettingsTimezoneFormData } from '../update-user-settings-timezone-form.validator';

export const useUpdateUserTimezoneSubmit = () => {
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(
    async (formData: UpdateUserSettingsTimezoneFormData) => {
      startTransition(async () => {
        const { success, error } = await updateUserTimezoneHandler(
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
