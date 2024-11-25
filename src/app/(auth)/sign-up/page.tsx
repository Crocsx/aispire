import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { SignUpForm } from './_components';

export default function Page() {
  const messages = useMessages();
  const selectedMessages = pick(messages, [
    'app:auth.SignUp',
    'external:supabase.error',
    'shared:form.validation.error',
  ]);

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <SignUpForm />
    </NextIntlClientProvider>
  );
}
