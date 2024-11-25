import type { ManualSignUpHandlerInput } from './_actions';
import type { SignUpFormData } from './sign-up-form.validator';

export const toAction = ({
  email,
  password,
}: SignUpFormData): ManualSignUpHandlerInput => ({
  email,
  password,
});
export const toForm = (): SignUpFormData => ({
  email: '',
  password: '',
  confirmation: '',
  terms: false,
});
