import reactNativeConfig from '@bearnance/jest-config/react-native';

/** @type {import("jest").Config} */
const config = {
  ...reactNativeConfig,
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
};

export default config;
