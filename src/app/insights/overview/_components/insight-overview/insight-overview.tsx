import {
  Title,
  Text,
  Paper,
  Grid,
  List,
  ThemeIcon,
  Stack,
  GridCol,
  ListItem,
} from '@mantine/core';
import {
  IconStarFilled,
  IconAlertTriangle,
  IconArrowUp,
  IconBulb,
} from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';

import { getOverview } from './_actions';

export async function InsightOverview() {
  const t = await getTranslations('app:insight.InsightOverview');
  const result = await getOverview();

  if (!result.success || !result.data) {
    return (
      <Text c="red" size="sm">
        Error loading overview: {result.error}
      </Text>
    );
  }

  const overview = result.data;

  return (
    <Stack gap="xl">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>{t('profileSummary.title')}</Title>
          <Text size="sm" c="dimmed">
            {overview.profile_summary}
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="md" withBorder h="100%">
            <Title order={4} mb="md">
              <IconStarFilled
                size={20}
                style={{ marginRight: 8, verticalAlign: 'text-bottom' }}
              />
              {t('strengths.title')}
            </Title>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={20} radius="xl">
                  <IconArrowUp size={12} />
                </ThemeIcon>
              }
            >
              {overview.strengths?.map((strength, index) => (
                <ListItem key={index}>{strength}</ListItem>
              ))}
            </List>
          </Paper>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="md" withBorder h="100%">
            <Title order={4} mb="md">
              <IconAlertTriangle
                size={20}
                style={{ marginRight: 8, verticalAlign: 'text-bottom' }}
              />
              {t('improvements.title')}
            </Title>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="orange" size={20} radius="xl">
                  <IconBulb size={12} />
                </ThemeIcon>
              }
            >
              {overview.areas_for_improvement?.map((area, index) => (
                <ListItem key={index}>{area}</ListItem>
              ))}
            </List>
          </Paper>
        </GridCol>

        <GridCol span={12}>
          <Paper shadow="sm" p="md" withBorder>
            <Title order={4} mb="md">
              {t('characteristics.title')}
            </Title>
            <Grid>
              {overview.key_characteristics?.map((characteristic, index) => (
                <GridCol key={index} span={{ base: 12, xs: 6, md: 3 }}>
                  <Paper shadow="xs" p="sm" withBorder ta="center">
                    <Text size="sm">{characteristic}</Text>
                  </Paper>
                </GridCol>
              ))}
            </Grid>
          </Paper>
        </GridCol>

        <GridCol span={12}>
          <Paper shadow="sm" p="md" withBorder>
            <Title order={4} mb="md" c="red">
              {t('criticalFocus.title')}
            </Title>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="red" size={20} radius="xl">
                  <IconAlertTriangle size={12} />
                </ThemeIcon>
              }
            >
              {overview.critical_focus_areas?.map((focus, index) => (
                <ListItem key={index}>{focus}</ListItem>
              ))}
            </List>
          </Paper>
        </GridCol>
      </Grid>
    </Stack>
  );
}
