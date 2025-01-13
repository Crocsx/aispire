import {
  Alert,
  Badge,
  Card,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
  UnstyledButton,
  Group,
  GridCol,
} from '@mantine/core';
import { IconBulb, IconPlayerPlay } from '@tabler/icons-react';

export default function Page() {
  const practiceAreas = [
    {
      title: 'Technical Leadership',
      description: 'Practice leading technical discussions and decision-making',
      scenarios: [
        'Team Conflict Resolution',
        'Project Planning Workshop',
        'Technical Decision Making',
      ],
    },
    {
      title: 'System Design',
      description: 'Work through real-world architecture challenges',
      scenarios: [
        'E-commerce Platform Design',
        'Social Media Feed System',
        'Real-time Chat Application',
        'Payment Processing System',
        'Video Streaming Service',
      ],
    },
    {
      title: 'Code Review',
      description: 'Enhance your code review and feedback skills',
      scenarios: [
        'Performance Optimization',
        'Security Assessment',
        'Architecture Review',
        'Testing Coverage Analysis',
      ],
    },
  ];

  const practiceHistory = [
    {
      title: 'System Design: Microservices Architecture',
      completedDays: 2,
      score: 85,
    },
    {
      title: 'Technical Leadership: Team Planning',
      completedDays: 5,
      score: 90,
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
        This feature is not yet implemented. The idea would be based on current
        area of improvement and lacking of the employee, to suggest practices
        and scenario with AI or not to practice and improve their skills.
      </Alert>

      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>Practice & Skill Development</Title>
          <Text size="sm" c="dimmed">
            Enhance your skills through interactive scenarios and practical
            exercises tailored to your growth areas
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <GridCol span={12}>
          <Card shadow="sm" p="lg" withBorder>
            <Stack gap="xl">
              <Title order={4}>Your Focus Areas</Title>

              <Grid>
                {practiceAreas.map((area) => (
                  <GridCol key={area.title} span={{ base: 12, md: 4 }}>
                    <Card withBorder shadow="sm" p="lg">
                      <Stack gap="md">
                        <Group justify="space-between" align="flex-start">
                          <Title order={4}>{area.title}</Title>
                          <Badge color="blue">
                            {area.scenarios.length} scenarios
                          </Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {area.description}
                        </Text>
                        <Stack gap="xs">
                          {area.scenarios.map((scenario) => (
                            <UnstyledButton
                              key={scenario}
                              style={{ opacity: 0.6, cursor: 'not-allowed' }}
                            >
                              <Group>
                                <IconPlayerPlay size={16} />
                                <Text size="sm">{scenario}</Text>
                              </Group>
                            </UnstyledButton>
                          ))}
                        </Stack>
                      </Stack>
                    </Card>
                  </GridCol>
                ))}
              </Grid>
            </Stack>
          </Card>
        </GridCol>

        <GridCol span={12}>
          <Card shadow="sm" p="lg" withBorder>
            <Stack gap="xl">
              <Title order={4}>Recent Practice History</Title>

              <Stack gap="md">
                {practiceHistory.map((history) => (
                  <Card key={history.title} withBorder p="md">
                    <Group justify="space-between" align="flex-start">
                      <Stack gap={4}>
                        <Title order={5}>{history.title}</Title>
                        <Text size="sm" c="dimmed">
                          Completed {history.completedDays} days ago
                        </Text>
                      </Stack>
                      <Badge color="green" size="lg">
                        Score: {history.score}%
                      </Badge>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Card>
        </GridCol>
      </Grid>
    </Stack>
  );
}
