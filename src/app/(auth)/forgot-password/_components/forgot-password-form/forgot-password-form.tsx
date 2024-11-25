'use client';

import { Text, TextInput, Button, Group, Anchor, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useSupabaseErrorMapper } from '~aspire/external/supabase';
import { StatusMessage, StatusAlert } from '~aspire/shared/ui';

import { PATHS } from 'src/config';

import { useForgotPasswordSubmit } from './_hooks';
import { toForm } from './forgot-password-form.adapter';
import {
  ForgotPasswordFormData,
  useValidate,
} from './forgot-password-form.validator';

export const ForgotPasswordForm = () => {
  const t = useTranslations('app:auth.ForgotPassword');
  const { mapToSupabaseError } = useSupabaseErrorMapper({
    defaultMessage: t('form.error.defaultMessage'),
  });
  const { emailSent, error, submit, isSubmitting } = useForgotPasswordSubmit();

  const { onSubmit, getInputProps } = useForm<ForgotPasswordFormData>({
    initialValues: toForm(),
    validate: useValidate(),
  });

  if (emailSent) {
    return (
      <StatusMessage
        status="success"
        title={t('confirmation.title')}
        description={t('confirmation.description')}
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
          {...getInputProps('email')}
          label={t('form.field.email.label')}
          placeholder={t('form.field.email.placeholder')}
          required
        />
        <Group justify="space-between" mt="lg">
          <Anchor type="button" c="dimmed" size="xs" href={PATHS.auth.signIn()}>
            <IconArrowLeft
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
            {t('linkToSignIn')}
          </Anchor>
          <Button type="submit" radius="xl" loading={isSubmitting}>
            {t('form.submit')}
          </Button>
        </Group>
      </form>
    </>
  );
};
