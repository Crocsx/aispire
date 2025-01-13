import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { InsightSkills } from './_components';

export default async function Page() {
  const messages = await getMessages();
  const selectedMessages = pick(messages, [
    'app:insight.InsightSkills',
    'shared:schema.enum',
  ]);

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <InsightSkills />
    </NextIntlClientProvider>
  );
}
