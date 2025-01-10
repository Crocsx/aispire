import { ReactNode } from 'react';

import { Overlay, Text, Center, Flex, Paper, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { AuthRestricted } from '~aispire/common/auth';

import { GoogleSignIn } from './_components';

export const SignInOverlay = ({ children }: { children: ReactNode }) => {
  const t = useTranslations('app:core.SignInOverlay');
  return (
    <AuthRestricted
      fallback={
        <Overlay>
          <Center
            h="100vh"
            display="flex"
            component={Flex}
            // @ts-expect-error this works cause component is Flex
            direction="column"
          >
            <Paper radius="md" p="xl" w={'33vw'} maw="400px" withBorder>
              <Title fz="md" mb="sm">
                {t('title')}
              </Title>
              <Text mb="sm">{t('description')}</Text>
              <Center>
                <GoogleSignIn />
              </Center>
            </Paper>
          </Center>
        </Overlay>
      }
    >
      {children}
    </AuthRestricted>
  );
};
