'use client';

import { useEffect, useState } from 'react';

import {
  Container,
  Title,
  Stack,
  Tabs,
  TabsList,
  TabsTab,
} from '@mantine/core';
import {
  IconTarget,
  IconBulb,
  IconTrophy,
  IconRocket,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

const GrowthTabs = {
  CAREER_PROGRESSION: 'CAREER_PROGRESSION',
  ACHIEVEMENTS: 'ACHIEVEMENTS',
  LEARNING: 'LEARNING',
  PRACTICE: 'PRACTICE',
} as const;
type GrowthTabs = (typeof GrowthTabs)[keyof typeof GrowthTabs];

const GrowthTabsMapping = {
  [GrowthTabs.CAREER_PROGRESSION]: PATHS.growth.career(),
  [GrowthTabs.ACHIEVEMENTS]: PATHS.growth.achievements(),
  [GrowthTabs.LEARNING]: PATHS.growth.learning(),
  [GrowthTabs.PRACTICE]: PATHS.growth.practice(),
} as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<GrowthTabs>(GrowthTabs.PRACTICE);
  const t = useTranslations('app:growth.Shell');

  useEffect(() => {
    const [key] =
      Object.entries(GrowthTabsMapping).find(
        ([_, path]) => pathname === path
      ) || [];

    if (key) {
      setActiveTab(key as GrowthTabs);
    }
  }, [pathname]);

  const handleTabChange = (value: string | null) => {
    if (value) {
      router.push(GrowthTabsMapping[value as GrowthTabs]);
    }
  };

  return (
    <Stack gap="xl">
      {/* Header Section */}
      <Title order={2}>{t('title')}</Title>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="outline"
        mx="-md"
      >
        <TabsList px="md">
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={GrowthTabsMapping[GrowthTabs.CAREER_PROGRESSION]}
            value={GrowthTabs.CAREER_PROGRESSION}
            leftSection={<IconRocket size={16} />}
          >
            {t('tabs', { tab: GrowthTabs.CAREER_PROGRESSION })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={GrowthTabsMapping[GrowthTabs.ACHIEVEMENTS]}
            value={GrowthTabs.ACHIEVEMENTS}
            leftSection={<IconTrophy size={16} />}
          >
            {t('tabs', { tab: GrowthTabs.ACHIEVEMENTS })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={GrowthTabsMapping[GrowthTabs.LEARNING]}
            value={GrowthTabs.LEARNING}
            leftSection={<IconBulb size={16} />}
          >
            {t('tabs', { tab: GrowthTabs.LEARNING })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={GrowthTabsMapping[GrowthTabs.PRACTICE]}
            value={GrowthTabs.PRACTICE}
            leftSection={<IconTarget size={16} />}
          >
            {t('tabs', { tab: GrowthTabs.PRACTICE })}
          </TabsTab>
        </TabsList>
        <Container size="lg" py="xl">
          {children}
        </Container>
      </Tabs>
    </Stack>
  );
}
