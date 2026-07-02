import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { Profile } from '../generated/prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsQueryDto } from './dto/list-transactions-query.dto';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { PaginationMeta } from './transactions.service';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @Post()
  async create(
    @CurrentUser() user: Profile,
    @Body() dto: CreateTransactionDto
  ): Promise<TransactionResponseDto> {
    const transaction = await this.transactionsService.create(user.id, dto);
    return TransactionResponseDto.fromTransaction(transaction);
  }

  @Get()
  async list(
    @CurrentUser() user: Profile,
    @Query() query: ListTransactionsQueryDto
  ): Promise<{ data: TransactionResponseDto[]; meta: PaginationMeta }> {
    const { data, meta } = await this.transactionsService.list(user.id, query);
    return { data: data.map(TransactionResponseDto.fromTransaction), meta };
  }

  @Get(':id')
  async getById(
    @CurrentUser() user: Profile,
    @Param('id') id: string
  ): Promise<TransactionResponseDto> {
    const transaction = await this.transactionsService.getById(user.id, id);
    return TransactionResponseDto.fromTransaction(transaction);
  }
}
