import type { ManualSignInHandlerInput } from './_actions';
import type { SignInFormData } from './sign-in-form.validator';

export const toAction = ({
  email,
  password,
}: SignInFormData): ManualSignInHandlerInput => ({
  email,
  password,
});
export const toForm = (): SignInFormData => ({
  email: '',
  password: '',
});
