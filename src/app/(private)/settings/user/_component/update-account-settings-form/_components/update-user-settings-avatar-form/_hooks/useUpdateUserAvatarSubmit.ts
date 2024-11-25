import { useCallback, useState, useTransition } from 'react';

import { uploadUserAvatarHandler } from '../_actions';
import { toAction } from '../update-user-settings-avatar-form.adapter';
import { UpdateUserSettingsAvatarFormData } from '../update-user-settings-avatar-form.validator';

export const useUpdateUserAvatarSubmit = () => {
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(
    async (formData: UpdateUserSettingsAvatarFormData) => {
      startTransition(async () => {
        const { success, error } = await uploadUserAvatarHandler(
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
