import { ChatInputFormData } from './input-form.validator';

export const toAction = (form: ChatInputFormData) => {
  return {
    reflection: form.message,
  };
};
export const toForm = (): ChatInputFormData => {
  return {
    message: '',
  };
};
