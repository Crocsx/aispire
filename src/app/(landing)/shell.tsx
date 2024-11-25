'use client';

import { AppShell, rem } from '@mantine/core';

export const Shell = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) => {
  return (
    <AppShell header={{ height: rem(60) }} padding="md">
      <AppShell.Header>{header}</AppShell.Header>
      <AppShell.Main h="100vh">{children}</AppShell.Main>
    </AppShell>
  );
};
