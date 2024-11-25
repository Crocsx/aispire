'use client';

import { Button } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { useSupabaseErrorMapper } from '~aspire/external/supabase';
import { StatusAlert } from '~aspire/shared/ui';

import { useGoogleSignInSubmit } from './_hooks';

export const GoogleSignIn = () => {
  const t = useTranslations('app:auth.SignIn');
  const { submit, error, isSubmitting } = useGoogleSignInSubmit();
  const { mapToSupabaseError } = useSupabaseErrorMapper({
    defaultMessage: t('form.error.defaultMessage'),
  });

  return (
    <>
      {error && (
        <StatusAlert
          status="error"
          title={t('form.error.title')}
          description={mapToSupabaseError(error)}
        />
      )}
      <Button
        leftSection={<IconBrandGoogle />}
        onClick={submit}
        radius="xl"
        loading={isSubmitting}
      >
        Google
      </Button>
    </>
  );
};
