import {
  Paper,
  Group,
  Avatar,
  Title,
  Text,
  Badge,
  Divider,
  Flex,
  Alert,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';

export const PersonalOverview = async ({
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
  const t = await getTranslations('app:dashboard.PersonalOverview');
  const sharedT = await getTranslations('shared:schema.enum');
  return (
    <Paper shadow="sm" p="md" withBorder mb="xl">
      <Alert
        mb="md"
        color="yellow"
        title="Temporary Data"
        icon={<IconInfoCircle />}
      >
        This is temporary placeholder data. Profile information should come from
        MED.
      </Alert>
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
    </Paper>
  );
};
