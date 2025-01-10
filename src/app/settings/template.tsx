'use client';

import { useEffect, useState } from 'react';

import { Container, Stack, Tabs, Title } from '@mantine/core';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

const SettingsTabs = {
  USER: 'USER',
  STYLE: 'STYLE',
  GENERAL: 'GENERAL',
} as const;
type SettingsTabs = (typeof SettingsTabs)[keyof typeof SettingsTabs];

const SettingsTabsMapping = {
  [SettingsTabs.USER]: PATHS.settings.user(),
  [SettingsTabs.STYLE]: PATHS.settings.style(),
  [SettingsTabs.GENERAL]: PATHS.settings.general(),
} as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<SettingsTabs>(SettingsTabs.USER);
  const t = useTranslations('app:settings.Shell');

  useEffect(() => {
    const [key] =
      Object.entries(SettingsTabsMapping).find(
        ([_, path]) => pathname === path
      ) || [];

    if (key) {
      setActiveTab(key as SettingsTabs);
    }
  }, [pathname]);

  const handleTabChange = (value: string | null) => {
    if (value) {
      router.push(SettingsTabsMapping[value as SettingsTabs]);
    }
  };

  return (
    <Stack gap="xl">
      <Title order={2}>{t('title')}</Title>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="outline"
        mx="-md"
      >
        <Tabs.List px="md">
          <Tabs.Tab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={PATHS.settings.user()}
            value={SettingsTabs.USER}
          >
            {t('tabs', { tab: SettingsTabs.USER })}
          </Tabs.Tab>
          <Tabs.Tab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={PATHS.settings.general()}
            value={SettingsTabs.GENERAL}
          >
            {t('tabs', { tab: SettingsTabs.GENERAL })}
          </Tabs.Tab>
          <Tabs.Tab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={PATHS.settings.style()}
            value={SettingsTabs.STYLE}
          >
            {t('tabs', { tab: SettingsTabs.STYLE })}
          </Tabs.Tab>
        </Tabs.List>
        <Container size="lg" py="xl">
          {children}
        </Container>
      </Tabs>
    </Stack>
  );
}
