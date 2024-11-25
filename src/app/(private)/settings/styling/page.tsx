import pick from 'lodash/pick';
import { redirect } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { createClient } from '~aspire/external/supabase/server';

import { PATHS } from 'src/config';

import { UpdateStylingSettingsForm } from './_components';

export default async function Page() {
  const messages = await getMessages();
  const selectedMessages = pick(messages, [
    'app:settings.StyleSettings',
    'shared:form.validation.error',
  ]);

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect(PATHS.notFound());
  }

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <UpdateStylingSettingsForm />
    </NextIntlClientProvider>
  );
}
