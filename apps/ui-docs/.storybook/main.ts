import { dirname } from 'path';
import { fileURLToPath } from 'url';

import type { StorybookConfig } from '@storybook/react-vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: [
    '../../../packages/ui-web/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/ui-mobile/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      include: [
        '../../packages/ui-mobile/src/**/*.tsx',
        '../../packages/ui-web/src/**/*.tsx',
      ],
      tsconfigPath: fileURLToPath(new URL('../tsconfig.json', import.meta.url)),
      propFilter: (prop) =>
        prop.parent == null || !prop.parent.fileName.includes('node_modules'),
    },
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const tailwindcss = (await import('@tailwindcss/vite')).default;

    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: [{ find: /^react-native$/, replacement: 'react-native-web' }],
        extensions: [
          '.web.tsx',
          '.web.ts',
          '.tsx',
          '.ts',
          '.web.jsx',
          '.web.js',
          '.jsx',
          '.js',
          '.json',
        ],
        dedupe: ['react', 'react-dom', 'react-native', 'react-native-web'],
      },
      optimizeDeps: {
        include: ['react-native-web'],
      },
    });
  },
};
export default config;
