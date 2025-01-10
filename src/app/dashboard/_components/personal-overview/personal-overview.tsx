import {
  Paper,
  Group,
  Avatar,
  Title,
  Text,
  Badge,
  SimpleGrid,
  Divider,
  Flex,
} from '@mantine/core';
import { useTranslations } from 'next-intl';

import { MetricsProgressCard } from '~aispire/shared/ui';

export const PersonalOverview = ({
  username,
  department,
  businessUnit,
  level,
}: {
  username: string;
  department: string;
  level: string;
  businessUnit: string;
}) => {
  const t = useTranslations('app:dashboard.PersonalOverview');
  const sharedT = useTranslations('shared:schema.enum');
  return (
    <Paper shadow="sm" p="md" withBorder mb="xl">
      <Group justify="space-between" mb="md">
        <Group>
          <Avatar size="xl" src="https://i.pravatar.cc/150?img=3" radius="xl" />
          <div>
            <Title order={2}>{t('title', { username })}</Title>
            <Flex>
              <Text c="dimmed" display="flex">
                {sharedT('department', { department })}
              </Text>
              <Divider orientation="vertical" mx="xs" />
              <Text c="dimmed" display="flex">
                {sharedT('businessUnit', { businessUnit })}
              </Text>
            </Flex>
          </div>
        </Group>
        <Badge
          size="xl"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
        >
          {t('level', { level })}
        </Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {/* Usage */}
        <MetricsProgressCard
          title="COMPLETED GOALS"
          currentValue={85}
          goalValue={100}
          subtitle="Annual target"
          status={85 >= 80 ? 'success' : 85 >= 50 ? 'progress' : 'failed'}
        />
        <MetricsProgressCard
          title="FEEDBACK RECEIVED"
          currentValue={24}
          goalValue={30}
          subtitle="Last 30 days"
          status={24 >= 30 ? 'success' : 24 >= 15 ? 'progress' : 'failed'}
        />
        <MetricsProgressCard
          title="LEARNING HOURS"
          currentValue={12.5}
          goalValue={20}
          subtitle="This month"
          status={12.5 >= 20 ? 'success' : 12.5 >= 10 ? 'progress' : 'failed'}
        />
        <MetricsProgressCard
          title="TEAM IMPACT SCORE"
          currentValue={8.5}
          goalValue={10}
          subtitle="Based on peer reviews"
          status={8.5 >= 8 ? 'success' : 8.5 >= 6 ? 'progress' : 'failed'}
        />

        {/* Similar stats cards for other metrics */}
        {/* ... */}
      </SimpleGrid>
    </Paper>
  );
};
