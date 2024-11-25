import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  Timeline,
  Card,
  List,
  ThemeIcon,
  Button,
  Group,
  Badge,
  TimelineItem,
  ListItem,
} from '@mantine/core';
import {
  IconCheck,
  IconBulb,
  IconTarget,
  IconHistory,
} from '@tabler/icons-react';

// Mock data - Replace with real data from backend
const feedbackHistory = [
  {
    date: '2024-01-15',
    source: 'Manager Review',
    feedback:
      'Shows strong technical skills but could improve team communication',
    status: 'In Progress',
  },
  {
    date: '2023-12-01',
    source: 'Peer Review',
    feedback:
      'Great collaboration on the latest project. Very helpful with code reviews.',
    status: 'Completed',
  },
  {
    date: '2023-11-15',
    source: 'Client Feedback',
    feedback: 'Delivered high quality work ahead of schedule',
    status: 'Completed',
  },
];

const scenarios = [
  {
    title: 'Team Communication',
    description:
      'Practice implementing feedback about clearer team communication',
    tips: [
      'Schedule regular check-ins with team members',
      'Document decisions and share with the team',
      'Ask for clarification when needed',
    ],
  },
  {
    title: 'Technical Leadership',
    description: 'Apply feedback about taking more technical leadership',
    tips: [
      'Lead technical discussions in meetings',
      'Mentor junior developers',
      'Propose architectural improvements',
    ],
  },
];

export default function Page() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Paper shadow="xs" p="md" withBorder>
          <Title order={2}>Feedback Utilization</Title>
          <Text c="dimmed">Track, analyze and apply feedback effectively</Text>
        </Paper>

        <Tabs defaultValue="history">
          <TabsList mb="md">
            <TabsTab value="history" leftSection={<IconHistory size={16} />}>
              Feedback History
            </TabsTab>
            <TabsTab value="scenarios" leftSection={<IconTarget size={16} />}>
              Practice Scenarios
            </TabsTab>
            <TabsTab value="suggestions" leftSection={<IconBulb size={16} />}>
              Improvement Suggestions
            </TabsTab>
          </TabsList>

          <TabsPanel value="history">
            <Timeline active={1} bulletSize={24} lineWidth={2}>
              {feedbackHistory.map((item) => (
                <TimelineItem
                  key={item.date}
                  bullet={<IconCheck size={12} />}
                  title={item.source}
                >
                  <Text size="sm">{item.feedback}</Text>
                  <Text size="xs" c="dimmed" mt={4}>
                    {item.date}
                  </Text>
                  <Badge
                    variant={item.status === 'Completed' ? 'filled' : 'light'}
                    color={item.status === 'Completed' ? 'green' : 'blue'}
                    mt={4}
                  >
                    {item.status}
                  </Badge>
                </TimelineItem>
              ))}
            </Timeline>
          </TabsPanel>

          <TabsPanel value="scenarios">
            <Stack gap="md">
              {scenarios.map((scenario) => (
                <Card key={scenario.title} withBorder>
                  <Title order={4} mb="sm">
                    {scenario.title}
                  </Title>
                  <Text size="sm" mb="md">
                    {scenario.description}
                  </Text>
                  <List
                    spacing="xs"
                    size="sm"
                    icon={
                      <ThemeIcon color="blue" size={20} radius="xl">
                        <IconCheck size={12} />
                      </ThemeIcon>
                    }
                  >
                    {scenario.tips.map((tip) => (
                      <ListItem key={tip}>{tip}</ListItem>
                    ))}
                  </List>
                  <Group mt="md">
                    <Button variant="light">Start Practice</Button>
                  </Group>
                </Card>
              ))}
            </Stack>
          </TabsPanel>

          <TabsPanel value="suggestions">
            <Paper withBorder p="md">
              <Stack gap="md">
                <Title order={3}>Personalized Improvement Plan</Title>
                <Text>Based on your recent feedback and learning style:</Text>
                <List>
                  <ListItem>
                    Schedule regular pair programming sessions
                  </ListItem>
                  <ListItem>Join the technical presentation workshop</ListItem>
                  <ListItem>Take the advanced system design course</ListItem>
                  <ListItem>
                    Volunteer to lead the next sprint planning
                  </ListItem>
                </List>
                <Button mt="md">View Detailed Plan</Button>
              </Stack>
            </Paper>
          </TabsPanel>
        </Tabs>
      </Stack>
    </Container>
  );
}
