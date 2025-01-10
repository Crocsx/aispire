import fs from 'fs';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';

import { TimezoneUtils } from '~aispire/shared/utils';

import { DEFAULT_LOCALE, Locale, LOCALES } from '../config';
import { getUserLocale } from '../services';

const messageLoader = async (locale: string) => {
  const messagesDir = path.join(process.cwd(), 'messages', locale);

  try {
    // Read all files in the directory
    const files = fs.readdirSync(messagesDir);

    const messages = {};
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          // Dynamically import each JSON file
          const messageModule = await import(
            `../../messages/${locale}/${file}`
          );
          Object.assign(messages, messageModule.default);
        } catch (error) {
          console.error(`Failed to import message file ${file}`, error);
        }
      }
    }

    return messages;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return {}; // Return an empty object in case of an error
  }
};

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const sanitizedLocale = LOCALES.includes(locale as Locale)
    ? locale
    : DEFAULT_LOCALE;

  return {
    locale: sanitizedLocale,
    messages: await messageLoader(locale),
    timeZone: TimezoneUtils.getRecommendedTimezone(),
  };
});
