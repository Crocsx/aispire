import { Stack, Text } from '@mantine/core';
import { IconMessageCircle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const EmptyMessageTemplate = () => {
  const t = useTranslations('app:reflection.Reflection.emptyMessageTemplate');
  return (
    <Stack align="center" justify="center" h="100%" py="xl">
      <Text size="lg" fw={500} c="dimmed" ta="center">
        {t('title')}
      </Text>
      <Text c="dimmed" ta="center" maw={400}>
        {t('description')}
      </Text>

      <IconMessageCircle size={48} style={{ opacity: 0.5 }} />
      <Text c="dimmed" ta="center" fs="italic">
        {t('starter')}
      </Text>
    </Stack>
  );
};
