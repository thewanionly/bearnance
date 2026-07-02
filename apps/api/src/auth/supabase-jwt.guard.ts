import type { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

import { Profile } from '../generated/prisma/client';
import { AuthenticatedUserClaims, UsersService } from '../users/users.service';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

type SupabaseJwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class SupabaseJwtGuard implements CanActivate {
  private hmacSecret: Uint8Array | null = null;
  private jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: Profile }>();

    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const claims = await this.verifyToken(token);
    request.user = await this.usersService.getOrCreateFromClaims(claims);

    return true;
  }

  private extractBearerToken(request: Request): string | null {
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return null;
    }
    return header.slice('Bearer '.length);
  }

  private async verifyToken(token: string): Promise<AuthenticatedUserClaims> {
    let payload: SupabaseJwtPayload;

    try {
      const secret = this.configService.get<string>('SUPABASE_JWT_SECRET');
      const result = secret
        ? await jwtVerify(token, this.getHmacSecret(secret))
        : await jwtVerify(token, this.getJwks());
      payload = result.payload as unknown as SupabaseJwtPayload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') {
      throw new UnauthorizedException('Invalid token claims');
    }

    return { id: payload.sub, email: payload.email };
  }

  private getHmacSecret(secret: string): Uint8Array {
    this.hmacSecret ??= new TextEncoder().encode(secret);
    return this.hmacSecret;
  }

  private getJwks(): ReturnType<typeof createRemoteJWKSet> {
    this.jwks ??= createRemoteJWKSet(
      new URL(
        `${this.configService.getOrThrow<string>('SUPABASE_URL')}/auth/v1/.well-known/jwks.json`
      )
    );
    return this.jwks;
  }
}
