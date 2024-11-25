import { useEffect, useState } from 'react';

import { parseHashToObject } from '~aspire/shared/utils';

export const useVerifyEmailErrorCheck = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const { error } = parseHashToObject(hash);
    setError(error || null);
  }, []);

  return { error };
};
