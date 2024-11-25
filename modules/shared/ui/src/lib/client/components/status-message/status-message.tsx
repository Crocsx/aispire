import { Flex, Text } from '@mantine/core';
import {
  IconCircleCheckFilled,
  IconAlertTriangleFilled,
} from '@tabler/icons-react';
import { ReactNode } from 'react';

interface StatusMessageProps {
  title?: string;
  description?: string;
  status: 'success' | 'error';
  children?: ReactNode;
}

export const StatusMessage = ({
  title,
  description,
  status,
  children,
}: StatusMessageProps) => {
  const isSuccess = status === 'success';

  return (
    <>
      <Flex p="md" justify="center">
        {isSuccess ? (
          <IconCircleCheckFilled
            size={48}
            fill={'var(--mantine-color-primary-6)'}
          />
        ) : (
          <IconAlertTriangleFilled
            size={48}
            fill={'var(--mantine-color-red-6)'}
          />
        )}
      </Flex>
      <Text size="lg" ta="center" fw={500}>
        {title}
      </Text>
      <Text size="sm" ta="center" fw={500} mt="md">
        {description}
      </Text>
      <Flex justify="center" mt="md">
        {children}
      </Flex>
    </>
  );
};
