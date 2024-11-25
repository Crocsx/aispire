import { FormValidateInput } from '@mantine/form/lib/types';
import { useTranslations } from 'next-intl';

export interface ForgotPasswordFormData {
  email: string;
}

export const useValidate = (): FormValidateInput<ForgotPasswordFormData> => {
  const t = useTranslations();

  return {
    email: (val) => {
      const label = t('app:auth.ForgotPassword.form.field.email.label');
      if (!val)
        return t('shared:form.validation.error.required', { field: label });
      if (!/^\S+@\S+\.\S+$/.test(val))
        return t('shared:form.validation.error.invalid', { field: label });
    },
  };
};
