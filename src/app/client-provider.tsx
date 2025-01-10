'use client';

import { MantineProvider } from '@mantine/core';

import { AuthProvider } from '~aispire/common/auth';

import { themeBlue } from 'src/assets/themes';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider theme={themeBlue}>
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
}
