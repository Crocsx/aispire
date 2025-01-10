'use client';
import { AuthRestricted } from '~aispire/common/auth';
import { LanguagePicker } from '~aispire/shared/ui';

import { setUserLocale } from 'src/services';

export const LanguageSelector = ({
  current,
  locales,
}: {
  current: string;
  locales: { label: string; value: string }[];
}) => {
  async function setLocale(local: string) {
    await setUserLocale(local);
  }

  return (
    <AuthRestricted
      fallback={
        <LanguagePicker
          languages={locales}
          current={current}
          onLanguageChange={setLocale}
        />
      }
    >
      {null}
    </AuthRestricted>
  );
};
