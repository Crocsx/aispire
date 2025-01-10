import { FormValidateInput } from '@mantine/form/lib/types';
import { useTranslations } from 'next-intl';

export const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
export const ALLOWED_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];

export interface UpdateUserSettingsAvatarFormData {
  avatar: File | null;
}

export const useValidate =
  (): FormValidateInput<UpdateUserSettingsAvatarFormData> => {
    const t = useTranslations();

    return {
      avatar: (file) => {
        const label = t('app:settings.UserSettings.form.field.avatar.label');
        if (!file) {
          return;
        }

        if (file.size > MAX_AVATAR_SIZE) {
          return t('shared:form.validation.error.fileSize', {
            max: '5MB',
            field: label,
          });
        }

        if (!file.type || !ALLOWED_EXTENSIONS.includes(file.type)) {
          return t('shared:form.validation.error.fileType', {
            types: 'PNG, JPG, JPEG',
            field: label,
          });
        }
      },
    };
  };
