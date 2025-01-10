import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = useMessages();
  const selectedMessages = pick(messages, ['app:feedback.Shell']);
  return (
    <NextIntlClientProvider messages={selectedMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
