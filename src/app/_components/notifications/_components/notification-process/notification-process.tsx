import { Group, Badge, Text, Stack } from '@mantine/core';

import { Process } from '../../_actions';

interface NotificationProcessProps {
  process: Process;
}

export const NotificationProcess = ({ process }: NotificationProcessProps) => {
  return (
    <Stack key={process.id} p="xs" gap="4" style={{ minWidth: 140 }}>
      <Group justify="space-between" wrap="nowrap">
        <Badge
          variant="light"
          color={
            process.status === 'completed'
              ? 'green'
              : process.status === 'failed'
              ? 'red'
              : 'blue'
          }
        >
          {process.status.toUpperCase()}
        </Badge>
        <Text size="xs" c="dimmed">
          {new Date(process.created_at || '').toLocaleTimeString()}
        </Text>
      </Group>
      {process.error && (
        <Text size="xs" c="red">
          {process.error}
        </Text>
      )}
      <Text size="xs" c="dimmed">
        ID: {process.id.slice(0, 8)}
      </Text>
    </Stack>
  );
};
