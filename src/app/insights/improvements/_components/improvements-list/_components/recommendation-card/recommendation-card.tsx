import {
  Card,
  Stack,
  Text,
  Title,
  ThemeIcon,
  List,
  ListItem,
} from '@mantine/core';
import { IconBulb, IconArrowUp } from '@tabler/icons-react';

interface RecommendationCardProps {
  title: string;
  description: string;
  actionItems: string[];
}

export function RecommendationCard({
  title,
  description,
  actionItems,
}: RecommendationCardProps) {
  return (
    <Card withBorder shadow="sm" p="lg">
      <Stack gap="md">
        <Title order={4}>
          <IconBulb
            size={20}
            style={{ marginRight: 8, verticalAlign: 'text-bottom' }}
          />
          {title}
        </Title>
        <Text size="sm">{description}</Text>

        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={20} radius="xl">
              <IconArrowUp size={12} />
            </ThemeIcon>
          }
        >
          {actionItems.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      </Stack>
    </Card>
  );
}
