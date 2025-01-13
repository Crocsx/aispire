import {
  Card,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
  ThemeIcon,
  List,
  Timeline,
  Alert,
  GridCol,
  ListItem,
  TimelineItem,
} from '@mantine/core';
import {
  IconBulb,
  IconArrowUp,
  IconStar,
  IconTarget,
  IconTrophy,
  IconCertificate,
} from '@tabler/icons-react';

export default function Page() {
  const careerPath = {
    currentRole: {
      title: 'Software Engineer',
      level: 'L3',
      focusAreas: [
        'Technical expertise in core technologies',
        'Project delivery and ownership',
        'Team collaboration',
      ],
    },
    nextMilestone: {
      title: 'Senior Software Engineer',
      level: 'L4',
      requirements: [
        'Technical leadership in projects',
        'Mentoring junior developers',
        'System design and architecture',
      ],
    },
  };

  const developmentTracks = [
    {
      title: 'Technical Excellence',
      description: 'Build depth in technical skills and leadership',
      milestones: [
        'Complete Advanced System Design course',
        'Lead architecture decisions in 2 major projects',
        'Obtain cloud certification',
      ],
    },
    {
      title: 'Leadership Growth',
      description: 'Develop people and team management capabilities',
      milestones: [
        'Mentor 2 junior developers',
        'Lead sprint planning sessions',
        'Run technical knowledge sharing sessions',
      ],
    },
    {
      title: 'Business Impact',
      description: 'Increase contribution to business objectives',
      milestones: [
        'Drive 2 key technical initiatives',
        'Improve team delivery metrics',
        'Contribute to technical strategy',
      ],
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
        employee position and target require for next level, to suggested based
        on the feedback and reflection a path in order to improve to next level.
      </Alert>

      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>Your Growth Journey</Title>
          <Text size="sm" c="dimmed">
            A personalized roadmap to help you grow in your career and make
            meaningful impact
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <GridCol span={12}>
          <Paper shadow="sm" p="md" withBorder>
            <Stack gap="md">
              <Title order={4}>
                <IconTarget
                  size={20}
                  style={{ marginRight: 8, verticalAlign: 'text-bottom' }}
                />
                Current Position & Next Steps
              </Title>

              <Timeline active={1} bulletSize={24} lineWidth={2}>
                <TimelineItem
                  bullet={<IconStar size={12} />}
                  title="Current Role"
                >
                  <Text size="sm" fw={500}>
                    {careerPath.currentRole.title} (
                    {careerPath.currentRole.level})
                  </Text>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="blue" size={20} radius="xl">
                        <IconBulb size={12} />
                      </ThemeIcon>
                    }
                  >
                    {careerPath.currentRole.focusAreas.map((area) => (
                      <ListItem key={area}>{area}</ListItem>
                    ))}
                  </List>
                </TimelineItem>

                <TimelineItem
                  bullet={<IconTrophy size={12} />}
                  title="Next Milestone"
                >
                  <Text size="sm" fw={500}>
                    {careerPath.nextMilestone.title} (
                    {careerPath.nextMilestone.level})
                  </Text>
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
                    {careerPath.nextMilestone.requirements.map((req) => (
                      <ListItem key={req}>{req}</ListItem>
                    ))}
                  </List>
                </TimelineItem>
              </Timeline>
            </Stack>
          </Paper>
        </GridCol>

        {developmentTracks.map((track) => (
          <GridCol key={track.title} span={{ base: 12, md: 4 }}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={4}>
                  <IconCertificate
                    size={20}
                    style={{ marginRight: 8, verticalAlign: 'text-bottom' }}
                  />
                  {track.title}
                </Title>
                <Text size="sm" c="dimmed">
                  {track.description}
                </Text>
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="blue" size={20} radius="xl">
                      <IconBulb size={12} />
                    </ThemeIcon>
                  }
                >
                  {track.milestones.map((milestone) => (
                    <ListItem key={milestone}>{milestone}</ListItem>
                  ))}
                </List>
              </Stack>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
}
