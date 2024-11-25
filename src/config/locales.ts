import { Timezone as nextIntlTimezone } from 'next-intl';

export type Locale = (typeof LOCALES)[number];
export type Timezone = nextIntlTimezone;

export const LOCALES = ['en-US', 'it-IT'] as const;
export const DEFAULT_LOCALE: Locale = 'en-US';

export const TIMEZONES: Timezone[] = Intl.supportedValuesOf('timeZone');
export const DEFAULT_TIMEZONE: Timezone = 'Asia/Tokyo';
