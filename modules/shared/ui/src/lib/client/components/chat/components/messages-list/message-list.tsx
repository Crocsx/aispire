'use client';

import { ScrollArea, Stack } from '@mantine/core';
import { MessageType } from '../../type';
import { Message } from '../message';
import { MessageListEmpty } from '../message-list-empty';
import { useEffect, useRef } from 'react';

export const MessageList = ({
  messages,
  emptyTemplate = <MessageListEmpty />,
}: {
  messages: MessageType[];
  emptyTemplate?: React.ReactNode;
}) => {
  const viewport = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(true);

  // Check if user is near bottom when scrolling
  const handleScroll = () => {
    if (!viewport.current) return;

    const { scrollTop, scrollHeight, clientHeight } = viewport.current;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;
    shouldScrollRef.current = isNearBottom;
  };

  // Scroll to bottom if we were already at bottom
  useEffect(() => {
    if (shouldScrollRef.current && viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <ScrollArea
      h="90%"
      viewportRef={viewport}
      onScrollPositionChange={handleScroll}
    >
      <Stack gap="xs" h="100%">
        {messages.length === 0 && emptyTemplate}
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Stack>
    </ScrollArea>
  );
};
