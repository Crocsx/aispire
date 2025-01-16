'use client';

import { useEffect, useState } from 'react';

import { Popover, ActionIcon, rem, Stack } from '@mantine/core';
import { IconBell, IconBellFilled } from '@tabler/icons-react';

import { useAuthCtx } from '~aispire/common/auth';

import { Process, subscribeToProcess } from './_actions';
import { NotificationEmpty, NotificationProcess } from './_components';

export const Notifications = () => {
  const [opened, setOpened] = useState(false);
  const [process, setProcess] = useState<Process[]>([]);
  const [lastOpenTime, setLastOpenTime] = useState(Date.now());
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const { self } = useAuthCtx();

  useEffect(() => {
    if (self?.id) {
      const unsubscribe = subscribeToProcess(self.id, (newProcess) => {
        setProcess((current) => {
          const filtered = current.filter((p) => p.id !== newProcess.id);
          const newProcessTime = new Date(
            newProcess.created_at || ''
          ).getTime();
          if (newProcessTime > lastOpenTime) {
            setHasNewNotification(true);
          }
          return [...filtered, newProcess].sort((a, b) => {
            const dateA = new Date(a.created_at || '').getTime();
            const dateB = new Date(b.created_at || '').getTime();
            return dateB - dateA;
          });
        });
      });
      return () => unsubscribe();
    }
  }, [self?.id, lastOpenTime]);

  const handleOpen = () => {
    setOpened(true);
    setLastOpenTime(Date.now());
    setHasNewNotification(false);
  };

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
          color={hasNewNotification ? 'blue' : 'gray'}
          onClick={handleOpen}
          aria-label="Notifications"
        >
          {hasNewNotification ? (
            <IconBellFilled style={{ width: rem(20), height: rem(20) }} />
          ) : (
            <IconBell style={{ width: rem(20), height: rem(20) }} />
          )}
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        {process.length === 0 ? (
          <NotificationEmpty />
        ) : (
          <Stack style={{ maxHeight: '40vh', overflowY: 'auto' }}>
            {process.map((p, i) => (
              <div
                key={p.id}
                style={{
                  borderBottom:
                    i + 1 < process.length
                      ? `1px solid var(--mantine-color-gray-5)`
                      : undefined,
                }}
              >
                <NotificationProcess process={p} />
              </div>
            ))}
          </Stack>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
