import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Card,
  Group,
  ThemeIcon,
  List,
  ListItem,
  Button,
} from '@mantine/core';
import {
  IconBolt,
  IconRefresh,
  IconUsers,
  IconRocket,
  IconLockOpen,
  IconBrain,
} from '@tabler/icons-react';

const companyValues = [
  {
    value: 'BE BOLD',
    icon: <IconBolt size={24} />,
    description: 'Take calculated risks and push boundaries',
    examples: [
      'Propose innovative solutions',
      'Challenge status quo',
      'Take ownership of ambitious projects',
    ],
    reflectionPrompts: [
      'What bold decisions have you made recently?',
      'How have you pushed yourself out of your comfort zone?',
      'What calculated risks could you take to drive more impact?',
    ],
  },
  {
    value: 'STAY UPDATED',
    icon: <IconRefresh size={24} />,
    description: 'Continuously learn and adapt to changes',
    examples: [
      'Follow industry trends',
      'Participate in learning opportunities',
      'Share knowledge with team members',
    ],
    reflectionPrompts: [
      'What new skills or knowledge have you gained recently?',
      'How do you stay current with industry trends?',
      'What learning opportunities could you pursue next?',
    ],
  },
  {
    value: 'BE OPEN',
    icon: <IconLockOpen size={24} />,
    description: 'Foster transparency and honest communication',
    examples: [
      'Give and receive constructive feedback',
      'Share ideas openly',
      'Be receptive to different perspectives',
    ],
    reflectionPrompts: [
      'How have you practiced transparent communication lately?',
      'When was the last time you gave or received meaningful feedback?',
      'What different perspectives have you considered recently?',
    ],
  },
  {
    value: 'ACHIEVE TOGETHER',
    icon: <IconUsers size={24} />,
    description: 'Collaborate and support each other to reach common goals',
    examples: [
      'Support team initiatives',
      'Celebrate team successes',
      'Help others grow',
    ],
    reflectionPrompts: [
      'How have you contributed to team success recently?',
      'What opportunities do you see for better collaboration?',
      'How have you helped others grow and develop?',
    ],
  },
  {
    value: 'MOVE FASTER',
    icon: <IconRocket size={24} />,
    description: 'Act with urgency while maintaining quality',
    examples: [
      'Optimize processes',
      'Make timely decisions',
      'Focus on impactful actions',
    ],
    reflectionPrompts: [
      'What processes have you improved recently?',
      'How do you balance speed with quality?',
      'Where could you act with more urgency?',
    ],
  },
];

export default function Page() {
  return (
    <Container size="lg" py="xl">
      <Paper shadow="xs" p="md" withBorder mb="xl">
        <Title order={2}>Company Values</Title>
        <Text c="dimmed">
          Our core values guide everything we do and help us make better
          decisions
        </Text>
      </Paper>

      <Stack gap="lg">
        {companyValues.map((item) => (
          <Card key={item.value} withBorder shadow="sm">
            <Group mb="md">
              <ThemeIcon size={46} radius="md" variant="light" color="blue">
                {item.icon}
              </ThemeIcon>
              <div>
                <Title order={3}>{item.value}</Title>
                <Text size="sm" c="dimmed">
                  {item.description}
                </Text>
              </div>
            </Group>

            <List
              spacing="xs"
              size="sm"
              icon={
                <ThemeIcon color="blue" size={20} radius="xl">
                  <IconBolt size={12} />
                </ThemeIcon>
              }
            >
              {item.examples.map((example) => (
                <ListItem key={example}>{example}</ListItem>
              ))}
            </List>

            <Button
              variant="light"
              mt="md"
              leftSection={<IconBrain size={16} />}
            >
              Reflect on this value
            </Button>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
