'use client';

import { Stack, Button, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

export const ActivityTimelineEmpty = () => {
  const t = useTranslations('app:feedback.FeedbackActivityTimeline');
  const router = useRouter();

  return (
    <Stack align="center" gap="md" py="xl">
      <Text size="lg" fw={500} c="dimmed" ta="center">
        {t('timelineEmpty.title')}
      </Text>
      <Text size="sm" c="dimmed" maw={400} ta="center">
        {t('timelineEmpty.description')}
      </Text>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={() => router.push(PATHS.feedback.reflection())}
      >
        {t('timelineEmpty.action')}
      </Button>
    </Stack>
  );
};
