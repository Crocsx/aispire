import { FormValidateInput } from '@mantine/form/lib/types';
import { useTranslations } from 'next-intl';

export interface SignUpFormData {
  email: string;
  password: string;
  confirmation: string;
  terms: boolean;
}

export const useValidate = (): FormValidateInput<SignUpFormData> => {
  const t = useTranslations();

  return {
    email: (val) => {
      const label = t('app:auth.SignUp.form.field.email.label');
      if (!val)
        return t('shared:form.validation.error.required', {
          field: label,
        });
      if (!/^\S+@\S+$/.test(val))
        return t('shared:form.validation.error.invalid', {
          field: label,
        });
    },
    password: (val) => {
      const label = t('app:auth.SignUp.form.field.password.label');
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
    confirmation: (val, values) => {
      const label = t('app:auth.SignUp.form.field.confirmation.label');
      const label2 = t('app:auth.SignUp.form.field.password.label');
      if (!val)
        return t('shared:form.validation.error.required', {
          field: label,
        });
      if (val.length <= 6)
        return t('shared:form.validation.error.charMin', {
          field: label,
          min: 6,
        });
      if (val !== values.password)
        return t('shared:form.validation.error.notMatch', {
          field1: label,
          field2: label2,
        });
    },
    terms: (val) => {
      const label = t('app:auth.SignUp.form.field.terms.error');
      if (!val)
        return t('shared:form.validation.error.mustAccept', {
          field: label,
        });
    },
  };
};
