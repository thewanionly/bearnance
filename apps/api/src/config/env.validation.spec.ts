import 'reflect-metadata';

import { validate } from './env.validation';

// A complete, valid environment minus SUPABASE_URL, so that the SUPABASE_URL
// cases below fail (or pass) in isolation — nothing else is invalid.
const baseEnv = {
  NODE_ENV: 'test',
  PORT: '3002',
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/bearnance',
  DIRECT_URL: 'postgresql://user:pass@localhost:5432/bearnance',
  WEB_APP_URL: 'http://localhost:3000',
};

const validEnv = {
  ...baseEnv,
  SUPABASE_URL: 'https://project.supabase.co',
};

describe('validate (environment variables)', () => {
  it('returns the validated config when all required vars are present and valid', () => {
    const result = validate(validEnv);

    expect(result.SUPABASE_URL).toBe('https://project.supabase.co');
  });

  it('accepts a config without SUPABASE_JWT_SECRET (asymmetric/JWKS verification)', () => {
    expect(() => validate(validEnv)).not.toThrow();
  });

  it('accepts a config with SUPABASE_JWT_SECRET (legacy HS256 verification)', () => {
    expect(() =>
      validate({ ...validEnv, SUPABASE_JWT_SECRET: 'legacy-hs256-secret' })
    ).not.toThrow();
  });

  it('throws when SUPABASE_URL is missing', () => {
    expect(() => validate(baseEnv)).toThrow(/SUPABASE_URL/);
  });

  it('throws when SUPABASE_URL is not a valid URL', () => {
    expect(() => validate({ ...validEnv, SUPABASE_URL: 'not a url' })).toThrow(
      /SUPABASE_URL/
    );
  });
});
