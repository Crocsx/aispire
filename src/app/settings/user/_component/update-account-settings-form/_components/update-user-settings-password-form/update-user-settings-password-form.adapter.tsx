import { UpdateUserPasswordHandlerInput } from './_actions';
import { UpdateUserSettingsPasswordFormData } from './update-user-settings-password-form.validator';

export const toAction = ({
  newPassword,
}: UpdateUserSettingsPasswordFormData): UpdateUserPasswordHandlerInput => ({
  password: newPassword,
});

export const toForm = (): UpdateUserSettingsPasswordFormData => ({
  newPassword: '',
  confirmationPassword: '',
});
