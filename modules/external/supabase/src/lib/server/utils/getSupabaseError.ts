import { getTranslations } from 'next-intl/server';
import { createSupabaseErrorMapper } from '../../shared';

export const getSupabaseErrorMapper = async ({
  defaultMessage,
}: {
  defaultMessage?: string;
}) => {
  const t = await getTranslations('external:supabase.error');
  const mapToSupabaseError = createSupabaseErrorMapper(
    t,
    defaultMessage || t('default')
  );

  return { mapToSupabaseError };
};
