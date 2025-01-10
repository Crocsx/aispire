import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { FeedbackInsights } from './_components';

export default async function Page() {
  const messages = await getMessages();
  const historyMessages = pick(messages, ['app:feedback.FeedbackInsights']);

  return (
    <NextIntlClientProvider messages={historyMessages}>
      <FeedbackInsights />
    </NextIntlClientProvider>
  );
}
