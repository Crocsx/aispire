'use client';

import { Flex, Button } from '@mantine/core';
import Link from 'next/link';

import { useSupabaseErrorMapper } from '~aspire/external/supabase';
import { StatusMessage } from '~aspire/shared/ui';

import { PATHS } from 'src/config';

import { useVerifyEmailErrorCheck } from './_hooks';

export function EmailValidationErrorGuard({
  title,
  defaultMessage,
  backToButton,
  children,
}: {
  title: string;
  backToButton: string;
  defaultMessage: string;
  children: React.ReactElement;
}) {
  const { error } = useVerifyEmailErrorCheck();
  const { mapToSupabaseError } = useSupabaseErrorMapper({
    defaultMessage,
  });

  if (error) {
    return (
      <StatusMessage
        status="error"
        description={mapToSupabaseError(error)}
        title={title}
      >
        <Flex justify="center" mt="md">
          <Button component={Link} href={PATHS.home()} radius="xl">
            {backToButton}
          </Button>
        </Flex>
      </StatusMessage>
    );
  }

  return children;
}
