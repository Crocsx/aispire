import { ColorSchemeScript, Stack, Title, Text, Center } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Analytics } from '@vercel/analytics/react';
import { getLocale } from 'next-intl/server';
import 'src/assets/styles/global.css';

import ClientProvider from './client-provider';
import { metadata as _metadata } from './metadata';

export const metadata = _metadata;

function ComingSoonPage() {
  return (
    <Center h="100vh">
      <Stack ta="center" gap="xl">
        <Title>Coming Soon</Title>
        <Text size="lg">
          We&apos;re working hard to bring you something amazing. Stay tuned!
        </Text>
      </Stack>
    </Center>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  const locale = await getLocale();
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        {isProduction ? (
          <ComingSoonPage />
        ) : (
          <>
            <ClientProvider>
              {children}
              <Notifications />
            </ClientProvider>
            {isProduction && <Analytics />}
          </>
        )}
      </body>
    </html>
  );
}
