/**
 * Shared Prettier configuration for Bearnance.
 *
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: 'always',
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  importOrder: [
    '^(react$)|^(react/(.*)$)',
    '^(next$)|^(next/(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '^@(.*)$',
    '^([./])|^([../])',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    new URL(import.meta.resolve('@trivago/prettier-plugin-sort-imports')),
    new URL(import.meta.resolve('prettier-plugin-tailwindcss')),
  ],
};

export default config;
