'use client';

import {
  Accordion,
  Avatar,
  Box,
  Divider,
  Group,
  List,
  Loader,
  Paper,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useTranslations } from 'next-intl';

import { HistoryTimelineItemSchema } from '../../../../_type';
import { useFeedbackLoadDetails } from '../../_hooks';

export const FeedbackAccordionItem = ({
  timelineItem,
}: {
  timelineItem: Zod.infer<typeof HistoryTimelineItemSchema>;
}) => {
  const t = useTranslations('app:feedback.FeedbackActivityTimeline');
  const { loading, details, loadDetails } = useFeedbackLoadDetails();

  return (
    <Accordion onChange={loadDetails}>
      <Accordion.Item value={timelineItem.id} style={{ borderBottom: 'none' }}>
        <Paper radius="md" withBorder style={{ overflow: 'hidden' }}>
          <Accordion.Control>
            <Stack>
              <Group justify="space-between" align="flex-start">
                <Group gap="sm">
                  <Stack align="center" gap={4}>
                    <Tooltip label={timelineItem?.user_name}>
                      <Avatar
                        size="md"
                        src={timelineItem?.avatar_url}
                        radius="xl"
                      />
                    </Tooltip>
                  </Stack>
                </Group>
                <Stack gap={4} style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {timelineItem?.output_condensed_summary}
                  </Text>
                  {timelineItem?.output_condensed_suggestion && (
                    <Text size="sm" c="dimmed">
                      {timelineItem?.output_condensed_suggestion}
                    </Text>
                  )}
                </Stack>
              </Group>
            </Stack>
          </Accordion.Control>
          <Accordion.Panel>
            {loading ? (
              <Loader size="sm" />
            ) : (
              details && (
                <Stack gap="md">
                  <Box>
                    <Text size="sm" fw={600} mb="xs" c="primary.7">
                      {t('timelineItem.feedback')}
                    </Text>
                    <Stack gap="xs">
                      <Text size="sm">
                        <Text span fw={500} c="gray.7">
                          {t('timelineItem.content')}:{' '}
                        </Text>
                        {details.content}
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
                        {details.output_summary}
                      </Text>
                      <Text size="sm">
                        <Text span fw={500} c="gray.7">
                          {t('timelineItem.suggestion')}:{' '}
                        </Text>
                        {details.output_suggestion}
                      </Text>
                    </Stack>
                  </Box>

                  <Divider />

                  <Box>
                    <Text size="sm" fw={600} mb="xs" c="primary.7">
                      {t('timelineItem.pointsImproved')}:
                    </Text>
                    <List size="sm" withPadding spacing="xs">
                      {details.output_points_improved.map(
                        (point: string, index: number) => (
                          <List.Item key={index}>{point}</List.Item>
                        )
                      )}
                    </List>
                  </Box>

                  <Box>
                    <Text size="sm" fw={600} mb="xs" c="primary.7">
                      {t('timelineItem.pointsToImprove')}:
                    </Text>
                    <List size="sm" withPadding spacing="xs">
                      {details.output_points_to_improve.map(
                        (point: string, index: number) => (
                          <List.Item key={index}>{point}</List.Item>
                        )
                      )}
                    </List>
                  </Box>
                </Stack>
              )
            )}
          </Accordion.Panel>
        </Paper>
      </Accordion.Item>
    </Accordion>
  );
};
