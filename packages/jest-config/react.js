import baseConfig from './base.js';

/**
 * Shared Jest configuration for React packages.
 *
 * @type {import("jest").Config}
 */
export const config = {
  ...baseConfig,
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
  moduleNameMapper: {
    ...(baseConfig.moduleNameMapper ?? {}),
    '\\.(css|less|sass|scss)$': '@bearnance/jest-config/mocks/style',
    '\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '@bearnance/jest-config/mocks/file',
  },
  testEnvironment: 'jsdom',
  transform: {
    ...(baseConfig.transform ?? {}),
    '^.+\\.m?tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
    '^.+\\.[cm]?jsx?$': [
      'ts-jest',
      {
        tsconfig: {
          allowJs: true,
        },
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/.pnpm/(?!(?:@storybook\\+|storybook@))',
    '/node_modules/(?!\\.pnpm|@storybook/|storybook/)',
  ],
};

export default config;
