'use client';

import { AppShell, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const Shell = ({
  children,
  header,
  navbar,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  navbar: React.ReactNode;
}) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Flex align="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {header}
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">{navbar}</AppShell.Navbar>
      <AppShell.Main h="100vh">{children}</AppShell.Main>
    </AppShell>
  );
};
