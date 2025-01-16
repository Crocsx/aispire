'use client';

import { useEffect, useState } from 'react';

import {
  Title,
  Stack,
  Tabs,
  TabsList,
  TabsTab,
  Container,
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
      router.push(FeedbackTabsMapping[value as FeedbackTabs]);
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
            leftSection={<IconBrain size={16} />}
          >
            {t('tabs', { tab: FeedbackTabs.REFLECTION })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={PATHS.feedback.peerFeedback()}
            value={FeedbackTabs.PEER_FEEDBACK}
            leftSection={<IconMessage size={16} />}
          >
            {t('tabs', { tab: FeedbackTabs.PEER_FEEDBACK })}
          </TabsTab>
          <TabsTab
            component={Link}
            // @ts-expect-error This is correct cause the component is a Link
            href={PATHS.feedback.history()}
            value={FeedbackTabs.HISTORY}
            leftSection={<IconHistory size={16} />}
          >
            {t('tabs', { tab: FeedbackTabs.HISTORY })}
          </TabsTab>
        </TabsList>
        <Container size="lg" py="xl">
          {children}
        </Container>
      </Tabs>
    </Stack>
  );
}
