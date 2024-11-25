import { Flex, Button } from '@mantine/core';
import pick from 'lodash/pick';
import Link from 'next/link';
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from 'next-intl';

import { StatusMessage } from '~aspire/shared/ui';

import { PATHS } from 'src/config';

import { EmailValidationErrorGuard } from '../_components';

export default function Page() {
  const messages = useMessages();
  const t = useTranslations('app:auth.ValidateEmail');
  const selectedMessages = pick(messages, [
    'app:auth.ValidateEmail',
    'external:supabase.error',
  ]);

  return (
    <NextIntlClientProvider messages={selectedMessages}>
      <EmailValidationErrorGuard
        defaultMessage={t('error.defaultMessage')}
        title={t('error.title')}
        backToButton={t('linkToHome')}
      >
        <StatusMessage
          status="success"
          description={t('description')}
          title={t('title')}
        >
          <Flex justify="center" mt="md">
            <Button component={Link} href={PATHS.home()} radius="xl">
              {t('linkToHome')}
            </Button>
          </Flex>
        </StatusMessage>
      </EmailValidationErrorGuard>
    </NextIntlClientProvider>
  );
}
