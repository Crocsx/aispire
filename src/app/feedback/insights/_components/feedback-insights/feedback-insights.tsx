import {
  Container,
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
    <Container size="lg" py="xl">
      <Stack>
        {/* Feedback Summary Section */}
        <Paper shadow="sm" p="md" withBorder>
          <Title order={2} mb="md">
            {t('feedbackSummary.title')}
          </Title>
          <Text size="lg">{data.feedback_summary}</Text>
        </Paper>

        {/* Strengths & Areas for Improvement */}
        <Grid>
          <GridCol span={6}>
            <Paper shadow="sm" p="md" withBorder>
              <Title order={3} mb="md">
                {t('strengths.title')}
              </Title>
              <List
                spacing="sm"
                size="lg"
                center
                icon={<IconArrowUpRight size={16} color="teal" />}
              >
                {data.strength_points.map((strength, index) => (
                  <ListItem key={index}>{strength}</ListItem>
                ))}
              </List>
            </Paper>
          </GridCol>

          <GridCol span={6}>
            <Paper shadow="sm" p="md" withBorder>
              <Title order={3} mb="md">
                {t('improvements.title')}
              </Title>
              <List
                spacing="sm"
                size="lg"
                center
                icon={<IconArrowDownRight size={16} color="red" />}
              >
                {data.improvement_points.map((improvement, index) => (
                  <ListItem key={index}>{improvement}</ListItem>
                ))}
              </List>
            </Paper>
          </GridCol>
        </Grid>

        {/* Actionable Next Steps */}
        <Paper shadow="sm" p="md" withBorder>
          <Title order={3} mb="md">
            {t('nextSteps.title')}
          </Title>
          <List
            spacing="sm"
            size="lg"
            icon={<IconArrowUpRight size={16} color="blue" />}
          >
            {data.suggested_path.map((step, index) => (
              <ListItem key={index}>{step}</ListItem>
            ))}
          </List>
        </Paper>

        {/* Learning Resources */}
        <Paper shadow="sm" p="md" withBorder>
          <Title order={3} mb="md">
            {t('resources.title')}
          </Title>
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
        </Paper>
      </Stack>
    </Container>
  );
};
