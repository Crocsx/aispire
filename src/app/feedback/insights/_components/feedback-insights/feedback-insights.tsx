import {
  Title,
  Paper,
  Text,
  Grid,
  List,
  Card,
  Group,
  Button,
  Stack,
  ListItem,
  GridCol,
} from '@mantine/core';
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconBulb,
} from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';

import { retrieveInsights } from './_actions';

export const FeedbackInsights = async () => {
  const { data } = await retrieveInsights();
  const t = await getTranslations('app:feedback.FeedbackInsights');

  if (!data) {
    return <div>{t('noInsights')}</div>;
  }

  return (
    <Stack gap="xl">
      {/* Header Paper */}
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>{t('paper.title')}</Title>
          <Text size="sm" c="dimmed">
            {data.feedback_summary}
          </Text>
        </Stack>
      </Paper>

      {/* Main Content Paper */}
      <Paper shadow="sm" p="lg" withBorder>
        <Stack gap="md">
          {/* Strengths & Areas for Improvement */}
          <Grid>
            <GridCol span={6}>
              <Stack gap="xs">
                <Title order={4}>{t('strengths.title')}</Title>
                <List
                  spacing="sm"
                  size="sm"
                  center
                  icon={<IconArrowUpRight size={16} color="teal" />}
                >
                  {data.strength_points.map((strength, index) => (
                    <ListItem key={index}>{strength}</ListItem>
                  ))}
                </List>
              </Stack>
            </GridCol>

            <GridCol span={6}>
              <Stack gap="xs">
                <Title order={4}>{t('improvements.title')}</Title>
                <List
                  spacing="sm"
                  size="sm"
                  center
                  icon={<IconArrowDownRight size={16} color="red" />}
                >
                  {data.improvement_points.map((improvement, index) => (
                    <ListItem key={index}>{improvement}</ListItem>
                  ))}
                </List>
              </Stack>
            </GridCol>
          </Grid>

          {/* Actionable Next Steps */}
          <Stack gap="xs">
            <Title order={4}>{t('nextSteps.title')}</Title>
            <List
              spacing="sm"
              size="sm"
              icon={<IconArrowUpRight size={16} color="blue" />}
            >
              {data.suggested_path.map((step, index) => (
                <ListItem key={index}>{step}</ListItem>
              ))}
            </List>
          </Stack>

          {/* Learning Resources */}
          <Stack gap="xs">
            <Title order={4}>{t('resources.title')}</Title>
            <Grid>
              {data.suggested_ressources.map((resource, index) => (
                <GridCol key={index} span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group mb="xs">
                      <Text fw={500}>{resource.title}</Text>
                      <IconBulb size={18} />
                    </Group>
                    <Text size="sm" mb="md">
                      {resource.description}
                    </Text>
                    <Button
                      variant="light"
                      color="blue"
                      fullWidth
                      component="a"
                      href={resource.link}
                    >
                      {t('resources.accessButton')}
                    </Button>
                  </Card>
                </GridCol>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
