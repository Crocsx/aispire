import { Paper, Stack, ThemeIcon, Title, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const FeedbackSubmitted = () => {
  const t = useTranslations('app:feedback.AddFeedbackForm');
  return (
    <Paper withBorder p="xl">
      <Stack align="center" gap="md">
        <ThemeIcon size="xl" radius="xl" color="green">
          <IconCheck size={24} />
        </ThemeIcon>
        <Title order={3}>{t('form.success.title')}</Title>
        <Text c="dimmed" ta="center">
          {t('form.success.description')}
        </Text>
      </Stack>
    </Paper>
  );
};
