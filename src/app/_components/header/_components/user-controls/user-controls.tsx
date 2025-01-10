import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { AuthRestricted } from '~aispire/common/auth';

import { UserMenu } from './_components';
import { Notifications } from '../../../notifications';

export const UserControls = () => {
  const messages = useMessages();
  const selectedMessages = pick(messages, ['app:core.Notifications']);

  return (
    <AuthRestricted>
      <NextIntlClientProvider messages={selectedMessages}>
        <Notifications />
      </NextIntlClientProvider>
      <UserMenu />
    </AuthRestricted>
  );
};
