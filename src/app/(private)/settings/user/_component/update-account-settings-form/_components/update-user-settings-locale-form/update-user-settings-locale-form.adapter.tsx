import { DEFAULT_LOCALE, Locale } from 'src/config';

import { UpdateUserLocaleHandlerInput } from './_actions';
import { UpdateUserSettingsLocaleFormData } from './update-user-settings-locale-form.validator';

export const toAction = ({
  locale,
}: UpdateUserSettingsLocaleFormData): UpdateUserLocaleHandlerInput => {
  return {
    locale,
  };
};

export const toForm = ({
  locale,
}: {
  locale?: Locale;
}): UpdateUserSettingsLocaleFormData => ({
  locale: locale || DEFAULT_LOCALE,
});
