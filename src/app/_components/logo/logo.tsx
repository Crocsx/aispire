'use client';

import { Flex, Group, Text, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

import { PATHS } from 'src/config';

export const Logo = ({ title }: { title?: string }) => {
  const {
    other: { logo },
  } = useMantineTheme();

  return (
    <>
      <Group>
        <Flex justify="center" align="center">
          <Link
            href={PATHS.landing()}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          >
            <Flex align="flex-end">
              {logo({
                width: 32,
                height: 48,
                fill: 'var(--mantine-color-primary-6)',
              })}
              {title && (
                <Text fw="bold" tt="uppercase" mb="sm">
                  {title}
                </Text>
              )}
            </Flex>
          </Link>
        </Flex>
      </Group>
    </>
  );
};
