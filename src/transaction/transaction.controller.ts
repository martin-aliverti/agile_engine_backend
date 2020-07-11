import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionBodyDto } from './transactionBody.dto';
import { TransactionDto } from './transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() transactionBody: TransactionBodyDto,
  ): Promise<TransactionDto> {
    if (transactionBody.amount <= 0) throw new BadRequestException();
    // TODO: check if transaction would result in negative

    return this.transactionService.create(transactionBody);
  }
}
