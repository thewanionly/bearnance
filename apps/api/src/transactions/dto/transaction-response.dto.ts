import { Expose } from 'class-transformer';

import { Transaction, TransactionType } from '../../generated/prisma/client';

export class TransactionResponseDto {
  @Expose()
  id!: string;

  @Expose()
  type!: TransactionType;

  @Expose()
  amountMinor!: string;

  @Expose()
  currency!: string;

  @Expose()
  balanceAfterMinor!: string;

  @Expose()
  description!: string | null;

  @Expose()
  createdAt!: Date;

  static fromTransaction(transaction: Transaction): TransactionResponseDto {
    const dto = new TransactionResponseDto();
    dto.id = transaction.id;
    dto.type = transaction.type;
    dto.amountMinor = transaction.amountMinor.toString();
    dto.currency = transaction.currency;
    dto.balanceAfterMinor = transaction.balanceAfterMinor.toString();
    dto.description = transaction.description;
    dto.createdAt = transaction.createdAt;
    return dto;
  }
}
