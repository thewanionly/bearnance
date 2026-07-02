import { Expose } from 'class-transformer';

import { Wallet } from '../../generated/prisma/client';

export class BalanceResponseDto {
  @Expose()
  balanceMinor!: string;

  @Expose()
  currency!: string;

  static fromWallet(wallet: Wallet): BalanceResponseDto {
    const dto = new BalanceResponseDto();
    dto.balanceMinor = wallet.balanceMinor.toString();
    dto.currency = wallet.currency;
    return dto;
  }
}
