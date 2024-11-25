import { pick } from 'lodash';
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from 'next-intl';

import { EmailValidationErrorGuard } from '../_components';
import { ResetPasswordForm } from './_components';

export default function Page() {
  const messages = useMessages();
  const t = useTranslations('app:auth.ResetPassword');
  const selectedMessages = pick(messages, [
    'app:auth.ResetPassword',
    'external:supabase.error',
    'shared:form.validation.error',
  ]);

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <EmailValidationErrorGuard
        defaultMessage={t('error.defaultMessage')}
        title={t('error.title')}
        backToButton={t('linkToHome')}
      >
        <ResetPasswordForm />
      </EmailValidationErrorGuard>
    </NextIntlClientProvider>
  );
}
