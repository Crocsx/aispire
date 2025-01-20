'use client';

import { useEffect, useState } from 'react';
import { useTransition } from 'react';

import {
  Title,
  Stack,
  Tabs,
  TabsList,
  TabsTab,
  Container,
  Transition,
  Loader,
} from '@mantine/core';
import { IconHistory, IconMessage, IconBrain } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

const FeedbackTabs = {
  REFLECTION: 'REFLECTION',
  PEER_FEEDBACK: 'PEER_FEEDBACK',
  HISTORY: 'HISTORY',
} as const;
type FeedbackTabs = (typeof FeedbackTabs)[keyof typeof FeedbackTabs];

const FeedbackTabsMapping = {
  [FeedbackTabs.REFLECTION]: PATHS.feedback.reflection(),
  [FeedbackTabs.PEER_FEEDBACK]: PATHS.feedback.peerFeedback(),
  [FeedbackTabs.HISTORY]: PATHS.feedback.history(),
} as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<FeedbackTabs>(
    FeedbackTabs.REFLECTION
  );
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('app:feedback.Shell');

  useEffect(() => {
    const [key] =
      Object.entries(FeedbackTabsMapping).find(
        ([_, path]) => pathname === path
      ) || [];

    if (key) {
      setActiveTab(key as FeedbackTabs);
    }
  }, [pathname]);

  const handleTabChange = (value: string | null) => {
    if (value) {
      startTransition(() => {
        router.push(FeedbackTabsMapping[value as FeedbackTabs]);
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
            href={PATHS.feedback.reflection()}
            value={FeedbackTabs.REFLECTION}
            leftSection={
              isPending && activeTab === FeedbackTabs.REFLECTION ? (
                <Loader size="xs" />
              ) : (
                <IconBrain size={16} />
              )
            }
          >
            {t('tabs', { tab: FeedbackTabs.REFLECTION })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={PATHS.feedback.peerFeedback()}
            value={FeedbackTabs.PEER_FEEDBACK}
            leftSection={
              isPending && activeTab === FeedbackTabs.PEER_FEEDBACK ? (
                <Loader size="xs" />
              ) : (
                <IconMessage size={16} />
              )
            }
          >
            {t('tabs', { tab: FeedbackTabs.PEER_FEEDBACK })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={PATHS.feedback.history()}
            value={FeedbackTabs.HISTORY}
            leftSection={
              isPending && activeTab === FeedbackTabs.HISTORY ? (
                <Loader size="xs" />
              ) : (
                <IconHistory size={16} />
              )
            }
          >
            {t('tabs', { tab: FeedbackTabs.HISTORY })}
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
