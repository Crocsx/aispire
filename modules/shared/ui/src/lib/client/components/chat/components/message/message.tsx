import { Group, Text, Paper } from '@mantine/core';
import { MessageType } from '../../type';

export const Message = ({ message }: { message: MessageType }) => (
  <Group justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
    <Paper
      p="xs"
      bg={message.sender === 'user' ? 'primary.1' : 'primary.4'}
      style={{ maxWidth: '80%' }}
    >
      <Text size="sm">{message.content}</Text>
      <Text size="xs" c="dimmed">
        {message.timestamp.toLocaleTimeString()}
      </Text>
    </Paper>
  </Group>
);
