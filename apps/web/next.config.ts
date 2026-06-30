import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@bearnance/ui-web'],
  reactStrictMode: true,
};

export default nextConfig;
