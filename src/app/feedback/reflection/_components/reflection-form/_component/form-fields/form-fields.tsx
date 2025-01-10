import { Fieldset, Title, Textarea, Text } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';
import { useTranslations } from 'next-intl';

import { ReflectionFormData } from '../../reflection-form.validator';

export const FormFields = ({
  getInputProps,
  isSubmitting,
}: {
  getInputProps: GetInputProps<ReflectionFormData>;
  isSubmitting: boolean;
}) => {
  const t = useTranslations('app:feedback.ReflectionForm');
  return (
    <Fieldset legend={<Title order={4}>{t('title')}</Title>} variant="unstyled">
      <Textarea
        {...getInputProps('success')}
        label={<Text>{t('form.field.success.label')}</Text>}
        placeholder={t('form.field.success.placeholder')}
        disabled={isSubmitting}
        minRows={4}
        maxRows={8}
        autosize
        resize="vertical"
        mb="md"
      />
      <Textarea
        {...getInputProps('challenge')}
        label={<Text>{t('form.field.challenge.label')}</Text>}
        placeholder={t('form.field.challenge.placeholder')}
        disabled={isSubmitting}
        minRows={4}
        maxRows={8}
        autosize
        resize="vertical"
        mb="md"
      />
      <Textarea
        {...getInputProps('focus')}
        label={<Text>{t('form.field.focus.label')}</Text>}
        placeholder={t('form.field.focus.placeholder')}
        disabled={isSubmitting}
        minRows={4}
        maxRows={8}
        autosize
        resize="vertical"
        mb="md"
      />
    </Fieldset>
  );
};
