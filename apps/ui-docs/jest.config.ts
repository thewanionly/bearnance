import reactConfig from '@bearnance/jest-config/react';

/** @type {import("jest").Config} */
const config = {
  ...reactConfig,
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/.storybook/**/*.test.ts?(x)'],
};

export default config;
