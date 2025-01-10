'use client';

import {
  Card,
  Container,
  Stack,
  Text,
  Title,
  ThemeIcon,
  List,
  Grid,
  Paper,
} from '@mantine/core';
import { IconBulb, IconArrowUp } from '@tabler/icons-react';

const recommendations = [
  {
    title: 'Public Speaking Development',
    score: 75,
    description:
      'Based on your profile assessment, building confidence in public speaking would significantly enhance your professional presence.',
    actionItems: [
      'Join a local Toastmasters club or similar speaking group',
      'Volunteer to present in team meetings',
      'Practice presentations with trusted colleagues',
    ],
  },
  {
    title: 'Project Management Enhancement',
    score: 80,
    description:
      'To complement your technical skills, strengthening project management capabilities will help you lead initiatives more effectively.',
    actionItems: [
      'Take a project management certification course',
      'Use project management tools consistently',
      'Shadow experienced project managers',
    ],
  },
  {
    title: 'Work-Life Balance Optimization',
    score: 70,
    description:
      'Maintaining a healthy work-life balance is crucial for long-term success and well-being in your role.',
    actionItems: [
      'Set clear boundaries for work hours',
      'Schedule regular breaks during workday',
      'Develop time management strategies',
    ],
  },
];

export default function Page() {
  return (
    <Stack gap="xl">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>Growth Recommendations</Title>
          <Text size="sm" c="dimmed">
            Based on your profile analysis, here are personalized
            recommendations to help you improve in key areas.
          </Text>
        </Stack>
      </Paper>

      <Grid>
        {recommendations.map((recommendation, i) => (
          <Grid.Col key={i}>
            <Card key={recommendation.title} withBorder shadow="sm" p="lg">
              <Stack gap="md">
                <Title order={4}>
                  <IconBulb
                    size={20}
                    style={{ marginRight: 8, verticalAlign: 'text-bottom' }}
                  />
                  {recommendation.title}
                </Title>
                <Text size="sm">{recommendation.description}</Text>

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
                  {recommendation.actionItems.map((item) => (
                    <List.Item key={item}>{item}</List.Item>
                  ))}
                </List>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
