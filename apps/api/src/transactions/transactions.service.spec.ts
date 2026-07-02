import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { TransactionType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let prisma: {
    $transaction: jest.Mock;
    wallet: {
      update: jest.Mock;
      updateMany: jest.Mock;
      findUniqueOrThrow: jest.Mock;
    };
    transaction: {
      create: jest.Mock;
      findMany: jest.Mock;
      count: jest.Mock;
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      $transaction: jest.fn(),
      wallet: {
        update: jest.fn(),
        updateMany: jest.fn(),
        findUniqueOrThrow: jest.fn(),
      },
      transaction: {
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
      },
    };
    prisma.$transaction.mockImplementation((arg: unknown) =>
      typeof arg === 'function'
        ? (arg as (tx: typeof prisma) => unknown)(prisma)
        : Promise.all(arg as Promise<unknown>[])
    );

    const module = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(TransactionsService);
  });

  describe('create', () => {
    it('increments the wallet balance on deposit', async () => {
      prisma.wallet.update.mockResolvedValue({
        profileId: 'profile-1',
        currency: 'PHP',
        balanceMinor: 10_000n,
      });
      prisma.transaction.create.mockImplementation(
        ({ data }: { data: Record<string, unknown> }) => data
      );

      const result = await service.create('profile-1', {
        type: TransactionType.DEPOSIT,
        amountMinor: 10_000,
      });

      expect(prisma.wallet.update).toHaveBeenCalledWith({
        where: { profileId: 'profile-1' },
        data: { balanceMinor: { increment: 10_000n } },
      });
      expect(result.balanceAfterMinor).toBe(10_000n);
    });

    it('decrements the wallet balance on withdrawal', async () => {
      prisma.wallet.updateMany.mockResolvedValue({ count: 1 });
      prisma.wallet.findUniqueOrThrow.mockResolvedValue({
        profileId: 'profile-1',
        currency: 'PHP',
        balanceMinor: 7_000n,
      });
      prisma.transaction.create.mockImplementation(
        ({ data }: { data: Record<string, unknown> }) => data
      );

      const result = await service.create('profile-1', {
        type: TransactionType.WITHDRAWAL,
        amountMinor: 3_000,
      });

      expect(prisma.wallet.updateMany).toHaveBeenCalledWith({
        where: { profileId: 'profile-1', balanceMinor: { gte: 3_000n } },
        data: { balanceMinor: { decrement: 3_000n } },
      });
      expect(result.balanceAfterMinor).toBe(7_000n);
    });

    it('rejects a withdrawal that would overdraw the balance', async () => {
      prisma.wallet.updateMany.mockResolvedValue({ count: 0 });

      await expect(
        service.create('profile-1', {
          type: TransactionType.WITHDRAWAL,
          amountMinor: 999_999,
        })
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(prisma.transaction.create).not.toHaveBeenCalled();
    });
  });
});
