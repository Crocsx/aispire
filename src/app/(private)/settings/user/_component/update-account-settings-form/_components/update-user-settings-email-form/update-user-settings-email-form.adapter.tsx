import { UpdateUserEmailHandlerInput } from './_actions';
import { UpdateUserSettingsEmailFormData } from './update-user-settings-email-form.validator';

export const toAction = ({
  email,
}: UpdateUserSettingsEmailFormData): UpdateUserEmailHandlerInput => ({
  email,
});
export const toForm = ({
  email,
}: {
  email?: string;
}): UpdateUserSettingsEmailFormData => ({
  email: email || '',
});
