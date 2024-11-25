import { UpdateUserAvatarHandlerInput } from './_actions';
import { UpdateUserSettingsAvatarFormData } from './update-user-settings-avatar-form.validator';

export const toAction = ({
  avatar,
}: UpdateUserSettingsAvatarFormData): UpdateUserAvatarHandlerInput => {
  return {
    avatar,
  };
};

export const toForm = (): UpdateUserSettingsAvatarFormData => ({
  avatar: null,
});
