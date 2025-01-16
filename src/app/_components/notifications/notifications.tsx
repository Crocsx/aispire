'use client';

import { useEffect, useState } from 'react';

import { Popover, ActionIcon, rem } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

import { useAuthCtx } from '~aispire/common/auth';

import { Process, subscribeToProcess } from './_actions';
import { NotificationEmpty } from './_components';

export const Notifications = () => {
  const [opened, setOpened] = useState(false);
  const [process, setProcess] = useState<Process | null>(null);

  const { self } = useAuthCtx();

  useEffect(() => {
    if (self?.id) {
      const unsubscribe = subscribeToProcess(self.id, (process) => {
        console.log('process', process);
        setProcess(process);
      });
      return () => unsubscribe();
    }
  }, [self?.id]);

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

      <Popover.Dropdown>{process && <NotificationEmpty />}</Popover.Dropdown>
    </Popover>
  );
};
