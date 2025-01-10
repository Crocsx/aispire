'use client';

import { Stack, Title } from '@mantine/core';
import { User } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';

import {
  UpdateUserSettingsAvatarForm,
  UpdateUserSettingsEmailForm,
  UpdateUserSettingsLocaleForm,
  UpdateUserSettingsPasswordForm,
  UpdateUserSettingsTimezoneForm,
} from './_components';

export const UpdateUserSettingsForm = ({ user }: { user: User }) => {
  const t = useTranslations('app:settings.UserSettings');

  return (
    <Stack>
      <Title fw={500} size="sm" mb={-8}>
        {t('form.section.personalInformation')}
      </Title>
      <UpdateUserSettingsAvatarForm
        avatar_url={user.user_metadata.avatar_url}
      />
      <UpdateUserSettingsEmailForm email={user?.email} />
      <UpdateUserSettingsPasswordForm />
      <UpdateUserSettingsLocaleForm locale={user.user_metadata.locale} />
      <UpdateUserSettingsTimezoneForm timezone={user.user_metadata.timezone} />
    </Stack>
  );
};
