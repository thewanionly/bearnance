import { SignJWT } from 'jose';

import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

import { UsersService } from '../users/users.service';
import { SupabaseJwtGuard } from './supabase-jwt.guard';

describe('SupabaseJwtGuard', () => {
  const secret = 'test-secret';
  let guard: SupabaseJwtGuard;
  let reflector: { getAllAndOverride: jest.Mock };
  let configService: { get: jest.Mock; getOrThrow: jest.Mock };
  let usersService: { getOrCreateFromClaims: jest.Mock };

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn().mockReturnValue(false) };
    configService = {
      get: jest.fn().mockReturnValue(secret),
      getOrThrow: jest.fn(),
    };
    usersService = {
      getOrCreateFromClaims: jest.fn().mockResolvedValue({ id: 'user-1' }),
    };

    guard = new SupabaseJwtGuard(
      reflector as unknown as Reflector,
      configService as unknown as ConfigService,
      usersService as unknown as UsersService
    );
  });

  function createContext(request: Record<string, unknown>): ExecutionContext {
    return {
      switchToHttp: () => ({ getRequest: () => request }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;
  }

  it('allows public routes without a token', async () => {
    reflector.getAllAndOverride.mockReturnValue(true);
    const context = createContext({ headers: {} });

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(usersService.getOrCreateFromClaims).not.toHaveBeenCalled();
  });

  it('rejects requests without a bearer token', async () => {
    const context = createContext({ headers: {} });

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException
    );
  });

  it('rejects an invalid token', async () => {
    const context = createContext({
      headers: { authorization: 'Bearer not-a-real-token' },
    });

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException
    );
  });

  it('attaches the profile to the request for a valid token', async () => {
    const token = await new SignJWT({ email: 'test@example.com' })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('user-1')
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(secret));

    const request: Record<string, unknown> = {
      headers: { authorization: `Bearer ${token}` },
    };
    const context = createContext(request);

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(usersService.getOrCreateFromClaims).toHaveBeenCalledWith({
      id: 'user-1',
      email: 'test@example.com',
    });
    expect(request.user).toEqual({ id: 'user-1' });
  });
});
