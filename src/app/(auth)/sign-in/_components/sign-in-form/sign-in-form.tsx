'use client';

import {
  Anchor,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { useSupabaseErrorMapper } from '~aspire/external/supabase';
import { StatusAlert } from '~aspire/shared/ui';

import { GoogleSignIn } from 'src/app/(auth)/_components';
import { Logo } from 'src/app/_components';
import { PATHS } from 'src/config';

import { useSignInSubmit } from './_hooks';
import { toForm } from './sign-in-form.adapter';
import { SignInFormData, useValidate } from './sign-in-form.validator';

export const SignInForm = () => {
  const t = useTranslations('app:auth.SignIn');
  const { error, submit, isSubmitting } = useSignInSubmit();
  const { mapToSupabaseError } = useSupabaseErrorMapper({
    defaultMessage: t('form.error.defaultMessage'),
  });
  const { onSubmit, getInputProps } = useForm<SignInFormData>({
    initialValues: toForm(),
    validate: useValidate(),
  });
  return (
    <>
      <Container
        component={Flex}
        fluid
        display="flex"
        m="auto"
        /* @ts-expect-error justify is usable but the type is not computed properly */
        justify="center"
        pb="md"
      >
        <Logo />
      </Container>
      <Text size="lg" ta="center" fw={500}>
        {t('title')}
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleSignIn />
      </Group>

      <Divider label={t('divider')} labelPosition="center" my="lg" />

      {error && (
        <StatusAlert
          status={'error'}
          description={mapToSupabaseError(error)}
          title={t('form.error.title')}
        />
      )}
      <form noValidate onSubmit={onSubmit(submit)}>
        <Stack>
          <TextInput
            {...getInputProps('email')}
            label={t('form.field.email.label')}
            placeholder={t('form.field.email.placeholder')}
            required
          />

          <PasswordInput
            {...getInputProps('password')}
            label={t('form.field.password.label')}
            placeholder={t('form.field.password.placeholder')}
            inputWrapperOrder={['label', 'input', 'description', 'error']}
            required
            description={
              <Anchor
                type="button"
                c="dimmed"
                size="xs"
                href={PATHS.auth.forgotPassword()}
              >
                {t('linkToForgotPassword')}
              </Anchor>
            }
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor type="button" c="dimmed" size="xs" href={PATHS.auth.signUp()}>
            {t('linkToSignUp')}
          </Anchor>
          <Button type="submit" radius="xl" loading={isSubmitting}>
            {t('form.submit')}
          </Button>
        </Group>
      </form>
    </>
  );
};
