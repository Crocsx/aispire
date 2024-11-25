'use client';

import { Group, Avatar, rem, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import { useAuthCtx } from '~aspire/common/auth';

export const UserInformation = () => {
  const { self } = useAuthCtx();
  return (
    <Group gap={7}>
      <Avatar
        src={self?.user_metadata?.avatar_url}
        alt={self?.email || ''}
        radius="xl"
        size={rem(24)}
      />
      <Text fw={500} size="sm" lh={1} mr={3} hiddenFrom="sm" visibleFrom="md">
        {self?.email}
      </Text>
      <IconChevronDown
        style={{ width: rem(12), height: rem(12) }}
        stroke={1.5}
      />
    </Group>
  );
};
