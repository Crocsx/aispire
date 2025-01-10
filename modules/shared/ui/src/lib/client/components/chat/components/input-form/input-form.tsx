import { useForm } from '@mantine/form';
import { ChatInputFormData, useValidate } from './input-form.validator';
import { toForm } from './input-form.adapter';
import { Group, Button, Textarea } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const InputForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (values: ChatInputFormData) => void;
  loading: boolean;
}) => {
  const t = useTranslations('shared:ui.Chat.InputForm');
  const form = useForm<ChatInputFormData>({
    initialValues: toForm(),
    validate: useValidate(),
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === 'Enter' &&
      e.nativeEvent.code === 'Enter' &&
      !e.nativeEvent.isComposing &&
      !e.shiftKey
    ) {
      e.preventDefault();
      if (!loading && form.isValid()) {
        form.onSubmit(handleSubmit)();
      }
    }
  };

  const handleSubmit = (values: ChatInputFormData) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group align="flex-end">
        <Textarea
          style={{ flex: 1 }}
          placeholder={t('field.placeholder')}
          autosize
          minRows={2}
          maxRows={6}
          onKeyDown={handleKeyDown}
          {...form.getInputProps('message')}
        />
        <Button
          type="submit"
          loading={loading}
          disabled={loading || !form.isValid()}
        >
          {t('send')}
        </Button>
      </Group>
    </form>
  );
};
