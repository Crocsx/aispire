import { Stack, Text, List, Box, Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { ReflectionSchema } from '~aispire/shared/schema';

export const ActivityDetailsCard = ({
  reflection,
}: {
  reflection: Zod.infer<typeof ReflectionSchema>;
}) => {
  const t = useTranslations('app:feedback.FeedbackActivityTimeline');
  return (
    <Stack gap="md">
      <Box>
        <Text size="sm" fw={600} mb="xs" c="primary.7">
          {t('timelineItem.yourReflection')}
        </Text>
        <Stack gap="xs">
          <Text size="sm">
            <Text span fw={500} c="gray.7">
              {t('timelineItem.whatWentWell')}:{' '}
            </Text>
            {reflection.input_success}
          </Text>
          <Text size="sm">
            <Text span fw={500} c="gray.7">
              {t('timelineItem.challengeFaced')}:{' '}
            </Text>
            {reflection.input_challenge}
          </Text>
          <Text size="sm">
            <Text span fw={500} c="gray.7">
              {t('timelineItem.focusForTomorrow')}:{' '}
            </Text>
            {reflection.input_focus}
          </Text>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Text size="sm" fw={600} mb="xs" c="primary.7">
          {t('timelineItem.aiFeedback')}
        </Text>
        <Stack gap="xs">
          <Text size="sm">
            <Text span fw={500} c="gray.7">
              {t('timelineItem.summary')}:{' '}
            </Text>
            {reflection.output_condensed_summary}
          </Text>
          <Text size="sm">
            <Text span fw={500} c="gray.7">
              {t('timelineItem.suggestion')}:{' '}
            </Text>
            {reflection.output_condensed_suggestion}
          </Text>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Text size="sm" fw={600} mb="xs" c="primary.7">
          {t('timelineItem.pointsImproved')}:
        </Text>
        <List size="sm" withPadding spacing="xs">
          {reflection.output_points_improved.map((point, index) => (
            <List.Item key={index}>{point}</List.Item>
          ))}
        </List>
      </Box>

      <Box>
        <Text size="sm" fw={600} mb="xs" c="primary.7">
          {t('timelineItem.pointsToImprove')}:
        </Text>
        <List size="sm" withPadding spacing="xs">
          {reflection.output_points_to_improve.map((point, index) => (
            <List.Item key={index}>{point}</List.Item>
          ))}
        </List>
      </Box>
    </Stack>
  );
};
