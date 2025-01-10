import { FormValidateInput } from '@mantine/form/lib/types';
import trim from 'lodash/trim';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { FeedbackType } from '~aispire/shared/schema';

export interface AddFeedbackFormData {
  content: string;
  type: z.infer<typeof FeedbackType>;
  to_user_id: string;
}

export const useValidate = (): FormValidateInput<AddFeedbackFormData> => {
  const t = useTranslations();

  return {
    content: (value) => {
      const label = t('app:feedback.AddFeedbackForm.form.field.content.label');

      if (!trim(value)) {
        return t('shared:form.validation.error.required', {
          field: label,
        });
      }
    },
    type: (value) => {
      const label = t('app:feedback.AddFeedbackForm.form.field.type.label');

      if (!value) {
        return t('shared:form.validation.error.required', {
          field: label,
        });
      }
    },
    to_user_id: (value) => {
      const label = t('app:feedback.AddFeedbackForm.form.field.user.label');

      if (!trim(value)) {
        return t('shared:form.validation.error.required', {
          field: label,
        });
      }
    },
  };
};
