import { useState, useTransition } from 'react';

import { ReflectionSchema } from '~aispire/shared/schema';

import { retrieveReflection } from '../_actions';

export const useReflectionLoadDetails = () => {
  const [transition, startTransition] = useTransition();
  const [details, setDetails] = useState<Zod.infer<
    typeof ReflectionSchema
  > | null>(null);

  const loadDetails = async (id?: string | null) => {
    startTransition(async () => {
      if (id && !details) {
        const response = await retrieveReflection(id);
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
