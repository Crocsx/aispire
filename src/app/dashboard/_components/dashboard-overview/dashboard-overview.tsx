import {
  Grid,
  Paper,
  Text,
  Title,
  Group,
  Card,
  SimpleGrid,
  ThemeIcon,
  List,
  Stack,
  Badge,
  GridCol,
  ListItem,
  Button,
  Flex,
} from '@mantine/core';
import {
  IconTrophy,
  IconMessageCircle,
  IconChartRadar,
  IconCalendarStats,
  IconPencilPlus,
  IconInfoCircle,
} from '@tabler/icons-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { PATHS } from 'src/config';

import { getDashboardData, getUserInformation } from './_actions';
import { PersonalOverview, ValuesRadarChart } from './_components';

export async function DashboardOverview() {
  const t = await getTranslations('app:dashboard');
  const { success, userInformation } = await getUserInformation();
  const result = await getDashboardData();

  if (!success || !userInformation) {
    return (
      <Text c="red" size="sm">
        Error loading user information
      </Text>
    );
  }

  if (!result.success || !result.data) {
    return (
      <Text c="red" size="sm">
        Error loading dashboard: {result.error}
      </Text>
    );
  }

  const data = result.data;

  const daysSinceLastReflection = data.lastReflection
    ? Math.floor(
        (new Date().getTime() -
          new Date(data.lastReflection.created_at).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  // Prepare values data for radar chart
  const valuesData = data.insights.values
    ? [
        {
          name: t('values.be_open'),
          value: data.insights.values.be_open_rate,
        },
        {
          name: t('values.be_bold'),
          value: data.insights.values.be_bold_rate,
        },
        {
          name: t('values.achieve_together'),
          value: data.insights.values.achieve_together_rate,
        },
        {
          name: t('values.stay_updated'),
          value: data.insights.values.stay_updated_rate,
        },
        {
          name: t('values.move_faster'),
          value: data.insights.values.move_faster_rate,
        },
      ]
    : [];

  return (
    <Stack gap="xl">
      <PersonalOverview
        username={userInformation.basic_info.full_name}
        department={userInformation.employment_details.department}
        level={userInformation.current_position.level}
        businessUnit={userInformation.employment_details.business_unit}
      />

      {/* Quick Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {/* Last Reflection Card */}
        <Card withBorder padding="lg">
          <Group gap="xs" mb="md">
            <ThemeIcon size="lg" radius="md" variant="light" color="blue">
              <IconCalendarStats size={20} />
            </ThemeIcon>
            <Title order={4}>{t('sections.lastReflection')}</Title>
          </Group>
          {data.lastReflection ? (
            <>
              <Text size="sm" c="dimmed">
                {t('lastReflectionDate', {
                  date: new Date(
                    data.lastReflection.created_at
                  ).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
                })}
              </Text>
              <Text size="sm" mt="xs">
                {daysSinceLastReflection && daysSinceLastReflection > 30
                  ? t('reflectionOverdue', { days: daysSinceLastReflection })
                  : t('reflectionUpToDate')}
              </Text>
            </>
          ) : (
            <Stack>
              <Text size="sm" c="dimmed">
                {t('noReflectionYet')}
              </Text>
              <Button
                component={Link}
                href={PATHS.feedback.reflection()}
                variant="filled"
                color="blue"
                leftSection={<IconPencilPlus size={16} />}
                fullWidth
              >
                {t('addNewReflection')}
              </Button>
            </Stack>
          )}
        </Card>

        {/* Latest Feedback Summary */}
        <Card withBorder padding="lg">
          <Group gap="xs" mb="md">
            <ThemeIcon size="lg" radius="md" variant="light" color="grape">
              <IconMessageCircle size={20} />
            </ThemeIcon>
            <Title order={4}>{t('sections.latestFeedback')}</Title>
          </Group>
          {data.feedbacks[0] ? (
            <>
              <Badge mb="xs">{data.feedbacks[0].type}</Badge>
              <Text size="sm" lineClamp={2}>
                {data.feedbacks[0].content}
              </Text>
              <Text size="xs" c="dimmed" mt="xs">
                {t('from', { name: data.feedbacks[0].from_user_name })}
              </Text>
            </>
          ) : (
            <Stack>
              <Text size="sm" c="dimmed">
                {t('noFeedbackYet')}
              </Text>
              <Flex gap="xs" align="center">
                <IconMessageCircle
                  size={16}
                  style={{ flexShrink: '0' }}
                  color="var(--mantine-color-grape-6)"
                />
                <Text size="sm" c="dimmed">
                  <span>{t('requestFeedback')}</span>
                </Text>
              </Flex>
            </Stack>
          )}
        </Card>

        {/* Key Strengths Summary */}
        <Card withBorder padding="lg">
          <Group gap="xs" mb="md">
            <ThemeIcon size="lg" radius="md" variant="light" color="teal">
              <IconTrophy size={20} />
            </ThemeIcon>
            <Title order={4}>{t('sections.keyStrengths')}</Title>
          </Group>
          {data.insights.overview?.strengths ? (
            <List
              size="sm"
              spacing="xs"
              center
              withPadding
              icon={
                <ThemeIcon color="teal" size={16} radius="xl">
                  <IconTrophy size={10} />
                </ThemeIcon>
              }
            >
              {data.insights.overview.strengths
                .slice(0, 2)
                .map((strength, index) => (
                  <ListItem key={index}>{strength}</ListItem>
                ))}
            </List>
          ) : (
            <Stack>
              <Flex gap="xs" align="center">
                <Text size="sm" c="dimmed">
                  <span>{t('noStrengthsYet')}</span>
                </Text>
              </Flex>
              <Flex gap="xs" align="center">
                <IconInfoCircle
                  size={16}
                  style={{ flexShrink: '0', opacity: 0.5 }}
                  color="var(--mantine-color-teal-6)"
                />
                <Text size="sm" c="dimmed">
                  <span>{t('strengthAfterEvaluation')}</span>
                </Text>
              </Flex>
            </Stack>
          )}
        </Card>
      </SimpleGrid>

      {valuesData.length > 0 && (
        <Grid>
          {/* Values Radar Chart */}
          <GridCol span={{ base: 12, md: 6 }}>
            <Card withBorder padding="lg">
              <Group justify="space-between" mb="xl">
                <Title order={3}>{t('sections.valuesAlignment')}</Title>
                <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                  <IconChartRadar size={28} />
                </ThemeIcon>
              </Group>

              <Paper p="md">
                <ValuesRadarChart data={valuesData} />
              </Paper>
            </Card>
          </GridCol>
        </Grid>
      )}
    </Stack>
  );
}
