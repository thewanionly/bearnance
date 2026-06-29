import nodeConfig from '@bearnance/jest-config/node';

/** @type {import("jest").Config} */
const config = {
  ...nodeConfig,
  rootDir: '..',
  testRegex: 'test/.*\\.e2e-spec\\.ts$',
};

export default config;
