import {
  Grid,
  Paper,
  Text,
  Title,
  Group,
  Progress,
  Card,
  SimpleGrid,
  ThemeIcon,
  List,
  Timeline,
  GridCol,
  ListItem,
  TimelineItem,
} from '@mantine/core';
import {
  IconBulb,
  IconTarget,
  IconTrophy,
  IconCalendarEvent,
} from '@tabler/icons-react';

import { PaperLoadWrapper } from '~aispire/shared/ui';

import { getUserInformation } from './_actions';
import { PersonalOverview, RecentFeedback } from './_components';

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

export default async function Page() {
  const { userInformation } = await getUserInformation();

  return (
    <>
      <PaperLoadWrapper error={!userInformation}>
        <PersonalOverview
          username={userInformation?.basic_info.given_name || ''}
          department={userInformation?.employment_details.department || ''}
          businessUnit={userInformation?.employment_details.business_unit || ''}
          level={userInformation?.current_position.level || ''}
        />
      </PaperLoadWrapper>

      <Grid gutter="md">
        {/* Recent Feedback Section */}
        <GridCol span={{ base: 12, md: 6 }}>
          <RecentFeedback />
        </GridCol>

        {/* Upcoming Sessions Section */}
        <GridCol span={{ base: 12, md: 6 }}>
          <Card withBorder padding="lg">
            <Title order={3} mb="md">
              Upcoming Sessions
            </Title>
            <Timeline active={1} bulletSize={24} lineWidth={2}>
              {upcomingSessions.map((session) => (
                <TimelineItem
                  key={session.id}
                  bullet={<IconCalendarEvent size={12} />}
                  title={session.title}
                >
                  <Text size="sm" mt={4}>
                    {session.date}
                  </Text>
                </TimelineItem>
              ))}
            </Timeline>
          </Card>
        </GridCol>

        {/* Growth Roadmap Section */}
        <GridCol span={12}>
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
        </GridCol>

        {/* AI Insights Section */}
        <GridCol span={12}>
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
                  <ListItem>Improve public speaking skills</ListItem>
                  <ListItem>Focus on team collaboration</ListItem>
                  <ListItem>Develop project management abilities</ListItem>
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
                  <ListItem>Completed leadership workshop</ListItem>
                  <ListItem>Led successful project delivery</ListItem>
                  <ListItem>Received positive peer feedback</ListItem>
                </List>
              </Paper>
            </SimpleGrid>
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}
