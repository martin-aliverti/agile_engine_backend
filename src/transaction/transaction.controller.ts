import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { TransactionBodyDto } from './transactionBody.dto';
import { TransactionDto } from './transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getBalance() {
    return this.accountService.getBalance();
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
    // const currentBalance = await this.accountService.getBalance();
    // if currentBalance (+-) amount < 0 return 400
  };
}
