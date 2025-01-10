'use client';

import { Paper, Stack, Group, Button, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { StatusAlert } from '~aispire/shared/ui';

import { AnimatedSubmission, SubmissionReview, FormFields } from './_component';
import { useReflectionFormSubmit } from './_hooks';
import { toForm } from './reflection-form.adapter';
import { ReflectionFormData, useValidate } from './reflection-form.validator';

export const ReflectionForm = () => {
  const t = useTranslations('app:feedback.ReflectionForm');
  const { isSubmitting, error, submit, reflection } = useReflectionFormSubmit();
  const { onSubmit, getInputProps } = useForm<ReflectionFormData>({
    validate: useValidate(),
    initialValues: toForm(),
  });

  if (reflection) {
    return <SubmissionReview {...reflection} />;
  }

  if (isSubmitting) {
    return <AnimatedSubmission />;
  }

  return (
    <>
      <Alert
        variant="light"
        color="blue"
        mb="md"
        icon={<IconInfoCircleFilled />}
      >
        {t('tooltip')}
      </Alert>
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="md">
          {error && (
            <StatusAlert
              status={'error'}
              description={error || t('error.description')}
              title={t('form.error.title')}
            />
          )}
          <form noValidate onSubmit={onSubmit(submit)}>
            <FormFields
              getInputProps={getInputProps}
              isSubmitting={isSubmitting}
            />
            <Group justify="flex-end" mt="md">
              <Button type="submit" loading={isSubmitting}>
                {t('form.submit')}
              </Button>
            </Group>
          </form>
        </Stack>
      </Paper>
    </>
  );
};
