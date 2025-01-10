import { FormValidateInput } from '@mantine/form';
import { useTranslations } from 'next-intl';

export interface ReflectionFormData {
  success: string;
  challenge: string;
  focus: string;
}

export const useValidate = (): FormValidateInput<ReflectionFormData> => {
  const t = useTranslations();

  return {
    success: (val) => {
      const label = t('app:feedback.ReflectionForm.form.field.success.label');
      if (!val)
        return t('shared:form.validation.error.required', {
          field: label,
        });
    },
    challenge: (val) => {
      const label = t('app:feedback.ReflectionForm.form.field.challenge.label');
      if (!val)
        return t('shared:form.validation.error.required', {
          field: label,
        });
    },
    focus: (val) => {
      const label = t('app:feedback.ReflectionForm.form.field.focus.label');
      if (!val)
        return t('shared:form.validation.error.required', {
          field: label,
        });
    },
  };
};
