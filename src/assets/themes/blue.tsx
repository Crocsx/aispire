import { SVGProps } from 'react';

import {
  Fieldset,
  MantineColorsTuple,
  Modal,
  createTheme,
} from '@mantine/core';

import { AispireLogoIcon } from '~aispire/shared/icons';

const primary: MantineColorsTuple = [
  '#F0F4F8', // Lightest Primary
  '#E1E8F0', // Very Light Primary
  '#D1DCE8', // Lighter Primary
  '#A6B8D8', // Soft Primary
  '#8FA2C7', // Desaturated Primary
  '#718AB5', // Pure Primary
  '#4E74A2', // Moderate Primary
  '#365D86', // Dark Primary
  '#2C4C6E', // Deeper Primary
  '#1F3A56', // Darkest Primary
];

const palette = {
  primary,
};

export const themeBlue = createTheme({
  colors: palette,
  cursorType: 'pointer',
  primaryColor: 'primary',
  defaultRadius: 'md',
  fontFamily: 'Open Sans, Roboto, "Helvetica Neue", sans-serif',
  fontFamilyMonospace:
    '"Fira Code", "Fira Mono", "Droid Sans Mono", "Courier New", monospace',
  headings: { fontFamily: 'Lato, "Segoe UI", "Helvetica Neue", sans-serif' },
  components: {
    Fieldset: Fieldset.extend({
      styles: {
        root: {
          borderRadius: 0,
          border: 0,
          background: 'transparent',
        },
      },
    }),
    /* AppShell: AppShell.extend({
      styles: {
        navbar: {
           boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
        },
        header: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
          zIndex: 101,
        },
      },
    }),*/
    Modal: Modal.extend({
      styles: {
        title: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
        },
      },
    }),
  },
  other: {
    logo: (props: SVGProps<SVGSVGElement>) => (
      <AispireLogoIcon fill={primary[7]} {...props} />
    ),
  },
});
