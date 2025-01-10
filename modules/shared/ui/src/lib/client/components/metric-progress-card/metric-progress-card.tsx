import { Paper, Group, Text, ThemeIcon, Progress } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';

interface MetricsProgressCardProps {
  title: string;
  currentValue: number;
  goalValue: number;
  subtitle: string;
  status: 'success' | 'progress' | 'failed';
}

export function MetricsProgressCard({
  title,
  currentValue,
  goalValue,
  subtitle,
  status,
}: MetricsProgressCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'green';
      case 'progress':
        return 'blue';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" fw={700}>
          {title}
        </Text>
        <ThemeIcon color={getStatusColor(status)} variant="light">
          <IconArrowUpRight size={16} />
        </ThemeIcon>
      </Group>
      <Group align="flex-end" gap="xs" mt={25}>
        <Text fz="24" fw={700}>
          {currentValue}
        </Text>
        <Text fz="sm" c="dimmed" mb={6}>
          / {goalValue}
        </Text>
      </Group>
      <Text size="xs" c="dimmed" mb="sm">
        {subtitle}
      </Text>
      <Progress
        value={(currentValue / goalValue) * 100}
        color={getStatusColor(status)}
        mt="md"
      />
    </Paper>
  );
}
