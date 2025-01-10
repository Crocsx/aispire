'use client';

import {
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconDiamond } from '@tabler/icons-react';
import { ValuesRadarChart } from './_components';

const values = [
  {
    name: 'Be Open',
    score: 85,
    description:
      "Embrace diversity, and express your thoughts openly while respecting other people's opinions.",
    details:
      'Your strong communication skills and team collaboration abilities align well with this value. Continue fostering an open mindset.',
  },
  {
    name: 'Be Bold',
    score: 75,
    description:
      "Don't set limitations for yourself, keep on challenging for more.",
    details:
      'While you show adaptability, focusing on public speaking confidence and leadership development will help you be bolder.',
  },
  {
    name: 'Move Faster',
    score: 90,
    description:
      'Be faster than anyone else, and put your ideas into action quickly.',
    details:
      'Your quick learning ability and problem-solving skills enable you to move fast. Keep enhancing strategic thinking.',
  },
  {
    name: 'Stay Updated',
    score: 80,
    description: 'Update yourself with information to achieve better outcomes.',
    details:
      'Your analytical mindset helps you stay current. Consider improving technical documentation practices to share knowledge better.',
  },
  {
    name: 'Achieve Together',
    score: 95,
    description:
      'In all situations, always identify and run towards a common goal.',
    details:
      'Your team player attitude and collaboration skills make you excellent at achieving together. Keep developing project management skills.',
  },
];

export default function Page() {
  return (
    <Stack gap="xl">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>Core Values Assessment</Title>
          <Text size="sm" c="dimmed">
            Evaluate how well you embody our organizational values and identify
            areas for growth.
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="md" withBorder>
            <ValuesRadarChart values={values} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            {values.map((value, index) => (
              <Card key={value.name} withBorder shadow="sm" p="md">
                <Stack gap="xs">
                  <Title order={3}>
                    {String(index + 1).padStart(2, '0')}. {value.name}
                  </Title>
                  <Text size="sm" c="dimmed" mb="xs">
                    {value.description}
                  </Text>
                  <Text fw={700} size="lg" c="blue">
                    Score: {value.score}/100
                  </Text>
                  <Text size="sm">{value.details}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
