import { TimelineItem } from '@mantine/core';
import { IconQuoteFilled, IconBubbleTextFilled } from '@tabler/icons-react';

import { ReflectionAccordionItem, FeedbackAccordionItem } from './_components';
import { HistoryTimelineItemSchema } from '../../_type';

export const ActivityTimelineItem = ({
  timelineItem,
}: {
  timelineItem: Zod.infer<typeof HistoryTimelineItemSchema>;
}) => {
  const formattedDate = new Date(timelineItem.created_at).toLocaleDateString(
    undefined,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <TimelineItem
      bullet={
        timelineItem.type === 'reflection' ? (
          <IconBubbleTextFilled size={12} />
        ) : (
          <IconQuoteFilled size={12} />
        )
      }
      title={formattedDate}
    >
      {timelineItem.type === 'reflection' && (
        <ReflectionAccordionItem timelineItem={timelineItem} />
      )}
      {timelineItem.type === 'feedback' && (
        <FeedbackAccordionItem timelineItem={timelineItem} />
      )}
    </TimelineItem>
  );
};
