import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { createSupabaseErrorMapper } from '../../shared';

export const useSupabaseErrorMapper = ({
  defaultMessage,
}: {
  defaultMessage?: string;
}) => {
  const t = useTranslations('external:supabase.error');
  const mapToSupabaseError = useCallback(
    (code?: string) =>
      createSupabaseErrorMapper(t, defaultMessage || t('default'))(code),
    [t, defaultMessage]
  );

  return { mapToSupabaseError };
};
