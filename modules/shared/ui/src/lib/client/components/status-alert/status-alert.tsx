import { Alert } from '@mantine/core';
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
} from '@tabler/icons-react';

export const StatusAlert = ({
  description,
  title,
  status,
}: {
  title: string;
  description: string;
  status: 'success' | 'error';
}) => {
  const isSuccess = status === 'success';

  return (
    <Alert
      variant="light"
      color="red"
      title={title}
      icon={
        isSuccess ? (
          <IconCircleCheckFilled fill={'var(--mantine-color-primary-6)'} />
        ) : (
          <IconAlertTriangleFilled fill={'var(--mantine-color-red-6)'} />
        )
      }
    >
      {description}
    </Alert>
  );
};
