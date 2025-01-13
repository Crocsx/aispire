import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import 'src/assets/styles/global.css';

import { Header, Navbar, Shell } from './_components';
import { SignInOverlay } from './_components/sign-in-overlay';
import ClientProvider from './client-provider';
import { metadata as _metadata } from './metadata';

export const metadata = _metadata;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const selectedMessages = pick(messages, ['app:core.SignInOverlay']);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ClientProvider>
          <NextIntlClientProvider messages={selectedMessages}>
            <SignInOverlay>
              <Shell header={<Header />} navbar={<Navbar />}>
                {children}
              </Shell>
            </SignInOverlay>
          </NextIntlClientProvider>

          <Notifications />
        </ClientProvider>
      </body>
    </html>
  );
}
