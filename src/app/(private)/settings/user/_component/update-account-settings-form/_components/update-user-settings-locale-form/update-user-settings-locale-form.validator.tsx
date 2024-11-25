import { FormValidateInput } from '@mantine/form/lib/types';
import { useTranslations } from 'next-intl';

import { Locale, LOCALES } from 'src/config';

export interface UpdateUserSettingsLocaleFormData {
  locale: Locale;
}

export const useValidate =
  (): FormValidateInput<UpdateUserSettingsLocaleFormData> => {
    const t = useTranslations();

    return {
      locale: (value) => {
        const label = t('app:settings.UserSettings.form.field.locale.label');

        if (!value) {
          return t('shared:form.validation.error.required', {
            field: label,
          });
        }

        if (!LOCALES.includes(value)) {
          return t('shared:form.validation.error.invalid', {
            field: label,
          });
        }
      },
    };
  };
