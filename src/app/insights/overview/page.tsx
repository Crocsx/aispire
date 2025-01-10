'use client';

import {
  Container,
  Title,
  Text,
  Paper,
  Grid,
  List,
  ThemeIcon,
  Alert,
  Stack,
} from '@mantine/core';
import {
  IconStarFilled,
  IconAlertTriangle,
  IconArrowUp,
  IconBulb,
  IconUserCircle,
} from '@tabler/icons-react';

export default function InsightsOverviewPage() {
  // This would normally come from an API/database
  const mockUserInsights = {
    name: 'John Doe',
    role: 'Software Engineer',
    profileSummary:
      'A dedicated professional with strong analytical skills and a passion for problem-solving.',
    strengths: [
      'Excellent technical problem-solving abilities',
      'Strong communication skills',
      'Quick learner with adaptable mindset',
      'Good team collaboration',
    ],
    areasForImprovement: [
      'Public speaking confidence',
      'Project management skills',
      'Work-life balance management',
    ],
    criticalFocus: [
      'Leadership skill development',
      'Strategic thinking enhancement',
      'Technical documentation practices',
    ],
    characteristics: [
      'Detail-oriented',
      'Analytical thinker',
      'Team player',
      'Innovation-driven',
    ],
  };

  return (
    <Stack gap="xl">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4} mb="xs">
            Profile Summary
          </Title>
          <Text size="sm" c="dimmed">
            {mockUserInsights.profileSummary}
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="md" withBorder h="100%">
            <Title order={4} mb="md">
              <IconStarFilled
                size={20}
                style={{ marginRight: 8, verticalAlign: 'text-bottom' }}
              />
              Key Strengths
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
              {mockUserInsights.strengths.map((strength, index) => (
                <List.Item key={index}>{strength}</List.Item>
              ))}
            </List>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="md" withBorder h="100%">
            <Title order={4} mb="md">
              <IconAlertTriangle
                size={20}
                style={{ marginRight: 8, verticalAlign: 'text-bottom' }}
              />
              Areas for Improvement
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
              {mockUserInsights.areasForImprovement.map((area, index) => (
                <List.Item key={index}>{area}</List.Item>
              ))}
            </List>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper shadow="sm" p="md" withBorder>
            <Title order={4} mb="md">
              Key Characteristics
            </Title>
            <Grid>
              {mockUserInsights.characteristics.map((characteristic, index) => (
                <Grid.Col key={index} span={{ base: 12, xs: 6, md: 3 }}>
                  <Paper shadow="xs" p="sm" withBorder ta="center">
                    <Text size="sm">{characteristic}</Text>
                  </Paper>
                </Grid.Col>
              ))}
            </Grid>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper shadow="sm" p="md" withBorder>
            <Title order={4} mb="md" c="red">
              Critical Focus Areas
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
              {mockUserInsights.criticalFocus.map((focus, index) => (
                <List.Item key={index}>{focus}</List.Item>
              ))}
            </List>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
