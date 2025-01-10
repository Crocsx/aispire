import { Paper, Stack, Title, Timeline } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { retrieveFeedbackActivityItems } from './_actions';
import { ActivityTimelineEmpty, ActivityTimelineItem } from './_components';

export const FeedbackActivityTimeline = async () => {
  const t = await getTranslations('app:feedback.FeedbackActivityTimeline');
  const { data } = await retrieveFeedbackActivityItems();

  const timelineItems = data || [];
  return (
    <Paper shadow="sm" p="md" withBorder>
      <Stack gap="md">
        <Title order={2}>{t('title')}</Title>
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
  );
};
