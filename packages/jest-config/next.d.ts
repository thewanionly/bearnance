import type { Config } from 'jest';

export function createNextJsConfig(options?: {
  customConfig?: Config;
  dir?: string;
}): Config | Promise<Config>;

export default createNextJsConfig;
