'use client';

import { useEffect, useState } from 'react';
import { useTransition } from 'react';

import {
  Container,
  Title,
  Stack,
  Tabs,
  TabsList,
  TabsTab,
  Transition,
  Loader,
} from '@mantine/core';
import {
  IconHeartFilled,
  IconBulb,
  IconChartBar,
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
  const [activeTab, setActiveTab] = useState<InsightTabs>(InsightTabs.OVERVIEW);
  const [isPending, startTransition] = useTransition();
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
      startTransition(() => {
        router.push(InsightTabsMapping[value as InsightTabs]);
      });
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
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={InsightTabsMapping[InsightTabs.OVERVIEW]}
            value={InsightTabs.OVERVIEW}
            leftSection={
              isPending && activeTab === InsightTabs.OVERVIEW ? (
                <Loader size="xs" />
              ) : (
                <IconEyeglass size={16} />
              )
            }
          >
            {t('tabs', { selectedTab: InsightTabs.OVERVIEW })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={InsightTabsMapping[InsightTabs.IMPROVEMENT]}
            value={InsightTabs.IMPROVEMENT}
            leftSection={
              isPending && activeTab === InsightTabs.IMPROVEMENT ? (
                <Loader size="xs" />
              ) : (
                <IconBulb size={16} />
              )
            }
          >
            {t('tabs', { selectedTab: InsightTabs.IMPROVEMENT })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={InsightTabsMapping[InsightTabs.VALUES_ALIGNMENT]}
            value={InsightTabs.VALUES_ALIGNMENT}
            leftSection={
              isPending && activeTab === InsightTabs.VALUES_ALIGNMENT ? (
                <Loader size="xs" />
              ) : (
                <IconHeartFilled size={16} />
              )
            }
          >
            {t('tabs', { selectedTab: InsightTabs.VALUES_ALIGNMENT })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={InsightTabsMapping[InsightTabs.SKILL_ANALYSIS]}
            value={InsightTabs.SKILL_ANALYSIS}
            leftSection={
              isPending && activeTab === InsightTabs.SKILL_ANALYSIS ? (
                <Loader size="xs" />
              ) : (
                <IconChartBar size={16} />
              )
            }
          >
            {t('tabs', { selectedTab: InsightTabs.SKILL_ANALYSIS })}
          </TabsTab>
        </TabsList>
        <Container size="lg" py="xl" pos="relative">
          {isPending && (
            <Transition
              mounted={isPending}
              transition="fade"
              duration={200}
              timingFunction="ease"
            >
              {(styles) => (
                <div
                  style={{
                    ...styles,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  <Loader size="md" />
                </div>
              )}
            </Transition>
          )}
          {children}
        </Container>
      </Tabs>
    </Stack>
  );
}
