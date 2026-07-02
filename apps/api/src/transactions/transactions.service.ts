import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  Prisma,
  Transaction,
  TransactionType,
} from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsQueryDto } from './dto/list-transactions-query.dto';

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedTransactions {
  data: Transaction[];
  meta: PaginationMeta;
}

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    profileId: string,
    dto: CreateTransactionDto
  ): Promise<Transaction> {
    const amount = BigInt(dto.amountMinor);

    return this.prisma.$transaction(async (tx) => {
      const wallet =
        dto.type === TransactionType.DEPOSIT
          ? await tx.wallet.update({
              where: { profileId },
              data: { balanceMinor: { increment: amount } },
            })
          : await this.applyWithdrawal(tx, profileId, amount);

      return tx.transaction.create({
        data: {
          profileId,
          type: dto.type,
          amountMinor: amount,
          currency: wallet.currency,
          balanceAfterMinor: wallet.balanceMinor,
          description: dto.description,
        },
      });
    });
  }

  async list(
    profileId: string,
    query: ListTransactionsQueryDto
  ): Promise<PaginatedTransactions> {
    const { page, pageSize, type } = query;

    const where: Prisma.TransactionWhereInput = {
      profileId,
      ...(type ? { type } : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        pageSize,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / pageSize),
      },
    };
  }

  async getById(profileId: string, id: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction || transaction.profileId !== profileId) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  private async applyWithdrawal(
    tx: Prisma.TransactionClient,
    profileId: string,
    amount: bigint
  ) {
    const result = await tx.wallet.updateMany({
      where: { profileId, balanceMinor: { gte: amount } },
      data: { balanceMinor: { decrement: amount } },
    });

    if (result.count === 0) {
      throw new BadRequestException('Insufficient funds');
    }

    return tx.wallet.findUniqueOrThrow({ where: { profileId } });
  }
}
