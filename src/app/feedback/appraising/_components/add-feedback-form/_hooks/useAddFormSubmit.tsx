import { useCallback, useState, useTransition } from 'react';

import { z } from 'zod';

import { FeedbackSchema } from '~aispire/shared/schema';

import { submitFeedback } from '../_actions';
import { toAction } from '../add-feedback-form.adaptor';
import { AddFeedbackFormData } from '../add-feedback-form.validator';

export const useAddFormSubmit = () => {
  const [error, setError] = useState<string | undefined>();
  const [feedback, setFeedback] = useState<z.infer<typeof FeedbackSchema>>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(async (formData: AddFeedbackFormData) => {
    startTransition(async () => {
      const { data, success, error } = await submitFeedback(toAction(formData));

      if (!success) {
        return setError(error);
      }

      return setFeedback(FeedbackSchema.parse(data));
    });
  }, []);

  return { isSubmitting, error, feedback, submit };
};
