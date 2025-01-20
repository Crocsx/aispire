import { ReactNode } from 'react';

import { Stack, Text, Title, Center } from '@mantine/core';
import { IconAlertCircle, IconInbox, IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface StateCardProps {
  error?: string;
  isEmpty?: boolean;
  isNotFound?: boolean;
  errorTemplate?: ReactNode;
  emptyTemplate?: ReactNode;
  notFoundTemplate?: ReactNode;
}

export function StateCard({
  error,
  isEmpty,
  isNotFound,
  errorTemplate,
  emptyTemplate,
  notFoundTemplate,
}: StateCardProps) {
  const t = useTranslations('shared:ui.StateCard');
  if (error) {
    if (errorTemplate) return <>{errorTemplate}</>;
    return (
      <Center h={200}>
        <Stack align="center" gap="xs">
          <IconAlertCircle size={40} color="red" />
          <Title order={4}>Error</Title>
          <Text size="sm" c="dimmed">
            {error}
          </Text>
        </Stack>
      </Center>
    );
  }

  if (isEmpty) {
    if (emptyTemplate) return <>{emptyTemplate}</>;
    return (
      <Center h={200}>
        <Stack align="center" gap="xs">
          <IconInbox size={40} color="gray" />
          <Title order={4}>{t('noData')}</Title>
          <Text size="sm" c="dimmed">
            {t('noDataDescription')}
          </Text>
        </Stack>
      </Center>
    );
  }

  if (isNotFound) {
    if (notFoundTemplate) return <>{notFoundTemplate}</>;
    return (
      <Center h={200}>
        <Stack align="center" gap="xs">
          <IconSearch size={40} color="gray" />
          <Title order={4}>{t('notFound')}</Title>
          <Text size="sm" c="dimmed">
            {t('notFoundDescription')}
          </Text>
        </Stack>
      </Center>
    );
  }

  return null;
}
