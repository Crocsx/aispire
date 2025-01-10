import pick from 'lodash/pick';
import { redirect } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { createClient } from '~aispire/external/supabase/server';

import { PATHS } from 'src/config';

import { UpdateUserSettingsForm } from './_component';

export default async function Page() {
  const messages = await getMessages();
  const selectedMessages = pick(messages, [
    'app:settings.UserSettings',
    'external:supabase.error',
    'shared:form.validation.error',
    'shared:ui.ToggleableForm.button',
  ]);

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect(PATHS.notFound());
  }

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <UpdateUserSettingsForm user={data.user} />
    </NextIntlClientProvider>
  );
}
