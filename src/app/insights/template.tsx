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
  IconHeartFilled,
  IconBulb,
  IconChartBar,
  IconUsers,
  IconGlass,
  IconEyeglass,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

const InsightTabs = {
  OVERVIEW: 'OVERVIEW',
  VALUES_ALIGNMENT: 'VALUES_ALIGNMENT',
  IMPROVEMENT: 'IMPROVEMENT',
  SKILL_ANALYSIS: 'SKILL_ANALYSIS',
} as const;
type InsightTabs = (typeof InsightTabs)[keyof typeof InsightTabs];

const InsightTabsMapping = {
  [InsightTabs.OVERVIEW]: PATHS.insights.overview(),
  [InsightTabs.VALUES_ALIGNMENT]: PATHS.insights.values(),
  [InsightTabs.IMPROVEMENT]: PATHS.insights.improvement(),
  [InsightTabs.SKILL_ANALYSIS]: PATHS.insights.skillAnalysis(),
} as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<InsightTabs>(
    InsightTabs.VALUES_ALIGNMENT
  );
  const t = useTranslations('app:insight.Shell');

  useEffect(() => {
    const [key] =
      Object.entries(InsightTabsMapping).find(
        ([_, path]) => pathname === path
      ) || [];

    if (key) {
      setActiveTab(key as InsightTabs);
    }
  }, [pathname]);

  const handleTabChange = (value: string | null) => {
    if (value) {
      router.push(InsightTabsMapping[value as InsightTabs]);
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
        <TabsList px="md">
          {' '}
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={InsightTabsMapping[InsightTabs.OVERVIEW]}
            value={InsightTabs.OVERVIEW}
            leftSection={<IconEyeglass size={16} />}
          >
            {t('tabs', { selectedTab: InsightTabs.OVERVIEW })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={InsightTabsMapping[InsightTabs.IMPROVEMENT]}
            value={InsightTabs.IMPROVEMENT}
            leftSection={<IconBulb size={16} />}
          >
            {t('tabs', { selectedTab: InsightTabs.IMPROVEMENT })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={InsightTabsMapping[InsightTabs.VALUES_ALIGNMENT]}
            value={InsightTabs.VALUES_ALIGNMENT}
            leftSection={<IconHeartFilled size={16} />}
          >
            {t('tabs', { selectedTab: InsightTabs.VALUES_ALIGNMENT })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={InsightTabsMapping[InsightTabs.SKILL_ANALYSIS]}
            value={InsightTabs.SKILL_ANALYSIS}
            leftSection={<IconChartBar size={16} />}
          >
            {t('tabs', { selectedTab: InsightTabs.SKILL_ANALYSIS })}
          </TabsTab>
        </TabsList>
        <Container size="lg" py="xl">
          {children}
        </Container>
      </Tabs>
    </Stack>
  );
}
