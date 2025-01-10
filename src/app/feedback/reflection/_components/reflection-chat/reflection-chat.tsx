'use client';

import { useState } from 'react';

import { Chat } from '~aispire/shared/ui';

import { EmptyMessageTemplate } from './_components';

// Types that can be moved to shared types file
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatFormData {
  message: string;
}

// Reflection-specific chat implementation
export const ReflectionChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: ChatFormData) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: values.message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // TODO: Implement ChatGPT API call here
    // For now, just simulate a response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'This is a placeholder response. ChatGPT integration coming soon!',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Chat>
      <Chat.MessageList
        messages={messages}
        emptyTemplate={<EmptyMessageTemplate />}
      />
      <Chat.InputForm onSubmit={handleSubmit} loading={isLoading} />
    </Chat>
  );
};
