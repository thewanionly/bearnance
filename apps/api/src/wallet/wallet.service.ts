import { Injectable, NotFoundException } from '@nestjs/common';

import { Wallet } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(profileId: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { profileId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }
}
