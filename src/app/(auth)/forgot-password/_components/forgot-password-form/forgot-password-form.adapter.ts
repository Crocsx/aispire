import { ForgotPasswordHandleInput } from './_actions';
import { ForgotPasswordFormData } from './forgot-password-form.validator';

export const toAction = ({
  email,
}: ForgotPasswordFormData): ForgotPasswordHandleInput => ({
  email,
});

export const toForm = (): ForgotPasswordFormData => ({ email: '' });
