'use client';

import { useTransition } from 'react';

import { MenuItem, rem } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { PATHS } from 'src/config';

import { SignOutHandler } from './_actions';

export const LogoutButton = ({ text }: { text: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const { success, error } = await SignOutHandler();

      if (!success) {
        console.error('Sign out failed:', error);
      }
      // Hard reload to clear the auth state
      window.location.href = PATHS.landing();
    });
  };

  return (
    <MenuItem
      disabled={isPending}
      onClick={handleSignOut}
      leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
    >
      {text}
    </MenuItem>
  );
};
