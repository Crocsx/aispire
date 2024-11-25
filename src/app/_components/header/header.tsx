import { Container, Flex, Group } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';

import { LOCALES } from 'src/config';

import { LanguageSelector, UserControls } from './_components';
import { Logo } from '../logo';

export const Header = () => {
  const t = useTranslations('app:component.Header');
  const locale = useLocale();
  return (
    <Container fluid h="60px" display="flex" w="100%">
      <Flex justify="space-between" align="center" flex="1">
        <Group>
          <Logo title={t('title')} />
        </Group>
        <Group>
          <LanguageSelector
            current={locale}
            locales={LOCALES.map((locale) => {
              return {
                label: t('language', { language: locale.replace('-', '_') }),
                value: locale,
              };
            })}
          />
          <UserControls />
        </Group>
      </Flex>
    </Container>
  );
};
