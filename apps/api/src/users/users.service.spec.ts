import { Test } from '@nestjs/testing';

import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: {
    profile: { findUnique: jest.Mock; create: jest.Mock };
    wallet: { create: jest.Mock };
    $transaction: jest.Mock;
  };

  beforeEach(async () => {
    prisma = {
      profile: { findUnique: jest.fn(), create: jest.fn() },
      wallet: { create: jest.fn() },
      $transaction: jest.fn(),
    };
    prisma.$transaction.mockImplementation(
      (fn: (tx: typeof prisma) => unknown) => fn(prisma)
    );

    const module = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(UsersService);
  });

  describe('getOrCreateFromClaims', () => {
    it('creates a Profile and Wallet on first sight of a claim', async () => {
      prisma.profile.findUnique.mockResolvedValue(null);
      prisma.profile.create.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
      });
      prisma.wallet.create.mockResolvedValue({ profileId: 'user-1' });

      const profile = await service.getOrCreateFromClaims({
        id: 'user-1',
        email: 'test@example.com',
      });

      expect(prisma.profile.create).toHaveBeenCalledWith({
        data: { id: 'user-1', email: 'test@example.com' },
      });
      expect(prisma.wallet.create).toHaveBeenCalledWith({
        data: { profileId: 'user-1' },
      });
      expect(profile.id).toBe('user-1');
    });

    it('reuses an existing Profile without creating a new one', async () => {
      prisma.profile.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
      });

      const profile = await service.getOrCreateFromClaims({
        id: 'user-1',
        email: 'test@example.com',
      });

      expect(prisma.profile.create).not.toHaveBeenCalled();
      expect(profile.id).toBe('user-1');
    });

    it('recovers from a concurrent-creation race by re-fetching the Profile', async () => {
      prisma.profile.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ id: 'user-1', email: 'test@example.com' });
      prisma.profile.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: '7.8.0',
        })
      );

      const profile = await service.getOrCreateFromClaims({
        id: 'user-1',
        email: 'test@example.com',
      });

      expect(profile.id).toBe('user-1');
      expect(prisma.profile.findUnique).toHaveBeenCalledTimes(2);
    });
  });
});
