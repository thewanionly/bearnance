import baseConfig from './base.js';

/**
 * Shared Jest configuration for Node.js packages.
 *
 * @type {import("jest").Config}
 */
export const config = {
  ...baseConfig,
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
  testEnvironment: 'node',
  transform: {
    ...(baseConfig.transform ?? {}),
    '^.+\\.m?tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;
