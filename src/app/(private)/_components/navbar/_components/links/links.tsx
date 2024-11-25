'use client';

import { Box, NavLink } from '@mantine/core';
import {
  IconBrain,
  IconDashboard,
  IconHeartFilled,
  IconHelp,
  IconMessageCircle,
  IconRoad,
  type IconProps,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

const LINKS = [
  {
    path: PATHS.dashboard(),
    labelKey: 'link.dashboard',
    icon: (props: IconProps) => <IconDashboard {...props} />,
  },
  {
    path: PATHS.reflection(),
    labelKey: 'link.reflection',
    icon: (props: IconProps) => <IconBrain {...props} />,
  },
  {
    path: PATHS.roadmap(),
    labelKey: 'link.roadmap',
    icon: (props: IconProps) => <IconRoad {...props} />,
  },
  {
    path: PATHS.feedback(),
    labelKey: 'link.feedback',
    icon: (props: IconProps) => <IconMessageCircle {...props} />,
  },
  {
    path: PATHS.values(),
    labelKey: 'link.values',
    icon: (props: IconProps) => <IconHeartFilled {...props} />,
  },
  {
    path: PATHS.help(),
    labelKey: 'link.help',
    icon: (props: IconProps) => <IconHelp {...props} />,
  },
];

export const Links = () => {
  const t = useTranslations('app:core.Navbar');
  const activePathname = usePathname();

  return (
    <nav>
      {LINKS.map(({ path, labelKey, icon: Icon }) => (
        <Box key={path}>
          <NavLink
            component={Link}
            href={path}
            leftSection={<Icon size="1.5rem" />}
            active={activePathname === path}
            label={t(labelKey)}
          />
        </Box>
      ))}
    </nav>
  );
};
