import createNextJsConfig from '@bearnance/jest-config/next-js';

/** @type {import("jest").Config} */
const config = createNextJsConfig({
  dir: './',
  customConfig: {
    // package.json "imports" resolves # aliases per package; a global mapper would break workspace package aliases.
    rootDir: '.',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  },
});

export default config;
