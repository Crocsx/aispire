import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { ToggleableForm } from '~aspire/shared/ui';

import { useUpdateUserEmailSubmit } from './_hooks';
import { toForm } from './update-user-settings-email-form.adapter';
import {
  UpdateUserSettingsEmailFormData,
  useValidate,
} from './update-user-settings-email-form.validator';

export const UpdateUserSettingsEmailForm = ({ email }: { email?: string }) => {
  const t = useTranslations('app:settings.UserSettings');
  const form = useForm<UpdateUserSettingsEmailFormData>({
    validate: useValidate(),
    initialValues: toForm({ email }),
  });
  const { isSubmitting, submit } = useUpdateUserEmailSubmit();

  return (
    <ToggleableForm
      onSubmit={submit}
      form={form}
      readonlyFields={
        <TextInput label={t('form.field.email.label')} value={email} disabled />
      }
      isSubmitting={isSubmitting}
    >
      <TextInput
        {...form.getInputProps('email')}
        label={t('form.field.email.label')}
        placeholder={t('form.field.email.placeholder')}
      />
    </ToggleableForm>
  );
};
