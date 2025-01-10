import { Skeleton, SkeletonProps } from '@mantine/core';
import { ReactNode } from 'react';

export type SkeletonLoaderProps = {
  loading?: boolean;
  children?: ReactNode;
} & SkeletonProps;

export const SkeletonLoader = ({
  loading,
  children,
  variant = 'default',
  height = 14,
  ...rest
}: SkeletonLoaderProps) => {
  if (loading) {
    return (
      <Skeleton visible={loading} variant={variant} height={height} {...rest} />
    );
  }
  return children;
};
