import {
  Paper,
  Stack,
  Text,
  Title,
  Alert,
  ThemeIcon,
  rem,
  Group,
  List,
  Card,
  Box,
  Divider,
} from '@mantine/core';
import {
  IconTrendingUp,
  IconTargetArrow,
  IconCircleCheck,
  IconBulb,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { ReflectionSchema } from '~aispire/shared/schema';

export const SubmissionReview = ({
  output_summary,
  output_suggestion,
  output_points_improved,
  output_points_to_improve,
}: z.infer<typeof ReflectionSchema>) => {
  const t = useTranslations('app:feedback.ReflectionForm');
  return (
    <>
      <Alert
        variant="light"
        color="green"
        mb="md"
        title={t('processed.title')}
        icon={<IconCircleCheck size={rem(20)} />}
      >
        {t('processed.description')}
      </Alert>
      <Paper shadow="md" p="md" withBorder>
        <Stack gap="xl">
          <Card withBorder padding="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Group gap="xs">
                <ThemeIcon
                  size="xl"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 35 }}
                >
                  <IconBulb size={rem(24)} />
                </ThemeIcon>
                <Title order={4}>{t('insights.keyInsights')}</Title>
              </Group>
              <Box p="sm" bg="gray.0" style={{ borderRadius: '8px' }}>
                <Text size="sm" mb="xs">
                  {output_summary}
                </Text>
                <Divider my="xs" variant="dashed" />
                <Text fw={500} c="dimmed" size="sm">
                  {output_suggestion}
                </Text>
              </Box>
            </Stack>
          </Card>

          <Card withBorder padding="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Group gap="xs">
                <ThemeIcon
                  size="xl"
                  variant="gradient"
                  gradient={{ from: 'green', to: 'teal', deg: 35 }}
                >
                  <IconTrendingUp size={rem(24)} />
                </ThemeIcon>
                <Title order={4}>{t('insights.progressHighlights')}</Title>
              </Group>
              <List
                spacing="md"
                size="sm"
                center
                icon={
                  <ThemeIcon
                    variant="gradient"
                    gradient={{ from: 'green', to: 'teal' }}
                    size={28}
                    radius="xl"
                  >
                    <IconCircleCheck size={rem(16)} />
                  </ThemeIcon>
                }
              >
                {(output_points_improved || []).map((point, index) => (
                  <List.Item key={index} style={{ lineHeight: 1.5 }}>
                    {point}
                  </List.Item>
                ))}
              </List>
            </Stack>
          </Card>

          <Card withBorder padding="lg" radius="md" shadow="sm">
            <Stack gap="md">
              <Group gap="xs">
                <ThemeIcon
                  size="xl"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'indigo', deg: 35 }}
                >
                  <IconTargetArrow size={rem(24)} />
                </ThemeIcon>
                <Title order={4}>{t('insights.growthOpportunities')}</Title>
              </Group>
              <List
                spacing="md"
                size="sm"
                center
                icon={
                  <ThemeIcon
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'indigo' }}
                    size={28}
                    radius="xl"
                  >
                    <IconTargetArrow size={rem(16)} />
                  </ThemeIcon>
                }
              >
                {(output_points_to_improve || []).map((point, index) => (
                  <List.Item key={index} style={{ lineHeight: 1.5 }}>
                    {point}
                  </List.Item>
                ))}
              </List>
            </Stack>
          </Card>
        </Stack>
      </Paper>
    </>
  );
};
