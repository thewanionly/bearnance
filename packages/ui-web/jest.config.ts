import reactConfig from '@bearnance/jest-config/react';

/** @type {import("jest").Config} */
const config = {
  ...reactConfig,
  rootDir: '.',
  moduleNameMapper: {
    ...(reactConfig.moduleNameMapper ?? {}),
    '^#components/(.*)$': '<rootDir>/src/components/$1/$1.tsx',
    '^#hooks/(.*)$': '<rootDir>/src/hooks/$1.ts',
    '^#lib/(.*)$': '<rootDir>/src/lib/$1.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
};

export default config;
