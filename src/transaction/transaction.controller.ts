import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AccountService, types } from './account.service';
import { TransactionBodyDto } from './transactionBody.dto';
import { TransactionDto } from './transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getBalance() {
    return this.accountService.getAll();
  }

  @Get(':uuid')
  async getTransaction(@Param('uuid') uuid) {
    const transaction = this.accountService.getOne(uuid);
    if (!transaction) throw new NotFoundException('transaction not found');
    return transaction;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() body: TransactionBodyDto): Promise<TransactionDto> {
    this.validate(body);
    return this.accountService.doCreate(body);
  }

  validate = (body: TransactionBodyDto) => {
    if (body.amount <= 0)
      throw new BadRequestException(
        'Transaction amount must be greater than 0',
      );
    if (body.type === types.DEBIT) {
      const currentBalance = this.accountService.getBalance();
      if (currentBalance < body.amount)
        throw new BadRequestException('Invalid transaction amount');
    }
  };
}
