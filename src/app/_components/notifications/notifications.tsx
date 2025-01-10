'use client';

import { useState } from 'react';

import { Popover, ActionIcon, rem } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

import { NotificationEmpty } from './_components';

export const Notifications = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      position="bottom-end"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => setOpened((o) => !o)}
          aria-label="Notifications"
        >
          <IconBell style={{ width: rem(20), height: rem(20) }} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <NotificationEmpty />
      </Popover.Dropdown>
    </Popover>
  );
};
