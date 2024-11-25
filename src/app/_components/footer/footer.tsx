import { Container, Group, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('app:component.Footer');
  return (
    <Container fluid className="flex justify-center">
      <Group justify="center" ml="auto" py="sm">
        <Text size={'sm'}>
          {t('copyright', { date: new Date().getFullYear() })}
        </Text>
      </Group>
    </Container>
  );
};
