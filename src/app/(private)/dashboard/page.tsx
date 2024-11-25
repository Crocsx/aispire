'use client';

import {
  Container,
  Grid,
  Paper,
  Text,
  Title,
  Group,
  Progress,
  Stack,
  Card,
  Avatar,
  SimpleGrid,
  ThemeIcon,
  List,
  Timeline,
  Button,
  Badge,
} from '@mantine/core';
import {
  IconArrowUpRight,
  IconBulb,
  IconTarget,
  IconTrophy,
  IconCalendarEvent,
} from '@tabler/icons-react';

// Mock data - Replace with real data from your backend
const progressData = {
  skillsProgress: 75,
  feedbackActions: 60,
  reflectionsCompleted: 85,
  valuesAlignment: 90,
};

const recentFeedback = [
  {
    id: 1,
    from: 'Sarah Manager',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Great progress on communication skills this month.',
    date: '2 days ago',
    type: 'positive',
  },
  {
    id: 2,
    from: 'John Peer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Consider being more proactive in team meetings.',
    date: '5 days ago',
    type: 'constructive',
  },
];

const upcomingSessions = [
  {
    id: 1,
    title: 'Monthly Reflection',
    date: '2024-03-15',
    type: 'reflection',
  },
  {
    id: 2,
    title: 'Feedback Review',
    date: '2024-03-20',
    type: 'feedback',
  },
];

const growthMilestones = [
  {
    title: 'Leadership Skills',
    progress: 70,
    description: 'Developing team management capabilities',
  },
  {
    title: 'Technical Expertise',
    progress: 85,
    description: 'Advancing professional knowledge',
  },
  {
    title: 'Communication',
    progress: 60,
    description: 'Enhancing presentation skills',
  },
];

export default function Page() {
  return (
    <Container size="lg" py="xl">
      {/* Personal Overview Section */}
      <Paper shadow="sm" p="md" withBorder mb="xl">
        <Group justify="space-between" mb="md">
          <Group>
            <Avatar
              size="xl"
              src="https://i.pravatar.cc/150?img=3"
              radius="xl"
            />
            <div>
              <Title order={2}>Welcome back, Alex!</Title>
              <Text c="dimmed">Senior Developer | Growth Journey: Month 3</Text>
            </div>
          </Group>
          <Badge
            size="xl"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Level 7 Growth
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
              <Text size="xs" c="dimmed" fw={700}>
                SKILLS PROGRESS
              </Text>
              <ThemeIcon color="green" variant="light">
                <IconArrowUpRight size={16} />
              </ThemeIcon>
            </Group>
            <Group align="flex-end" gap="xs" mt={25}>
              <Text fz="24" fw={700}>
                {progressData.skillsProgress}%
              </Text>
            </Group>
            <Progress value={progressData.skillsProgress} mt="md" />
          </Paper>

          {/* Similar stats cards for other metrics */}
          {/* ... */}
        </SimpleGrid>
      </Paper>

      <Grid gutter="md">
        {/* Recent Feedback Section */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder padding="lg">
            <Group justify="space-between" mb="md">
              <Title order={3}>Recent Feedback</Title>
              <Button variant="light">View All</Button>
            </Group>
            <Stack gap="md">
              {recentFeedback.map((feedback) => (
                <Paper key={feedback.id} withBorder p="md" radius="md">
                  <Group>
                    <Avatar src={feedback.avatar} radius="xl" />
                    <div style={{ flex: 1 }}>
                      <Text fw={500}>{feedback.from}</Text>
                      <Text size="sm" c="dimmed">
                        {feedback.content}
                      </Text>
                      <Text size="xs" c="dimmed" mt={4}>
                        {feedback.date}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Upcoming Sessions Section */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder padding="lg">
            <Title order={3} mb="md">
              Upcoming Sessions
            </Title>
            <Timeline active={1} bulletSize={24} lineWidth={2}>
              {upcomingSessions.map((session) => (
                <Timeline.Item
                  key={session.id}
                  bullet={<IconCalendarEvent size={12} />}
                  title={session.title}
                >
                  <Text size="sm" mt={4}>
                    {session.date}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Grid.Col>

        {/* Growth Roadmap Section */}
        <Grid.Col span={12}>
          <Card withBorder padding="lg">
            <Title order={3} mb="xl">
              Growth Roadmap
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
              {growthMilestones.map((milestone) => (
                <Card key={milestone.title} withBorder padding="md">
                  <Text fw={500} mb="xs">
                    {milestone.title}
                  </Text>
                  <Text size="sm" c="dimmed" mb="md">
                    {milestone.description}
                  </Text>
                  <Progress value={milestone.progress} size="lg" radius="xl" />
                  <Text size="xs" ta="right" mt={4}>
                    {milestone.progress}%
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Card>
        </Grid.Col>

        {/* AI Insights Section */}
        <Grid.Col span={12}>
          <Card withBorder padding="lg">
            <Group justify="space-between" mb="xl">
              <Title order={3}>AI-Powered Insights</Title>
              <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                <IconBulb size={28} />
              </ThemeIcon>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              <Paper withBorder p="md" radius="md">
                <Text fw={500} mb="xs">
                  Suggested Focus Areas
                </Text>
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={<IconTarget size={16} />}
                >
                  <List.Item>Improve public speaking skills</List.Item>
                  <List.Item>Focus on team collaboration</List.Item>
                  <List.Item>Develop project management abilities</List.Item>
                </List>
              </Paper>
              <Paper withBorder p="md" radius="md">
                <Text fw={500} mb="xs">
                  Recent Achievements
                </Text>
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={<IconTrophy size={16} />}
                >
                  <List.Item>Completed leadership workshop</List.Item>
                  <List.Item>Led successful project delivery</List.Item>
                  <List.Item>Received positive peer feedback</List.Item>
                </List>
              </Paper>
            </SimpleGrid>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
