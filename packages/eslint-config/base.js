import eslintConfigPrettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import turboPlugin from 'eslint-plugin-turbo';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

const tsconfigBasePath = fileURLToPath(
  new URL('../typescript-config/base.json', import.meta.url)
);
const repoRootPath = fileURLToPath(new URL('../../', import.meta.url));

const workspaceTsconfigPaths = [
  tsconfigBasePath,
  fileURLToPath(new URL('../../apps/docs-test/tsconfig.json', import.meta.url)),
  fileURLToPath(new URL('../../apps/web/tsconfig.json', import.meta.url)),
  fileURLToPath(new URL('../../apps/web-test/tsconfig.json', import.meta.url)),
  fileURLToPath(
    new URL('../../packages/ui-test/tsconfig.json', import.meta.url)
  ),
];

const workspacePackageImportPatterns = ['@bearnance/*/src/**'];
const appImportPatterns = [
  '@bearnance/docs-test/**',
  '@bearnance/web/**',
  '@bearnance/web-test/**',
];

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    ignores: ['dist/**'],
  },
  {
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: workspaceTsconfigPaths,
          noWarnOnMultipleProjects: true,
        },
      },
      'boundaries/root-path': repoRootPath,
      'boundaries/elements': [
        { type: 'app', pattern: 'apps/(*)', capture: ['name'] },
        { type: 'package', pattern: 'packages/(*)', capture: ['name'] },
      ],
      'boundaries/ignore': [
        '**/*.test.*',
        '**/*.spec.*',
        '.next/**',
        'dist/**',
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          checkAllOrigins: true,
          rules: [
            {
              disallow: {
                to: {
                  parent: {
                    type: '*',
                  },
                },
              },
              message:
                "Architectural boundary violation: ${file.type} '${file.name}' cannot import private nested code via '${dependency.source}'. Import through the parent element's public API instead.",
            },
            {
              allow: {
                dependency: {
                  relationship: {
                    to: ['child', 'sibling', 'uncle'],
                  },
                },
              },
            },
            {
              from: [{ type: 'app' }, { type: 'package' }],
              disallow: [
                {
                  dependency: {
                    source: workspacePackageImportPatterns,
                  },
                },
              ],
              message:
                "Architectural boundary violation: ${file.type} '${file.name}' cannot import package internals via '${dependency.source}'. Import from the package export instead.",
            },
            {
              from: { type: 'app' },
              disallow: [
                { to: { type: 'app' } },
                {
                  dependency: {
                    source: appImportPatterns,
                  },
                },
              ],
              message:
                "Architectural boundary violation: app '${file.name}' cannot import another app via '${dependency.source}'. Apps may depend on packages only.",
            },
            {
              from: { type: 'package' },
              disallow: [
                { to: { type: 'app' } },
                {
                  dependency: {
                    source: appImportPatterns,
                  },
                },
              ],
              message:
                "Architectural boundary violation: package '${file.name}' cannot import an app via '${dependency.source}'. Packages must stay app-independent.",
            },
          ],
        },
      ],
    },
  },
];
