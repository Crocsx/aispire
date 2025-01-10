import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { ReflectionForm } from './_components';

export default async function Page() {
  const messages = await getMessages();
  const historyMessages = pick(messages, [
    'app:feedback.ReflectionForm',
    'shared:ui.Chat',
    'shared:form.validation',
  ]);

  return (
    <NextIntlClientProvider messages={historyMessages}>
      <ReflectionForm />
    </NextIntlClientProvider>
  );
}
