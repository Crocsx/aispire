import { Paper, Stack, Text, Box, rem, Loader } from '@mantine/core';
import { IconBrain } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const AnimatedSubmission = () => {
  const t = useTranslations('app:feedback.ReflectionForm');
  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Stack align="center" gap="xl">
        <Box
          style={{
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            },
          }}
        >
          <IconBrain size={rem(64)} stroke={1.5} />
        </Box>
        <Loader size="lg" type="dots" />
        <Text size="lg" fw={500}>
          {t('processing.title')}
        </Text>
        <Text c="dimmed" ta="center" size="sm">
          {t('processing.description')}
        </Text>
      </Stack>
    </Paper>
  );
};
