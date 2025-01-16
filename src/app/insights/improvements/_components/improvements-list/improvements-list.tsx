import { Stack, Text, Title, Grid, Paper, GridCol } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { StateCard } from 'src/app/_components';

import { getImprovements } from './_actions';
import { RecommendationCard } from './_components';

export async function ImprovementsList() {
  const t = await getTranslations('app:insight.ImprovementsList');
  const result = await getImprovements();

  const improvements = result.data;

  if (!result.success || !improvements) {
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
          <StateCard isEmpty={!improvements} error={result.error} />
        </Paper>
      </Stack>
    );
  }

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
        {improvements.improvements.map((recommendation, i) => (
          <GridCol key={i}>
            <RecommendationCard
              title={recommendation.title}
              description={recommendation.description}
              actionItems={recommendation.actions}
            />
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
}
