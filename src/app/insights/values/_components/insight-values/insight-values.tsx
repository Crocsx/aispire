import { Stack, Text, Title, Grid, Paper, Card, GridCol } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { StateCard } from 'src/app/_components';

import { getValues } from './_actions';
import { ValuesRadarChart } from '../values-radar-chart';

export async function InsightValues() {
  const t = await getTranslations('app:insight.InsightValues');
  const result = await getValues();

  const values = result.data;
  if (!result.success || !values) {
    return (
      <Stack gap="xl">
        <Paper shadow="sm" p="md" withBorder>
          <Stack gap="xs">
            <Title order={4}>{t('title')}</Title>
            <Text size="sm" c="dimmed">
              {t('subtitle')}
            </Text>
          </Stack>
        </Paper>
        <Paper shadow="sm" p="md" withBorder>
          <StateCard isEmpty={!values} error={result.error} />
        </Paper>
      </Stack>
    );
  }

  const valuesList = [
    {
      key: 'be_open',
      name: t('values.beOpen.name'),
      score: values.be_open_rate || 0,
      description: t('values.beOpen.description'),
      details: values.be_open_details,
    },
    {
      key: 'be_bold',
      name: t('values.beBold.name'),
      score: values.be_bold_rate || 0,
      description: t('values.beBold.description'),
      details: values.be_bold_details,
    },
    {
      key: 'move_faster',
      name: t('values.moveFaster.name'),
      score: values.move_faster_rate || 0,
      description: t('values.moveFaster.description'),
      details: values.move_faster_details,
    },
    {
      key: 'stay_updated',
      name: t('values.stayUpdated.name'),
      score: values.stay_updated_rate || 0,
      description: t('values.stayUpdated.description'),
      details: values.stay_updated_details,
    },
    {
      key: 'achieve_together',
      name: t('values.achieveTogether.name'),
      score: values.achieve_together_rate || 0,
      description: t('values.achieveTogether.description'),
      details: values.achieve_together_details,
    },
  ];

  return (
    <Stack gap="xl">
      <Paper shadow="sm" p="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>{t('title')}</Title>
          <Text size="sm" c="dimmed">
            {t('subtitle')}
          </Text>
        </Stack>
      </Paper>

      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="md" withBorder>
            <ValuesRadarChart values={valuesList} />
          </Paper>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            {valuesList.map((value, index) => (
              <Card key={value.key} withBorder shadow="sm" p="md">
                <Stack gap="xs">
                  <Title order={3}>
                    {String(index + 1).padStart(2, '0')}. {value.name}
                  </Title>
                  <Text size="sm" c="dimmed" mb="xs">
                    {value.description}
                  </Text>
                  <Text fw={700} size="lg" c="blue">
                    Score: {value.score}/100
                  </Text>
                  <Text size="sm">{value.details}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </GridCol>
      </Grid>
    </Stack>
  );
}
