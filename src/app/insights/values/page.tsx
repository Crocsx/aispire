import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { InsightValues } from './_components';

export default async function Page() {
  const messages = await getMessages();
  const selectedMessages = pick(messages, [
    'app:insight.InsightValues',
    'shared:schema.enum',
  ]);

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <InsightValues />
    </NextIntlClientProvider>
  );
}
