import { FormValidateInput } from '@mantine/form/lib/types';
import { useTranslations } from 'next-intl';

export interface ResetPasswordFormData {
  password: string;
}

export const useValidate = (): FormValidateInput<ResetPasswordFormData> => {
  const t = useTranslations();

  return {
    password: (val) => {
      const label = t('app:auth.ResetPassword.form.field.password.label');
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
  };
};
