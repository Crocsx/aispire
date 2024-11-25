import { AppShell, AppShellMain, Center, Flex, Paper } from '@mantine/core';

import { Footer } from '../_components';

export function Shell({ children }: { children: React.ReactNode[] }) {
  return (
    <AppShell>
      <AppShellMain>
        {/* @ts-expect-error direction is usable but the type is not computed properly */}
        <Center h="100vh" display="flex" component={Flex} direction="column">
          <Paper radius="md" p="xl" w={'33vw'} maw="400px" withBorder>
            {children}
          </Paper>
          <Footer />
        </Center>
      </AppShellMain>
    </AppShell>
  );
}
