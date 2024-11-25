import { PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { ToggleableForm } from '~aspire/shared/ui';

import { useUpdateUserPasswordSubmit } from './_hooks';
import { toForm } from './update-user-settings-password-form.adapter';
import {
  UpdateUserSettingsPasswordFormData,
  useValidate,
} from './update-user-settings-password-form.validator';

export const UpdateUserSettingsPasswordForm = () => {
  const t = useTranslations('app:settings.UserSettings');
  const form = useForm<UpdateUserSettingsPasswordFormData>({
    validate: useValidate(),
    initialValues: toForm(),
  });
  const { isSubmitting, submit } = useUpdateUserPasswordSubmit();

  return (
    <ToggleableForm
      onSubmit={submit}
      form={form}
      readonlyFields={
        <TextInput
          label={t('form.field.currentPassword.label')}
          value={'******'}
          disabled
        />
      }
      isSubmitting={isSubmitting}
    >
      <PasswordInput
        {...form?.getInputProps('newPassword')}
        label={t('form.field.newPassword.label')}
        placeholder={t('form.field.newPassword.label')}
        required
      />

      <PasswordInput
        {...form?.getInputProps('confirmationPassword')}
        label={t('form.field.confirmationPassword.label')}
        placeholder={t('form.field.confirmationPassword.label')}
        required
      />
    </ToggleableForm>
  );
};
