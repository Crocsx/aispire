'use client';

import { useEffect, useState } from 'react';

import {
  Paper,
  Stack,
  Title,
  Select,
  Textarea,
  Group,
  Button,
  Fieldset,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { FeedbackType } from '~aispire/shared/schema';
import { StatusAlert } from '~aispire/shared/ui';

import { getUsers, UserData } from './_actions';
import { FeedbackSubmitted } from './_components';
import { useAddFormSubmit } from './_hooks';
import { toForm } from './add-feedback-form.adaptor';
import {
  AddFeedbackFormData,
  useValidate,
} from './add-feedback-form.validator';

export const AddFeedbackForm = () => {
  const t = useTranslations('app:feedback.AddFeedbackForm');
  const tSchema = useTranslations('shared:schema.enum');
  const [users, setUsers] = useState<UserData>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await getUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      }
    };
    loadUsers();
  }, []);

  const { isSubmitting, error, submit, feedback } = useAddFormSubmit();
  const { onSubmit, getInputProps } = useForm<AddFeedbackFormData>({
    validate: useValidate(),
    initialValues: toForm(),
  });

  if (feedback) {
    return <FeedbackSubmitted />;
  }

  return (
    <Paper withBorder p="md">
      <Stack gap="md">
        {error && (
          <StatusAlert
            status={'error'}
            description={error || t('error.description')}
            title={t('form.error.title')}
          />
        )}
        <Title order={3}>{t('title')}</Title>
        <form onSubmit={onSubmit(submit)}>
          <Fieldset variant="unstyled">
            <Select
              {...getInputProps('to_user_id')}
              label={t('form.field.user.label')}
              placeholder={t('form.field.user.placeholder')}
              mb="md"
              data={users.map((user) => ({
                label: user.email,
                value: user.id,
              }))}
              required
            />
            <Select
              {...getInputProps('type')}
              label={t('form.field.type.label')}
              placeholder={t('form.field.type.placeholder')}
              data={Object.values(FeedbackType.Values).map((type) => ({
                label: tSchema(`feedbackType`, { type }),
                value: type,
              }))}
              mb="md"
              required
            />
            <Textarea
              {...getInputProps('content')}
              label={t('form.field.content.label')}
              placeholder={t('form.field.content.placeholder')}
              minRows={4}
              maxRows={8}
              autosize
              resize="vertical"
              mb="md"
              required
            />
          </Fieldset>
          <Group justify="flex-end">
            <Button type="submit" loading={isSubmitting}>
              {t('form.submit')}
            </Button>
          </Group>
        </form>
      </Stack>
    </Paper>
  );
};
