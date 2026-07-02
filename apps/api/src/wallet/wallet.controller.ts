import { Controller, Get } from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { Profile } from '../generated/prisma/client';
import { BalanceResponseDto } from './dto/balance-response.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async getBalance(@CurrentUser() user: Profile): Promise<BalanceResponseDto> {
    const wallet = await this.walletService.getBalance(user.id);
    return BalanceResponseDto.fromWallet(wallet);
  }
}
