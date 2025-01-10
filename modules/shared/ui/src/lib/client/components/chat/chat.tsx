import { Stack } from '@mantine/core';
import { InputForm, Message, MessageList } from './components';

export const Chat = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack h="100%" gap="xs">
      {children}
    </Stack>
  );
};

// Attach subcomponents to Chat
Chat.Message = Message;
Chat.MessageList = MessageList;
Chat.InputForm = InputForm;
