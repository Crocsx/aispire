import { Stack, rem, Text } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const NotificationEmpty = () => {
  const t = useTranslations('app:core.Notifications');
  return (
    <Stack align="center" gap="xs" p="xs" style={{ minWidth: rem(200) }}>
      <IconBell size={24} color="gray" />
      <Text size="sm" c="dimmed">
        {t('empty')}
      </Text>
    </Stack>
  );
};
