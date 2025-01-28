import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { AddFeedbackForm } from './_components';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export default async function Page() {
  const messages = await getMessages();
  const selectedMessages = pick(messages, [
    'app:feedback.AddFeedbackForm',
    'shared:schema.enum',
    'shared:ui.Chat',
    'shared:form.validation',
  ]);

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <AddFeedbackForm />
    </NextIntlClientProvider>
  );
}
