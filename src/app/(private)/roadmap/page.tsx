import {
  Container,
  Title,
  Paper,
  Group,
  Text,
  Progress,
  Card,
  SimpleGrid,
  Stack,
  Button,
  ThemeIcon,
  List,
  Badge,
  Tabs,
  TabsList,
  TabsTab,
  ListItem,
  TabsPanel,
} from '@mantine/core';
import {
  IconBook,
  IconBulb,
  IconCertificate,
  IconChartBar,
  IconCircleCheck,
  IconGitBranch,
  IconRocket,
  IconStars,
  IconTarget,
  IconUsers,
} from '@tabler/icons-react';

// Mock data - Replace with real data from your backend
const skillGaps = [
  {
    category: 'Leadership',
    currentLevel: 65,
    targetLevel: 85,
    areas: ['Team Management', 'Strategic Planning', 'Conflict Resolution'],
    recommendations: [
      {
        type: 'course',
        title: 'Advanced Leadership Skills',
        duration: '8 weeks',
      },
      {
        type: 'mentorship',
        title: 'Shadow Senior Manager',
        duration: '3 months',
      },
    ],
  },
  {
    category: 'Technical Skills',
    currentLevel: 75,
    targetLevel: 90,
    areas: ['System Architecture', 'Cloud Infrastructure', 'Security'],
    recommendations: [
      {
        type: 'project',
        title: 'Lead System Migration Project',
        duration: '2 months',
      },
      {
        type: 'certification',
        title: 'Cloud Architecture Certification',
        duration: '3 months',
      },
    ],
  },
  {
    category: 'Communication',
    currentLevel: 70,
    targetLevel: 85,
    areas: ['Public Speaking', 'Technical Writing', 'Stakeholder Management'],
    recommendations: [
      {
        type: 'workshop',
        title: 'Executive Presentation Skills',
        duration: '2 weeks',
      },
      {
        type: 'practice',
        title: 'Lead Team Presentations',
        duration: 'Ongoing',
      },
    ],
  },
];

const careerMilestones = [
  {
    title: 'Technical Lead',
    completed: true,
    achievements: ['Led team of 5', 'Delivered 3 major projects'],
  },
  {
    title: 'Senior Architect',
    completed: false,
    requirements: [
      'System design expertise',
      'Team leadership',
      'Strategic planning',
    ],
    progress: 65,
  },
  {
    title: 'Engineering Manager',
    completed: false,
    requirements: [
      'People management',
      'Department strategy',
      'Budget planning',
    ],
    progress: 30,
  },
];

export default function RoadmapPage() {
  return (
    <Container size="lg" py="xl">
      {/* Header Section */}
      <Paper shadow="xs" p="md" withBorder mb="xl">
        <Group justify="space-between" mb="md">
          <div>
            <Title order={2}>Personal Growth Roadmap</Title>
            <Text c="dimmed">
              Track your progress and plan your growth journey
            </Text>
          </div>
          <Badge
            size="xl"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Career Level: Senior Developer
          </Badge>
        </Group>
      </Paper>

      <Tabs defaultValue="gaps">
        <TabsList mb="xl">
          <TabsTab value="gaps" leftSection={<IconTarget size={16} />}>
            Skill Gap Analysis
          </TabsTab>
          <TabsTab value="career" leftSection={<IconGitBranch size={16} />}>
            Career Progress
          </TabsTab>
          <TabsTab value="recommendations" leftSection={<IconBulb size={16} />}>
            Recommendations
          </TabsTab>
        </TabsList>

        <TabsPanel value="gaps">
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
            {skillGaps.map((skill) => (
              <Card key={skill.category} withBorder padding="lg">
                <Group justify="space-between" mb="md">
                  <Title order={4}>{skill.category}</Title>
                  <ThemeIcon size="lg" variant="light" color="blue">
                    <IconChartBar size={20} />
                  </ThemeIcon>
                </Group>

                <Stack gap="xs">
                  <Text size="sm">Current Level: {skill.currentLevel}%</Text>
                  <Progress
                    value={(skill.currentLevel / skill.targetLevel) * 100}
                    size="lg"
                    radius="xl"
                  />
                  <Text size="xs" c="dimmed">
                    Target: {skill.targetLevel}%
                  </Text>
                </Stack>

                <List
                  spacing="xs"
                  size="sm"
                  mt="md"
                  icon={
                    <ThemeIcon color="blue" size={20} radius="xl">
                      <IconCircleCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  {skill.areas.map((area) => (
                    <ListItem key={area}>{area}</ListItem>
                  ))}
                </List>
              </Card>
            ))}
          </SimpleGrid>
        </TabsPanel>

        <TabsPanel value="career">
          <Paper withBorder p="xl">
            <Stack gap="xl">
              {careerMilestones.map((milestone, index) => (
                <Card key={milestone.title} withBorder>
                  <Group justify="space-between" mb="md">
                    <Group>
                      <ThemeIcon
                        size={40}
                        radius="xl"
                        variant="light"
                        color={milestone.completed ? 'green' : 'blue'}
                      >
                        {milestone.completed ? (
                          <IconCircleCheck size={24} />
                        ) : (
                          <IconTarget size={24} />
                        )}
                      </ThemeIcon>
                      <div>
                        <Title order={4}>{milestone.title}</Title>
                        {!milestone.completed && (
                          <Progress
                            value={milestone.progress}
                            mt="xs"
                            size="sm"
                            radius="xl"
                          />
                        )}
                      </div>
                    </Group>
                    <Badge
                      variant={milestone.completed ? 'filled' : 'light'}
                      color={milestone.completed ? 'green' : 'blue'}
                    >
                      {milestone.completed ? 'Achieved' : 'In Progress'}
                    </Badge>
                  </Group>
                  <List
                    spacing="xs"
                    size="sm"
                    icon={
                      <ThemeIcon color="blue" size={20} radius="xl">
                        <IconStars size={12} />
                      </ThemeIcon>
                    }
                  >
                    {milestone.completed
                      ? milestone.achievements?.map((achievement) => (
                          <ListItem key={achievement}>{achievement}</ListItem>
                        ))
                      : milestone.requirements?.map((req) => (
                          <ListItem key={req}>{req}</ListItem>
                        ))}
                  </List>
                </Card>
              ))}
            </Stack>
          </Paper>
        </TabsPanel>

        <TabsPanel value="recommendations">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            {skillGaps.map((skill) =>
              skill.recommendations.map((rec) => (
                <Card
                  key={`${skill.category}-${rec.title}`}
                  withBorder
                  padding="lg"
                >
                  <Group mb="md">
                    <ThemeIcon size="lg" variant="light" color="blue">
                      {rec.type === 'course' && <IconBook size={20} />}
                      {rec.type === 'mentorship' && <IconUsers size={20} />}
                      {rec.type === 'certification' && (
                        <IconCertificate size={20} />
                      )}
                      {rec.type === 'project' && <IconRocket size={20} />}
                    </ThemeIcon>
                    <div>
                      <Text fw={500}>{rec.title}</Text>
                      <Text size="sm" c="dimmed">
                        {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)} •{' '}
                        {rec.duration}
                      </Text>
                    </div>
                  </Group>
                  <Button variant="light" fullWidth>
                    Start Now
                  </Button>
                </Card>
              ))
            )}
          </SimpleGrid>
        </TabsPanel>
      </Tabs>
    </Container>
  );
}
