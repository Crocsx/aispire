import { SubmitReflectionAction } from './_actions';
import { ReflectionFormData } from './reflection-form.validator';

export const toAction = (form: ReflectionFormData): SubmitReflectionAction => {
  return {
    success: form.success,
    challenge: form.challenge,
    focus: form.focus,
  };
};
export const toForm = () => {
  return {
    success: '',
    challenge: '',
    focus: '',
  };
};
