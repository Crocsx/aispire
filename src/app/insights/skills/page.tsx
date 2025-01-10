'use client';

import {
  Card,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Container,
} from '@mantine/core';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

const skillsData = [
  {
    category: 'Communication',
    skills: [
      {
        name: 'Clarity',
        currentScore: 85,
        previousScore: 75,
        peerScore: 80,
        description:
          'Ability to express ideas effectively in writing and speech',
      },
      {
        name: 'Listening Skills',
        currentScore: 90,
        previousScore: 85,
        peerScore: 82,
        description: 'Demonstrated ability to understand and process feedback',
      },
    ],
  },
  {
    category: 'Problem-Solving',
    skills: [
      {
        name: 'Critical Thinking',
        currentScore: 80,
        previousScore: 70,
        peerScore: 75,
        description: 'Assessing situations logically and providing solutions',
      },
      {
        name: 'Creativity',
        currentScore: 75,
        previousScore: 65,
        peerScore: 70,
        description: 'Innovation in overcoming challenges',
      },
    ],
  },
  {
    category: 'Collaboration',
    skills: [
      {
        name: 'Team Contribution',
        currentScore: 90,
        previousScore: 80,
        peerScore: 85,
        description: 'Active and effective involvement in team efforts',
      },
      {
        name: 'Conflict Resolution',
        currentScore: 75,
        previousScore: 65,
        peerScore: 72,
        description: 'Handling disagreements constructively',
      },
    ],
  },
  {
    category: 'Leadership',
    skills: [
      {
        name: 'Initiative',
        currentScore: 70,
        previousScore: 60,
        peerScore: 68,
        description: 'Proactively taking on responsibilities',
      },
      {
        name: 'Motivation',
        currentScore: 75,
        previousScore: 65,
        peerScore: 70,
        description:
          'Inspiring and guiding others, even without formal authority',
      },
    ],
  },
];

export default function Page() {
  return (
    <Stack gap="xl">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>Skills Assessment</Title>
          <Text size="sm" c="dimmed">
            Detailed analysis of your professional skills and their development
            over time.
          </Text>
        </Stack>
      </Paper>

      <Grid>
        {skillsData.map((category) => (
          <Grid.Col key={category.category} span={{ base: 12, md: 6 }}>
            <Paper shadow="sm" p="md" withBorder>
              <Stack gap="md">
                <Title order={4}>{category.category}</Title>

                {category.skills.map((skill) => (
                  <Card key={skill.name} withBorder shadow="xs" p="sm">
                    <Stack gap="xs">
                      <Text fw={500}>{skill.name}</Text>
                      <Text size="sm" c="dimmed">
                        {skill.description}
                      </Text>

                      <Grid>
                        <Grid.Col span={4}>
                          <Stack gap={0} align="center">
                            <Text fw={700} size="lg">
                              {skill.currentScore}%
                            </Text>
                            <Text size="xs" c="dimmed">
                              Current
                            </Text>
                          </Stack>
                        </Grid.Col>

                        <Grid.Col span={4}>
                          <Stack gap={0} align="center">
                            <Container
                              size="sm"
                              c={
                                skill.currentScore - skill.previousScore > 0
                                  ? 'teal'
                                  : 'red'
                              }
                            >
                              {skill.previousScore}%
                              <ThemeIcon
                                color={
                                  skill.currentScore - skill.previousScore > 0
                                    ? 'teal'
                                    : 'red'
                                }
                                size={16}
                                variant="light"
                              >
                                {skill.currentScore - skill.previousScore >
                                0 ? (
                                  <IconArrowUp size={12} />
                                ) : (
                                  <IconArrowDown size={12} />
                                )}
                              </ThemeIcon>
                            </Container>
                            <Text size="xs" c="dimmed">
                              Previous
                            </Text>
                          </Stack>
                        </Grid.Col>

                        <Grid.Col span={4}>
                          <Stack gap={0} align="center">
                            <Container
                              size="sm"
                              c={
                                skill.currentScore - skill.peerScore > 0
                                  ? 'teal'
                                  : 'red'
                              }
                            >
                              {skill.peerScore}%
                              <ThemeIcon
                                color={
                                  skill.currentScore - skill.peerScore > 0
                                    ? 'teal'
                                    : 'red'
                                }
                                size={16}
                                variant="light"
                              >
                                {skill.currentScore - skill.peerScore > 0 ? (
                                  <IconArrowUp size={12} />
                                ) : (
                                  <IconArrowDown size={12} />
                                )}
                              </ThemeIcon>
                            </Container>
                            <Text size="xs" c="dimmed">
                              Peer Avg
                            </Text>
                          </Stack>
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
