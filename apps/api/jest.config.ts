import nodeConfig from '@bearnance/jest-config/node';

/** @type {import("jest").Config} */
const config = {
  ...nodeConfig,
  rootDir: '.',
  testRegex: 'src/.*\\.spec\\.ts$',
};

export default config;
