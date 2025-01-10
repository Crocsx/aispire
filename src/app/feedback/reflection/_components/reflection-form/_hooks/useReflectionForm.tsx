import { useCallback, useState, useTransition } from 'react';

import { z } from 'zod';

import { ReflectionSchema } from '~aispire/shared/schema';

import { submitReflection } from '../_actions';
import { toAction } from '../reflection-form.adapter';
import { ReflectionFormData } from '../reflection-form.validator';

export const useReflectionFormSubmit = () => {
  const [error, setError] = useState<string | undefined>();
  const [reflection, setReflection] =
    useState<z.infer<typeof ReflectionSchema>>();
  const [isSubmitting, startTransition] = useTransition();

  const submit = useCallback(async (formData: ReflectionFormData) => {
    startTransition(async () => {
      const { data, success, error } = await submitReflection(
        toAction(formData)
      );

      if (!success) {
        return setError(error);
      }

      return setReflection(ReflectionSchema.parse(data));
    });
  }, []);

  return { isSubmitting, error, reflection, submit };
};
