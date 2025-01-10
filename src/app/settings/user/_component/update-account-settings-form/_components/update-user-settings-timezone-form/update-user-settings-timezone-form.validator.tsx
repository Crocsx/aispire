import { FormValidateInput } from '@mantine/form/lib/types';
import { Timezone, useTranslations } from 'next-intl';

import { TIMEZONES } from 'src/config';

export interface UpdateUserSettingsTimezoneFormData {
  timezone: Timezone;
}

export const useValidate =
  (): FormValidateInput<UpdateUserSettingsTimezoneFormData> => {
    const t = useTranslations();

    return {
      timezone: (value) => {
        const label = t('app:settings.UserSettings.form.field.timezone.label');
        if (!value)
          return t('shared:form.validation.error.required', {
            field: label,
          });

        if (!TIMEZONES.includes(value)) {
          return t('shared:form.validation.error.invalid', {
            field: label,
          });
        }
      },
    };
  };
