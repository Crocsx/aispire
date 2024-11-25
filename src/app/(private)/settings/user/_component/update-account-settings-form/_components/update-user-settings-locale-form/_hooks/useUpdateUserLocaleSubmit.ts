import { useCallback, useState, useTransition } from 'react';

import { uploadUserLocaleHandler } from '../_actions';
import { toAction } from '../update-user-settings-locale-form.adapter';
import { UpdateUserSettingsLocaleFormData } from '../update-user-settings-locale-form.validator';

export const useUpdateUserLocaleSubmit = () => {
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(
    async (formData: UpdateUserSettingsLocaleFormData) => {
      startTransition(async () => {
        const { success, error } = await uploadUserLocaleHandler(
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
