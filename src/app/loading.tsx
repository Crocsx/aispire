import { Loader, Center, Text, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('app:core.Loading');
  return (
    <Center style={{ height: '100vh' }}>
      <Stack align="center">
        <Loader size="lg" variant="dots" color="primary" />
        <Text size="md">{t('title')}</Text>
      </Stack>
    </Center>
  );
}
