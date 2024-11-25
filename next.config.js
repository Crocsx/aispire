//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      '@mantine/carousel',
      '@mantine/core',
      '@mantine/dates',
      '@mantine/dropzone',
      '@mantine/form',
      '@mantine/hooks',
      '@mantine/modals',
      '@mantine/notifications',
      '@mantine/nprogress',
      '@mantine/tiptap',
    ],
  },
  nx: {
    svgr: false,
  },
  webpack(config) {
    // Manually add SVGR loader
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { icon: true },
        },
      ],
    });
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

const plugins = [withNx, withNextIntl];

module.exports = composePlugins(...plugins)(nextConfig);
