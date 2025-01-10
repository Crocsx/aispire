import {
  Card,
  Group,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Avatar,
} from '@mantine/core';

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

export const RecentFeedback = () => {
  return (
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
  );
};
