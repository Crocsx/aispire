import { Card, Grid, GridCol, Paper, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { getSkills } from './_actions';

export async function InsightSkills() {
  const t = await getTranslations('app:insight.InsightSkills');
  const result = await getSkills();

  if (!result.success || !result.data) {
    return (
      <Text c="red" size="sm">
        Error loading skills: {result.error}
      </Text>
    );
  }

  const skills = result.data;

  const skillCategories = [
    {
      key: 'communication',
      title: t('categories.communication'),
      data: skills.communication,
      skills: [
        { key: 'clarity', nameKey: 'skills.clarity.name' },
        { key: 'listening', nameKey: 'skills.listening.name' },
      ],
    },
    {
      key: 'problem_solving',
      title: t('categories.problemSolving'),
      data: skills.problem_solving,
      skills: [
        { key: 'critical_thinking', nameKey: 'skills.critical_thinking.name' },
        { key: 'creativity', nameKey: 'skills.creativity.name' },
      ],
    },
    {
      key: 'collaboration',
      title: t('categories.collaboration'),
      data: skills.collaboration,
      skills: [
        { key: 'team_contribution', nameKey: 'skills.team_contribution.name' },
        {
          key: 'conflict_resolution',
          nameKey: 'skills.conflict_resolution.name',
        },
      ],
    },
    {
      key: 'leadership',
      title: t('categories.leadership'),
      data: skills.leadership,
      skills: [
        { key: 'initiative', nameKey: 'skills.initiative.name' },
        { key: 'motivation', nameKey: 'skills.motivation.name' },
      ],
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
        {skillCategories.map((category) => (
          <GridCol key={category.key} span={{ base: 12, md: 6 }}>
            <Paper shadow="sm" p="md" withBorder h="100%">
              <Stack gap="md">
                <Title order={4}>{category.title}</Title>

                {category.skills.map((skillInfo) => {
                  const skill = category.data[
                    skillInfo.key as keyof typeof category.data
                  ] as {
                    rating: number;
                    details: string;
                  };
                  return (
                    <Card
                      key={skillInfo.key}
                      withBorder
                      shadow="xs"
                      p="sm"
                      h="100%"
                    >
                      <Stack gap="xs" justify="space-between" h="100%">
                        <div>
                          <Text fw={500}>{t(skillInfo.nameKey)}</Text>
                          <Text size="sm" c="dimmed">
                            {skill.details}
                          </Text>
                        </div>

                        <Grid>
                          <GridCol span={4}>
                            <Stack gap={0} align="center">
                              <Text fw={700} size="lg">
                                {skill.rating}%
                              </Text>
                              <Text size="xs" c="dimmed">
                                {t('rating')}
                              </Text>
                            </Stack>
                          </GridCol>
                        </Grid>
                      </Stack>
                    </Card>
                  );
                })}
              </Stack>
            </Paper>
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
}
