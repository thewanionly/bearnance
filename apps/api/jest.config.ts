import nodeConfig from '@bearnance/jest-config/node';

/** @type {import("jest").Config} */
const config = {
  ...nodeConfig,
  rootDir: '.',
  testRegex: 'src/.*\\.spec\\.ts$',
  // The generated Prisma client uses explicit `.js` extensions on its
  // relative imports (NodeNext ESM convention); map them back to the `.ts`
  // sources so ts-jest can resolve them.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // `jose` ships pure-ESM-only output with no CJS build; transform it back
  // to CommonJS so Jest's CJS module system can load it.
  transformIgnorePatterns: ['/node_modules/(?!(.*/)?jose/)'],
  transform: {
    ...(nodeConfig.transform ?? {}),
    '/node_modules/jose/.+\\.js$': [
      'babel-jest',
      { plugins: ['@babel/plugin-transform-modules-commonjs'] },
    ],
  },
};

export default config;
