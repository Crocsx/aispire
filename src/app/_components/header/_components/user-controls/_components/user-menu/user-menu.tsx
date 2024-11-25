import {
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  rem,
  UnstyledButton,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

import { LogoutButton, UserInformation } from './_components';

export const UserMenu = () => {
  const t = useTranslations('app:component.Header');
  return (
    <Menu shadow="md" width={rem(200)}>
      <MenuTarget>
        <UnstyledButton>
          <UserInformation />
        </UnstyledButton>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem
          component={Link}
          href={PATHS.settings.user()}
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          {t('userMenu.settings')}
        </MenuItem>
        <LogoutButton text={t('userMenu.logout')} />
      </MenuDropdown>
    </Menu>
  );
};
