import { Paper, Stack, Title, Timeline, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { retrieveFeedbackActivityItems } from './_actions';
import { ActivityTimelineEmpty, ActivityTimelineItem } from './_components';

export const FeedbackActivityTimeline = async () => {
  const t = useTranslations('app:feedback.FeedbackActivityTimeline');
  const { data } = await retrieveFeedbackActivityItems();

  const timelineItems = data || [];
  return (
    <Stack gap="xl">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>{t('paper.title')}</Title>
          <Text size="sm" c="dimmed">
            {t('paper.description')}
          </Text>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          <Timeline bulletSize={24} lineWidth={2}>
            {timelineItems.length > 0 ? (
              timelineItems.map((item) => (
                <ActivityTimelineItem key={item.id} timelineItem={item} />
              ))
            ) : (
              <ActivityTimelineEmpty />
            )}
          </Timeline>
        </Stack>
      </Paper>
    </Stack>
  );
};
