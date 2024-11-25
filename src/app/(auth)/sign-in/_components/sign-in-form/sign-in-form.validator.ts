import { FormValidateInput } from '@mantine/form/lib/types';
import { useTranslations } from 'next-intl';

export interface SignInFormData {
  email: string;
  password: string;
}

export const useValidate = (): FormValidateInput<SignInFormData> => {
  const t = useTranslations();
  return {
    email: (val) => {
      const emailLabel = t('app:auth.SignIn.form.field.email.label');

      if (!val)
        return t('shared:form.validation.error.required', {
          field: emailLabel,
        });
      if (!/^\S+@\S+$/.test(val))
        return t('shared:form.validation.error.invalid', {
          field: emailLabel,
        });
    },
    password: (val) => {
      const passwordLabel = t('app:auth.SignIn.form.field.password.label');

      if (!val)
        return t('shared:form.validation.error.required', {
          field: passwordLabel,
        });
      if (val.length <= 6)
        return t('shared:form.validation.error.charMin', {
          field: passwordLabel,
          min: 6,
        });
    },
  };
};
