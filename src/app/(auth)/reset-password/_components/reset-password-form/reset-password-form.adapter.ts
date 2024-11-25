import { ResetPasswordHandleInput } from './_actions';
import { ResetPasswordFormData } from './reset-password-form.validator';

export const toAction = ({
  password,
}: ResetPasswordFormData): ResetPasswordHandleInput => ({
  password,
});
export const toForm = (): ResetPasswordFormData => ({
  password: '',
});
