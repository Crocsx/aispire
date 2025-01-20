import { Stack, Paper, Skeleton } from '@mantine/core';

export default function Loading() {
  return (
    <Stack gap="xl">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Skeleton height={24} width="40%" />
          <Skeleton height={16} width="60%" />
        </Stack>
      </Paper>

      <Paper shadow="sm" p="md" withBorder h={400}>
        <Skeleton height="100%" radius="sm" animate />
      </Paper>
    </Stack>
  );
}
