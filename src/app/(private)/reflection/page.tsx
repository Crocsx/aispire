import {
  Stack,
  Title,
  Paper,
  Textarea,
  Text,
  Container,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
} from '@mantine/core';

export default function Page() {
  return (
    <Container size="lg">
      <Stack gap="xl">
        <Title order={1}>Reflection Space</Title>

        <Paper shadow="sm" p="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Feedback Summary</Title>
            <Stack gap="sm">
              <Text>Recent feedback highlights:</Text>
              <Text>
                • Strong communication skills demonstrated in client
                presentations
              </Text>
              <Text>• Leadership potential shown in team coordination</Text>
              <Text>
                • Areas for growth: Technical documentation could be more
                detailed
              </Text>
            </Stack>
          </Stack>
        </Paper>

        <Tabs defaultValue="reflection">
          <TabsList>
            <TabsTab value="reflection">Guided Reflection</TabsTab>
            <TabsTab value="insights">Past Insights</TabsTab>
            <TabsTab value="goals">Growth Goals</TabsTab>
          </TabsList>

          <TabsPanel value="reflection">
            <Paper shadow="sm" p="md" mt="md" withBorder>
              <Stack gap="md">
                <Title order={2}>Guided Reflection Prompts</Title>

                <Stack gap="sm">
                  <Title order={3}>Recent Achievements</Title>
                  <Textarea
                    placeholder="What accomplishments are you most proud of?"
                    minRows={3}
                    autosize
                  />

                  <Title order={3}>Current Challenges</Title>
                  <Textarea
                    placeholder="What challenges are you currently facing?"
                    minRows={3}
                    autosize
                  />

                  <Title order={3}>Feedback Analysis</Title>
                  <Textarea
                    placeholder="Reflect on recent feedback you've received..."
                    minRows={3}
                    autosize
                  />
                </Stack>
              </Stack>
            </Paper>
          </TabsPanel>

          <TabsPanel value="insights">
            <Paper shadow="sm" p="md" mt="md" withBorder>
              <Stack gap="md">
                <Title order={2}>Past Insights</Title>
                <Stack gap="sm">
                  <Text fw={500}>Last Week's Key Takeaways:</Text>
                  <Text>
                    • Need to improve time management for complex projects
                  </Text>
                  <Text>
                    • Successfully implemented new collaboration workflow
                  </Text>
                  <Text>
                    • Team communication has shown positive improvement
                  </Text>

                  <Text fw={500}>Previous Month's Highlights:</Text>
                  <Text>
                    • Completed advanced certification in project management
                  </Text>
                  <Text>• Led successful client presentation</Text>
                  <Text>• Mentored two junior team members</Text>
                </Stack>
              </Stack>
            </Paper>
          </TabsPanel>

          <TabsPanel value="goals">
            <Paper shadow="sm" p="md" mt="md" withBorder>
              <Stack gap="md">
                <Title order={2}>Growth Goals</Title>
                <Stack gap="sm">
                  <Title order={3}>Short-term Goals</Title>
                  <Textarea
                    placeholder="What would you like to achieve in the next few weeks?"
                    minRows={2}
                    autosize
                  />
                  <Title order={3}>Long-term Goals</Title>
                  <Textarea
                    placeholder="What are your aspirations for the coming months?"
                    minRows={2}
                    autosize
                  />

                  <Text fw={500} mt="md">
                    Current Goals Progress:
                  </Text>
                  <Text>• Technical certification: 60% complete</Text>
                  <Text>• Team leadership skills: 75% complete</Text>
                  <Text>• Project management improvement: 40% complete</Text>
                </Stack>
              </Stack>
            </Paper>
          </TabsPanel>
        </Tabs>
      </Stack>
    </Container>
  );
}
