/**
 * Shared Jest configuration for Bearnance packages.
 *
 * @type {import("jest").Config}
 */
export const config = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
    '<rootDir>/app/**/*.{ts,tsx,js,jsx}',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/*.{test,spec}.{ts,tsx,js,jsx}',
    '!<rootDir>/**/__tests__/**',
    '!<rootDir>/**/node_modules/**',
    '!<rootDir>/**/dist/**',
    '!<rootDir>/**/build/**',
    '!<rootDir>/**/.next/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/.next/'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'mts',
    'cts',
    'js',
    'jsx',
    'mjs',
    'cjs',
    'json',
    'node',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.next/'],
};

export default config;
