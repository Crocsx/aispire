import { CardSection, Skeleton, ThemeIcon } from '@mantine/core';
import { IconExclamationMark } from '@tabler/icons-react';
import React, { ReactNode } from 'react';
import { SkeletonLoader } from '../skeleton-loader';

export interface CardLoaderProps {
  errorNode?: React.ReactNode;
  loading?: boolean;
  error?: boolean;
  loaderId?: string;
  message?: ReactNode;
  children?: React.ReactNode | React.ReactNode[];
  skeletonChildrenCount?: number;
  loaderClassNames?: {
    card?: string;
    cardWrapper?: string;
    error?: string;
    skeletonWrapper?: string;
  };
}

export const PaperLoadWrapper = ({
  error,
  loading,
  loaderClassNames,
  children,
  loaderId,
  errorNode = (
    <div className={loaderClassNames?.error}>
      <div className="flex flex-1 items-center justify-center">
        <ThemeIcon color="red">
          <IconExclamationMark />
        </ThemeIcon>
      </div>
    </div>
  ),
  skeletonChildrenCount = 7,
}: CardLoaderProps) => {
  const node = error ? errorNode : children;

  if (loading) {
    return (
      <article
        data-loader-id={loaderId}
        className={loaderClassNames?.cardWrapper}
      >
        <div
          className={[
            `card rounded-none px-4 py-6 lg:rounded lg:rounded-t-none lg:p-6`,
            loaderClassNames?.card,
          ].join(' ')}
        >
          <CardSection>
            <fieldset>
              <SkeletonLoader
                loading
                className="inline-flex h-[1.25rem] w-40"
              />
              <div
                className={`grid grid-cols-1 gap-x-4 gap-y-1 lg:grid-cols-2 lg:gap-x-6 ${loaderClassNames?.skeletonWrapper}`}
              >
                {Array(skeletonChildrenCount)
                  .fill(null)
                  .map((_, i) => (
                    <div className="flex flex-col gap-2" key={i}>
                      <SkeletonLoader
                        loading
                        className="inline-flex h-4 w-20"
                      />
                      <SkeletonLoader
                        loading
                        className="mb-[1.25rem] inline-flex h-8 w-full"
                      />
                    </div>
                  ))}
              </div>
            </fieldset>
          </CardSection>
        </div>
      </article>
    );
  }
  return node;
};
