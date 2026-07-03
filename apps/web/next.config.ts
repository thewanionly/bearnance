import type { NextConfig } from 'next';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Trace from the monorepo root so `output: 'standalone'` includes the workspace
// packages (`@bearnance/ui-web`, `ui-core`, `design-tokens`) and the pnpm store.
const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);

const nextConfig: NextConfig = {
  transpilePackages: ['@bearnance/ui-web'],
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: monorepoRoot,
};

export default nextConfig;
