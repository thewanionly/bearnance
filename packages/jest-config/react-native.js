import { fileURLToPath } from 'node:url';

import baseConfig from './base.js';

const reactNativeMockPath = fileURLToPath(
  new URL('./mocks/react-native.tsx', import.meta.url)
);

/**
 * Shared Jest configuration for React Native packages.
 *
 * @type {import("jest").Config}
 */
export const config = {
  ...baseConfig,
  moduleNameMapper: {
    ...(baseConfig.moduleNameMapper ?? {}),
    '^react-native$': reactNativeMockPath,
  },
  testEnvironment: 'node',
  transform: {
    ...(baseConfig.transform ?? {}),
    '^.+\\.[cm]?[jt]sx?$': [
      'babel-jest',
      {
        presets: ['module:@react-native/babel-preset'],
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/.pnpm/(?!(?:@storybook\\+|storybook@))',
    '/node_modules/(?!\\.pnpm|@storybook/|storybook/)',
  ],
};

export default config;
