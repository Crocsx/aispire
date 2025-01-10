import { FeedbackType } from '~aispire/shared/schema';

import { SubmitFeedbackAction } from './_actions';
import { AddFeedbackFormData } from './add-feedback-form.validator';

export const toAction = (form: AddFeedbackFormData): SubmitFeedbackAction => {
  return {
    content: form.content,
    type: form?.type,
    to_user_id: form.to_user_id,
  };
};

export const toForm = (): AddFeedbackFormData => {
  return {
    content: '',
    type: FeedbackType.Enum.MANAGER_REVIEW,
    to_user_id: '',
  };
};
