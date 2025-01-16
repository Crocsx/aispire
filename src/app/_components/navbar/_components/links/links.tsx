'use client';

import { Box, NavLink } from '@mantine/core';
import {
  IconBrain,
  IconDashboard,
  IconHeartFilled,
  IconHelp,
  IconMessageCircle,
  type IconProps,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PATHS } from 'src/config';

const LINKS = [
  {
    path: PATHS.dashboard(),
    root: PATHS.dashboard(),
    labelKey: 'link.dashboard',
    icon: (props: IconProps) => <IconDashboard {...props} />,
  },
  {
    path: PATHS.feedback.reflection(),
    root: PATHS.feedback.root(),
    labelKey: 'link.feedbackHub',
    icon: (props: IconProps) => <IconMessageCircle {...props} />,
  },
  {
    path: PATHS.growth.career(),
    root: PATHS.growth.root(),
    labelKey: 'link.growthZone',
    icon: (props: IconProps) => <IconBrain {...props} />,
  },
  {
    path: PATHS.insights.overview(),
    root: PATHS.insights.root(),
    labelKey: 'link.profileInsights',
    icon: (props: IconProps) => <IconHeartFilled {...props} />,
  },
  {
    path: PATHS.help(),
    root: PATHS.help(),
    labelKey: 'link.helpAndSupport',
    icon: (props: IconProps) => <IconHelp {...props} />,
  },
];

export const Links = () => {
  const t = useTranslations('app:core.Navbar');
  const activePathname = usePathname();
  console.log(activePathname);
  return (
    <nav>
      {LINKS.map(({ path, labelKey, root, icon: Icon }) => (
        <Box key={path}>
          <NavLink
            component={Link}
            href={path}
            leftSection={<Icon size="1.5rem" />}
            active={activePathname.startsWith(root)}
            label={t(labelKey)}
          />
        </Box>
      ))}
    </nav>
  );
};
