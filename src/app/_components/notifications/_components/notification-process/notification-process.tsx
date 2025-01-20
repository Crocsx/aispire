import { Group, Badge, Text, Stack, Flex, Box } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

import { Process } from '../../_actions';

interface NotificationProcessProps {
  process: Process;
}

export const NotificationProcess = ({ process }: NotificationProcessProps) => {
  const t = useTranslations('app:core.Notifications.process');
  const status = process.status.toUpperCase();

  const statusColor =
    process.status === 'completed'
      ? 'green'
      : process.status === 'failed'
      ? 'red'
      : 'blue';

  return (
    <Box style={{ minWidth: 200 }}>
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap" align="center">
          <Badge variant="dot" color={statusColor} size="sm">
            {t('title', { status })}
          </Badge>
          <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
            {new Date(process.created_at || '').toLocaleTimeString()}
          </Text>
        </Group>

        <Text
          size="sm"
          c={status === 'FAILED' ? 'red' : 'dimmed'}
          lineClamp={2}
        >
          {t('content', { status })}
        </Text>

        <Flex justify="space-between" align="center">
          <Text size="xs" c="dimmed" fw={500}>
            #{process.id.slice(0, 8)}
          </Text>
          {process.status === 'completed' && (
            <Text
              component="a"
              href={PATHS.insights.overview()}
              size="xs"
              fw={500}
              style={{ textDecoration: 'none' }}
            >
              {t('viewDetails')}
            </Text>
          )}
        </Flex>
      </Stack>
    </Box>
  );
};
