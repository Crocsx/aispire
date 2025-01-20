import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { ToggleableForm } from '~aispire/shared/ui';

import { DEFAULT_LOCALE, LOCALES, Locale } from 'src/config';

import { useUpdateUserLocaleSubmit } from './_hooks';
import { toForm } from './update-user-settings-locale-form.adapter';
import {
  UpdateUserSettingsLocaleFormData,
  useValidate,
} from './update-user-settings-locale-form.validator';

export const UpdateUserSettingsLocaleForm = ({
  locale = DEFAULT_LOCALE,
}: {
  locale: Locale;
}) => {
  const t = useTranslations('app:settings.UserSettings');
  const form = useForm<UpdateUserSettingsLocaleFormData>({
    validate: useValidate(),
    initialValues: toForm({ locale }),
  });
  const { isSubmitting, submit } = useUpdateUserLocaleSubmit();

  return (
    <ToggleableForm
      onSubmit={submit}
      form={form}
      isSubmitting={isSubmitting}
      readonlyFields={
        <Select
          data={[
            {
              value: locale,
              label: t('form.field.locale.language', {
                language: locale.replace('-', '_'),
              }),
            },
          ]}
          value={locale}
          disabled
          label={t('form.field.locale.label')}
        />
      }
    >
      <Select
        {...form.getInputProps('locale')}
        clearable={false}
        data={LOCALES.map((lc) => ({
          label: t('form.field.locale.language', {
            language: lc.replace('-', '_'),
          }),
          value: lc,
        }))}
        label={t('form.field.locale.label')}
        placeholder={t('form.field.locale.placeholder')}
      />
    </ToggleableForm>
  );
};
