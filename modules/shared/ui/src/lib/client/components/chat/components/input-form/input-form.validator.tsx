import { FormValidateInput } from '@mantine/form/lib/types';
import trim from 'lodash/trim';
import { useTranslations } from 'next-intl';

export interface ChatInputFormData {
  message: string;
}

export const useValidate = (): FormValidateInput<ChatInputFormData> => {
  const t = useTranslations();

  return {
    message: (message) => {
      const label = t('shared:ui.Chat.InputForm.field.label');

      if (!trim(message)) {
        return t('shared:form.validation.error.required', {
          field: label,
        });
      }
    },
  };
};
