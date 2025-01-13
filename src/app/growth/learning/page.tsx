import {
  Alert,
  Badge,
  Card,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
  Paper,
} from '@mantine/core';
import { IconBulb, IconPlayerPlay } from '@tabler/icons-react';

export default function Page() {
  const learningPaths = [
    {
      title: 'Technical Leadership',
      modules: 5,
      description: 'Learn to lead technical initiatives and mentor others',
      duration: '3 hours total',
    },
    {
      title: 'System Design',
      modules: 4,
      description: 'Master architectural patterns and scalable solutions',
      duration: '2.5 hours total',
    },
    {
      title: 'Effective Communication',
      modules: 3,
      description: 'Enhance your technical communication skills',
      duration: '1.5 hours total',
    },
  ];

  const recommendedResources = [
    {
      title: 'System Design Interview Guide',
      description: 'Comprehensive guide to ace system design discussions',
      type: 'Article',
      duration: '15 min read',
    },
    {
      title: 'Mentoring Best Practices',
      description: 'Learn effective techniques for mentoring junior developers',
      type: 'Video',
      duration: '25 min',
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
        This feature is not yet implemented. The idea would be to provide
        curated learning resources and paths tailored to each employee's
        development needs and career goals.
      </Alert>

      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>Learning Resources</Title>
          <Text size="sm" c="dimmed">
            Explore curated learning paths and resources designed to help you
            grow professionally
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <GridCol span={12}>
          <Card shadow="sm" p="lg" withBorder>
            <Stack gap="xl">
              <Title order={4}>Featured Learning Paths</Title>

              <Grid>
                {learningPaths.map((path) => (
                  <GridCol key={path.title} span={{ base: 12, md: 4 }}>
                    <Card withBorder shadow="sm" p="lg">
                      <Stack gap="md">
                        <Group justify="space-between" align="flex-start">
                          <Title order={4}>{path.title}</Title>
                          <Badge color="blue">{path.modules} modules</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {path.description}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {path.duration}
                        </Text>
                        <UnstyledButton
                          style={{ opacity: 0.6, cursor: 'not-allowed' }}
                        >
                          <Group>
                            <IconPlayerPlay size={16} />
                            <Text size="sm">Start Learning</Text>
                          </Group>
                        </UnstyledButton>
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
              <Title order={4}>Recommended Resources</Title>

              <Stack gap="md">
                {recommendedResources.map((resource) => (
                  <Card key={resource.title} withBorder p="md">
                    <Group justify="space-between" align="flex-start">
                      <Stack gap={4}>
                        <Title order={5}>{resource.title}</Title>
                        <Text size="sm" c="dimmed">
                          {resource.description}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {resource.type} • {resource.duration}
                        </Text>
                      </Stack>
                      <UnstyledButton
                        style={{ opacity: 0.6, cursor: 'not-allowed' }}
                      >
                        <Group>
                          <IconPlayerPlay size={16} />
                          <Text size="sm">
                            {resource.type === 'Video'
                              ? 'Watch Now'
                              : 'Read Now'}
                          </Text>
                        </Group>
                      </UnstyledButton>
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
