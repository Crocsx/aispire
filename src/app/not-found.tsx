import { Flex, Button, Center, Paper } from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { StatusMessage } from '~aispire/shared/ui';

import { PATHS } from 'src/config';

export default function NotFound() {
  const t = useTranslations('app:core.NotFound');

  return (
    /* @ts-expect-error direction is usable but the type is not computed properly */
    <Center h="100vh" display="flex" component={Flex} direction="column">
      <Paper radius="md" p="xl" w={'33vw'} maw="400px" withBorder>
        <StatusMessage
          status="error"
          description={t('description')}
          title={t('title')}
        >
          <Flex justify="center" mt="md">
            <Button component={Link} href={PATHS.landing()} radius="xl">
              {t('back')}
            </Button>
          </Flex>
        </StatusMessage>
      </Paper>
    </Center>
  );
}
