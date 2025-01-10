import { useTranslations } from 'next-intl';
import { Flex, Text } from '@mantine/core';
import React from 'react';

export const MessageListEmpty = () => {
  const t = useTranslations('shared:ui.Chat.MessageListEmpty');

  return (
    <Flex justify="center">
      <Text>{t('noMessages')}</Text>
    </Flex>
  );
};
