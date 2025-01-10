import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { FeedbackActivityTimeline } from './_components';

export default async function Page() {
  const messages = await getMessages();
  const historyMessages = pick(messages, [
    'app:feedback.FeedbackActivityTimeline',
  ]);

  return (
    <NextIntlClientProvider messages={historyMessages}>
      <FeedbackActivityTimeline />
    </NextIntlClientProvider>
  );
}
