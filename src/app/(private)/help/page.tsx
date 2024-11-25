import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Card,
  Group,
  ThemeIcon,
  Accordion,
  Button,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
} from '@mantine/core';
import {
  IconQuestionMark,
  IconBook,
  IconMailFilled,
  IconArticle,
} from '@tabler/icons-react';

export default function Page() {
  return (
    <Container size="lg" py="xl">
      <Paper shadow="xs" p="md" withBorder mb="xl">
        <Title order={2}>Help & Support</Title>
        <Text c="dimmed">
          Find answers to common questions, access tutorials, or contact support
          for assistance
        </Text>
      </Paper>

      <Stack gap="lg">
        <Card withBorder shadow="sm">
          <Group mb="md">
            <ThemeIcon size={46} radius="md" variant="light" color="blue">
              <IconQuestionMark size={24} />
            </ThemeIcon>
            <div>
              <Title order={3}>Frequently Asked Questions</Title>
              <Text size="sm" c="dimmed">
                Quick answers to common questions about using the platform
              </Text>
            </div>
          </Group>

          <Accordion variant="contained">
            <AccordionItem value="getting-started">
              <AccordionControl>How do I get started?</AccordionControl>
              <AccordionPanel>
                Getting started is easy! Begin by completing your profile and
                setting your initial goals...
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="feedback">
              <AccordionControl>
                How does feedback processing work?
              </AccordionControl>
              <AccordionPanel>
                Our platform helps you process feedback through guided
                reflection exercises...
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card withBorder shadow="sm">
          <Group mb="md">
            <ThemeIcon size={46} radius="md" variant="light" color="green">
              <IconBook size={24} />
            </ThemeIcon>
            <div>
              <Title order={3}>Tutorials & Guides</Title>
              <Text size="sm" c="dimmed">
                Step-by-step guides to help you make the most of the platform
              </Text>
            </div>
          </Group>
          <Button variant="light" color="green" fullWidth>
            Browse Tutorials
          </Button>
        </Card>

        <Card withBorder shadow="sm">
          <Group mb="md">
            <ThemeIcon size={46} radius="md" variant="light" color="violet">
              <IconMailFilled size={24} />
            </ThemeIcon>
            <div>
              <Title order={3}>Contact Support</Title>
              <Text size="sm" c="dimmed">
                Need help? Our support team is here for you
              </Text>
            </div>
          </Group>
          <Button variant="light" color="violet" fullWidth>
            Contact Support
          </Button>
        </Card>

        <Card withBorder shadow="sm">
          <Group mb="md">
            <ThemeIcon size={46} radius="md" variant="light" color="orange">
              <IconArticle size={24} />
            </ThemeIcon>
            <div>
              <Title order={3}>Knowledge Base</Title>
              <Text size="sm" c="dimmed">
                Detailed articles and documentation about platform features
              </Text>
            </div>
          </Group>
          <Button variant="light" color="orange" fullWidth>
            Browse Articles
          </Button>
        </Card>
      </Stack>
    </Container>
  );
}
