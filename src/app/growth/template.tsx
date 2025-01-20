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
  LEARNING: 'LEARNING',
  PRACTICE: 'PRACTICE',
  ACHIEVEMENTS: 'ACHIEVEMENTS',
} as const;
type GrowthTabs = (typeof GrowthTabs)[keyof typeof GrowthTabs];

const GrowthTabsMapping = {
  [GrowthTabs.CAREER_PROGRESSION]: PATHS.growth.career(),
  [GrowthTabs.LEARNING]: PATHS.growth.learning(),
  [GrowthTabs.PRACTICE]: PATHS.growth.practice(),
  [GrowthTabs.ACHIEVEMENTS]: PATHS.growth.achievements(),
} as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<GrowthTabs>(GrowthTabs.PRACTICE);
  const [isPending, startTransition] = useTransition();
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
      startTransition(() => {
        router.push(GrowthTabsMapping[value as GrowthTabs]);
      });
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
            leftSection={
              isPending && activeTab === GrowthTabs.CAREER_PROGRESSION ? (
                <Loader size="xs" />
              ) : (
                <IconRocket size={16} />
              )
            }
          >
            {t('tabs', { tab: GrowthTabs.CAREER_PROGRESSION })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={GrowthTabsMapping[GrowthTabs.LEARNING]}
            value={GrowthTabs.LEARNING}
            leftSection={
              isPending && activeTab === GrowthTabs.LEARNING ? (
                <Loader size="xs" />
              ) : (
                <IconBulb size={16} />
              )
            }
          >
            {t('tabs', { tab: GrowthTabs.LEARNING })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={GrowthTabsMapping[GrowthTabs.PRACTICE]}
            value={GrowthTabs.PRACTICE}
            leftSection={
              isPending && activeTab === GrowthTabs.PRACTICE ? (
                <Loader size="xs" />
              ) : (
                <IconTarget size={16} />
              )
            }
          >
            {t('tabs', { tab: GrowthTabs.PRACTICE })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={GrowthTabsMapping[GrowthTabs.ACHIEVEMENTS]}
            value={GrowthTabs.ACHIEVEMENTS}
            leftSection={
              isPending && activeTab === GrowthTabs.ACHIEVEMENTS ? (
                <Loader size="xs" />
              ) : (
                <IconTrophy size={16} />
              )
            }
          >
            {t('tabs', { tab: GrowthTabs.ACHIEVEMENTS })}
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
