import { getRequestConfig } from 'next-intl/server';

import { TimezoneUtils } from '~aispire/shared/utils';

import { DEFAULT_LOCALE, Locale, LOCALES } from '../config';
import { getUserLocale } from '../services';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const sanitizedLocale = LOCALES.includes(locale as Locale)
    ? locale
    : DEFAULT_LOCALE;

  return {
    locale: sanitizedLocale,
    messages: {
      ...(await import(`../../messages/${locale}/app_component.json`)).default,
      ...(await import(`../../messages/${locale}/app_core.json`)).default,
      ...(await import(`../../messages/${locale}/app_dashboard.json`)).default,
      ...(await import(`../../messages/${locale}/app_feedback.json`)).default,
      ...(await import(`../../messages/${locale}/app_growth.json`)).default,
      ...(await import(`../../messages/${locale}/app_insight.json`)).default,
      ...(await import(`../../messages/${locale}/app_settings.json`)).default,
      ...(await import(`../../messages/${locale}/external_supabase.json`))
        .default,
      ...(await import(`../../messages/${locale}/shared_form.json`)).default,
      ...(await import(`../../messages/${locale}/shared_schema.json`)).default,
      ...(await import(`../../messages/${locale}/shared_ui.json`)).default,
    },
    timeZone: TimezoneUtils.getRecommendedTimezone(),
  };
});
