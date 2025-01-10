import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Links } from './_components';

export function Navbar() {
  const messages = useMessages();
  const selectedMessages = pick(messages, ['app:core.Navbar']);

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <Links />
    </NextIntlClientProvider>
  );
}
