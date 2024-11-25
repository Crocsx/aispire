'use client';

import { Text, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useSupabaseErrorMapper } from '~aspire/external/supabase';
import { StatusMessage, StatusAlert } from '~aspire/shared/ui';

import { PATHS } from 'src/config';

import { useResetPasswordSubmit } from './_hooks';
import { toForm } from './reset-password-form.adapter';
import {
  ResetPasswordFormData,
  useValidate,
} from './reset-password-form.validator';

export const ResetPasswordForm = () => {
  const t = useTranslations('app:auth.ResetPassword');
  const { mapToSupabaseError } = useSupabaseErrorMapper({
    defaultMessage: t('form.error.defaultMessage'),
  });

  const { submit, error, passwordReset, isSubmitting } =
    useResetPasswordSubmit();
  console.log(passwordReset);
  const { onSubmit, getInputProps } = useForm<ResetPasswordFormData>({
    initialValues: toForm(),
    validate: useValidate(),
  });

  if (passwordReset) {
    return (
      <StatusMessage
        status="success"
        description={t('confirmation.description')}
        title={t('confirmation.title')}
      >
        <Group justify="center" mt="lg">
          <Button
            type="button"
            component={Link}
            radius="xl"
            href={PATHS.auth.signIn()}
          >
            {t('confirmation.linkToSignIn')}
          </Button>
        </Group>
      </StatusMessage>
    );
  }

  return (
    <>
      <Text size="lg" ta="center" fw={500} mb="md">
        {t('title')}
      </Text>
      <Text c="dimmed" fz="sm" ta="center" mb="md">
        {t('description')}
      </Text>
      {error && (
        <StatusAlert
          status={'error'}
          description={mapToSupabaseError(error)}
          title={t('form.error.title')}
        />
      )}
      <form noValidate onSubmit={onSubmit(submit)}>
        <TextInput
          {...getInputProps('password')}
          label={t('form.field.password.label')}
          placeholder={t('form.field.password.placeholder')}
          required
        />
        <Group justify="end" mt="lg">
          <Button type="submit" radius="xl" loading={isSubmitting}>
            {t('form.submit')}
          </Button>
        </Group>
      </form>
    </>
  );
};
