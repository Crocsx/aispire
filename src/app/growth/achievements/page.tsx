import {
  Alert,
  Badge,
  Card,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
  ThemeIcon,
  GridCol,
} from '@mantine/core';
import { IconBulb, IconTrophy } from '@tabler/icons-react';

export default function Page() {
  const achievements = [
    {
      title: 'Communication Master',
      description: 'Successfully completed 5 feedback sessions',
      level: 'Gold',
      color: 'yellow',
      unlocked: true,
    },
    {
      title: 'Team Player',
      description: 'Contributed to 3 team projects',
      level: 'Silver',
      color: 'gray',
      unlocked: true,
    },
    {
      title: 'Growth Mindset',
      description: 'Completed 10 learning resources',
      level: 'Bronze',
      color: 'orange',
      unlocked: true,
    },
    {
      title: 'Leadership Excellence',
      description: 'Lead 5 team initiatives',
      level: 'Locked',
      color: 'gray',
      unlocked: false,
    },
    {
      title: 'Code Quality Champion',
      description: 'Maintain 90% code quality score for 3 months',
      level: 'Locked',
      color: 'gray',
      unlocked: false,
    },
    {
      title: 'Innovation Pioneer',
      description: 'Successfully implement 3 innovative solutions',
      level: 'Locked',
      color: 'gray',
      unlocked: false,
    },
  ];

  return (
    <Stack gap="xl">
      <Alert
        icon={<IconBulb size={16} />}
        title="Demo Page"
        color="red"
        mb="xl"
      >
        This feature is not yet implemented. The idea would be to have some
        achievement has a way to keep the user engaged with the practices,
        improvement and other things like giving feedbacks and to provide a
        leaderboard and achievement to users so they can maybe keep the
        motivation up.
      </Alert>

      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>Your Achievements</Title>
          <Text size="sm" c="dimmed">
            Track your growth journey through earned achievements and badges
          </Text>
        </Stack>
      </Paper>

      <Grid>
        {achievements.map((achievement) => (
          <GridCol key={achievement.title} span={{ base: 12, md: 4 }}>
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              style={{ opacity: achievement.unlocked ? 1 : 0.5 }}
            >
              <Stack gap="md">
                <ThemeIcon size={40} radius="md" color={achievement.color}>
                  <IconTrophy size={24} />
                </ThemeIcon>

                <Stack gap="xs">
                  <Title order={4}>{achievement.title}</Title>
                  <Text size="sm" c="dimmed">
                    {achievement.description}
                  </Text>
                </Stack>

                <Badge color={achievement.color} size="lg" variant="light">
                  {achievement.level}
                </Badge>
              </Stack>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
}
