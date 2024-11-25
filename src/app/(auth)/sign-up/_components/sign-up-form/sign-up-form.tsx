'use client';

import {
  Anchor,
  Button,
  Checkbox,
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
import { IconBrandGoogle } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useSupabaseErrorMapper } from '~aspire/external/supabase';
import { StatusMessage, StatusAlert } from '~aspire/shared/ui';

import { Logo } from 'src/app/_components';
import { PATHS } from 'src/config';

import { useSignUpFormSubmit } from './_hooks';
import { toForm } from './sign-up-form.adapter';
import { SignUpFormData, useValidate } from './sign-up-form.validator';

export const SignUpForm = () => {
  const t = useTranslations('app:auth.SignUp');
  const { submit, error, emailSent, isSubmitting } = useSignUpFormSubmit();
  const { mapToSupabaseError } = useSupabaseErrorMapper({
    defaultMessage: t('form.error.defaultMessage'),
  });
  const { onSubmit, getInputProps } = useForm<SignUpFormData>({
    initialValues: toForm(),
    validate: useValidate(),
  });

  if (emailSent) {
    return (
      <StatusMessage
        status="success"
        description={t('confirmationDescription')}
        title={t('confirmationTitle')}
      >
        <Flex justify="center" mt="md">
          <Button
            component={Link}
            href={PATHS.home()}
            radius="xl"
            type="button"
          >
            {t('confirmationButton')}
          </Button>
        </Flex>
      </StatusMessage>
    );
  }

  return (
    <>
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
          <Button leftSection={<IconBrandGoogle />} radius="xl">
            Google
          </Button>
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
              placeholder={t('form.field.password.label')}
              required
            />

            <PasswordInput
              {...getInputProps('confirmation')}
              label={t('form.field.confirmation.label')}
              placeholder={t('form.field.confirmation.label')}
              required
            />

            <Checkbox
              {...getInputProps('terms')}
              label={t.rich('form.field.terms.label', {
                terms: (terms) => (
                  <Link href={PATHS.auth.terms()}>{terms}</Link>
                ),
                conditions: (conditions) => (
                  <Link href={PATHS.auth.terms()}>{conditions}</Link>
                ),
              })}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              type="button"
              c="dimmed"
              size="xs"
              href={PATHS.auth.signIn()}
            >
              {t('linkToSignIn')}
            </Anchor>
            <Button type="submit" radius="xl" loading={isSubmitting}>
              {t('form.submit')}
            </Button>
          </Group>
        </form>
      </>
    </>
  );
};
