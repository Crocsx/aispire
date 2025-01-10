import { useState, useTransition } from 'react';

import { FeedbackSchema } from '~aispire/shared/schema';

import { retrieveFeedback } from '../_actions';

export const useFeedbackLoadDetails = () => {
  const [transition, startTransition] = useTransition();
  const [details, setDetails] = useState<Zod.infer<
    typeof FeedbackSchema
  > | null>(null);

  const loadDetails = async (id?: string | null) => {
    startTransition(async () => {
      if (id && !details) {
        const response = await retrieveFeedback(id);
        if (response.success && response.data) {
          setDetails(response.data);
        }
      }
    });
  };

  return {
    loading: transition,
    details,
    loadDetails,
  };
};
