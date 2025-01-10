import { Stack, Paper, Title, Select } from '@mantine/core';

export default function Page() {
  return (
    <Stack p="md">
      <Paper shadow="sm" p="md" withBorder>
        <Stack>
          <Title order={3}>Reflection Settings</Title>
          <Select
            label="Reflection Mode"
            placeholder="Choose reflection mode"
            defaultValue="ai"
            clearable={false}
            data={[
              { value: 'ai', label: 'AI-Assisted Reflection' },
              { value: 'simple', label: 'Simple Form' },
            ]}
          />
        </Stack>
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Stack>
          <Title order={3}>Feedback Settings</Title>
          <Select
            label="Learning Style"
            placeholder="Choose your learning style"
            defaultValue="visual"
            clearable={false}
            data={[
              { value: 'visual', label: 'Visual' },
              { value: 'auditory', label: 'Auditory' },
              { value: 'kinesthetic', label: 'Kinesthetic' },
            ]}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
