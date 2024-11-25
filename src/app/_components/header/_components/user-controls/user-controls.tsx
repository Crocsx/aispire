import { Button } from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { AuthRestricted } from '~aspire/common/auth';

import { PATHS } from 'src/config';

import { UserMenu, Notifications } from './_components';

export const UserControls = () => {
  const t = useTranslations('app:component.Header');
  return (
    <AuthRestricted
      fallback={
        <Button component={Link} href={PATHS.auth.signIn()}>
          {t('navigation.login')}
        </Button>
      }
    >
      <Notifications />
      <UserMenu />
    </AuthRestricted>
  );
};
