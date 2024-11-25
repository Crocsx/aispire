import { DEFAULT_TIMEZONE, Timezone } from 'src/config';

import { UpdateUserTimezoneHandlerInput } from './_actions';
import { UpdateUserSettingsTimezoneFormData } from './update-user-settings-timezone-form.validator';

export const toAction = ({
  timezone,
}: UpdateUserSettingsTimezoneFormData): UpdateUserTimezoneHandlerInput => {
  return {
    timezone,
  };
};

export const toForm = ({
  timezone,
}: {
  timezone?: Timezone;
}): UpdateUserSettingsTimezoneFormData => ({
  timezone: timezone || DEFAULT_TIMEZONE,
});
