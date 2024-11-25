import { FormValidateInput } from '@mantine/form/lib/types';
import { useTranslations } from 'next-intl';

export interface UpdateUserSettingsPasswordFormData {
  newPassword: string;
  confirmationPassword: string;
}

export const useValidate =
  (): FormValidateInput<UpdateUserSettingsPasswordFormData> => {
    const t = useTranslations();

    return {
      newPassword: (val) => {
        const label = t(
          'app:settings.UserSettings.form.field.newPassword.label'
        );
        if (!val)
          return t('shared:form.validation.error.required', {
            field: label,
          });
        if (val.length <= 6)
          return t('shared:form.validation.error.charMin', {
            field: label,
            min: 6,
          });
      },
      confirmationPassword: (val, values) => {
        const label = t(
          'app:settings.UserSettings.form.field.confirmationPassword.label'
        );
        const label2 = t(
          'app:settings.UserSettings.form.field.newPassword.label'
        );
        if (!val)
          return t('shared:form.validation.error.required', {
            field: label,
          });
        if (val.length <= 6)
          return t('shared:form.validation.error.charMin', {
            field: label,
            min: 6,
          });
        if (val !== values.newPassword)
          return t('shared:form.validation.error.notMatch', {
            field1: label,
            field2: label2,
          });
      },
    };
  };
