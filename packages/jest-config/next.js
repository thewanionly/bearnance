import { createRequire } from 'node:module';
import { resolve } from 'node:path';

import baseConfig from './base.js';

/**
 * Creates a Jest configuration for Next.js apps.
 *
 * @param {{ dir?: string, customConfig?: import("jest").Config }} options
 */
export const createNextJsConfig = ({ dir = './', customConfig = {} } = {}) => {
  const requireFromProject = createRequire(`${resolve(dir)}/package.json`);
  const nextJestModule = requireFromProject('next/jest.js');
  const nextJest = nextJestModule.default ?? nextJestModule;
  const createJestConfig = nextJest({ dir });

  return createJestConfig({
    ...baseConfig,
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    ...customConfig,
  });
};

export default createNextJsConfig;
