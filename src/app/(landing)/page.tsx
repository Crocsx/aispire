'use client';

import {
  Title,
  Text,
  Container,
  Button,
  Group,
  ThemeIcon,
  rem,
  Card,
  SimpleGrid,
  Stack,
  BackgroundImage,
  Box,
  Image,
  Flex,
} from '@mantine/core';
import { IconBrain, IconTarget, IconHeart } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { PATHS } from 'src/config';

const features = [
  {
    icon: IconBrain,
    title: 'AI-Powered Insights',
    description:
      'Get personalized guidance and actionable insights powered by advanced AI technology',
    color: 'blue',
  },
  {
    icon: IconTarget,
    title: 'Structured Growth',
    description:
      'Track your progress with structured reflection sessions and organized feedback',
    color: 'green',
  },
  {
    icon: IconHeart,
    title: 'Values Alignment',
    description:
      'Align your personal development with your core values and beliefs',
    color: 'pink',
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <main>
      {/* Hero Section */}
      <Box pos="relative" h={{ base: 500, md: 600 }}>
        <BackgroundImage
          h="100%"
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
        >
          <Container size="lg" h="100%">
            <Flex
              direction="column"
              justify="center"
              h="100%"
              ta="center"
              maw={700}
              mx="auto"
              px="md"
            >
              <Title order={1} size="h1" fw={900} c="white" ta="center">
                Your Personal Growth
                <Text
                  component="span"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  inherit
                >
                  AI-Powered
                </Text>
                Journey
              </Title>
              <Text c="gray.4" mt="xl" size="xl" maw={600} mx="auto">
                Transform your personal development with AI-driven insights,
                structured reflection, and value-based growth tracking.
              </Text>

              <Group justify="center" mt={40}>
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  onClick={() => router.push(PATHS.auth.signUp())}
                >
                  Get Started
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  c="gray.0"
                  onClick={() => router.push(PATHS.auth.signIn())}
                >
                  Log in
                </Button>
              </Group>
            </Flex>
          </Container>
        </BackgroundImage>
      </Box>

      {/* Features Section */}
      <Container size="lg" py={80}>
        <Stack gap={50}>
          <Box ta="center">
            <Text
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              fw={700}
              size="lg"
            >
              FEATURES
            </Text>
            <Title order={2} size="h1" fw={900} mt="xs">
              Everything you need to grow
            </Title>
            <Text c="dimmed" size="lg" maw={600} mx="auto" mt="md">
              Our platform combines AI technology with proven personal
              development methodologies to help you achieve your goals.
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
            {features.map((feature) => (
              <Card key={feature.title} padding="xl" radius="md" withBorder>
                <ThemeIcon
                  size={60}
                  radius="md"
                  variant="light"
                  color={feature.color}
                  mb="md"
                >
                  <feature.icon
                    style={{ width: rem(30), height: rem(30) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
                <Text fz="lg" fw={500} mb="sm">
                  {feature.title}
                </Text>
                <Text fz="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box bg="gray.0" py={80}>
        <Container size="lg">
          <Card withBorder radius="md" padding="xl" bg="white">
            <Group wrap="nowrap" gap={40}>
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80"
                h={200}
                w={300}
                radius="md"
                alt="Team collaboration"
              />
              <Stack>
                <Title order={2}>Ready to start your growth journey?</Title>
                <Text size="lg" c="dimmed">
                  Join thousands of others who are transforming their lives
                  through structured personal development and AI-powered
                  insights.
                </Text>
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  onClick={() => router.push(PATHS.auth.signUp())}
                  w="fit-content"
                >
                  Get Started Now
                </Button>
              </Stack>
            </Group>
          </Card>
        </Container>
      </Box>
    </main>
  );
}
