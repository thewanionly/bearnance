import { Injectable } from '@nestjs/common';

import { Prisma, Profile } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface AuthenticatedUserClaims {
  id: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  /**
   * Lazily provisions a Profile + Wallet for a Supabase-authenticated user on
   * their first request. Handles the race where two concurrent requests from
   * a brand-new user both miss the initial lookup.
   */
  async getOrCreateFromClaims(
    claims: AuthenticatedUserClaims
  ): Promise<Profile> {
    const existing = await this.findById(claims.id);
    if (existing) {
      return existing;
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const profile = await tx.profile.create({
          data: { id: claims.id, email: claims.email },
        });
        await tx.wallet.create({ data: { profileId: profile.id } });
        return profile;
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const profile = await this.findById(claims.id);
        if (profile) {
          return profile;
        }
      }
      throw error;
    }
  }
}
