import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Timezone, useTranslations } from 'next-intl';

import { ToggleableForm } from '~aispire/shared/ui';

import { DEFAULT_TIMEZONE, TIMEZONES } from 'src/config';

import { useUpdateUserTimezoneSubmit } from './_hooks';
import { toForm } from './update-user-settings-timezone-form.adapter';
import {
  UpdateUserSettingsTimezoneFormData,
  useValidate,
} from './update-user-settings-timezone-form.validator';

export const UpdateUserSettingsTimezoneForm = ({
  timezone = DEFAULT_TIMEZONE,
}: {
  timezone: Timezone;
}) => {
  const t = useTranslations('app:settings.UserSettings');
  const form = useForm<UpdateUserSettingsTimezoneFormData>({
    validate: useValidate(),
    initialValues: toForm({ timezone }),
  });
  const { isSubmitting, submit } = useUpdateUserTimezoneSubmit();

  return (
    <ToggleableForm
      onSubmit={submit}
      form={form}
      isSubmitting={isSubmitting}
      readonlyFields={
        <Select
          {...form.getInputProps('timezone')}
          data={[
            {
              value: timezone,
              label: timezone,
            },
          ]}
          label={t('form.field.timezone.label')}
          placeholder={t('form.field.timezone.placeholder')}
          disabled
        />
      }
    >
      <Select
        {...form.getInputProps('timezone')}
        data={TIMEZONES.map((tz) => ({
          value: tz,
          label: tz,
        }))}
        label={t('form.field.timezone.label')}
        placeholder={t('form.field.timezone.placeholder')}
        searchable
      />
    </ToggleableForm>
  );
};
