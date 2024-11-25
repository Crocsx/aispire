import { useTranslations } from 'next-intl';

type TranslateFunction = ReturnType<typeof useTranslations>;

export function createSupabaseErrorMapper(
  t: TranslateFunction,
  defaultMessage: string
) {
  return (code?: string) => {
    const message = t.has(code) ? t(code) : defaultMessage;
    return message;
  };
}
