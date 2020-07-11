import { Injectable } from '@nestjs/common';
import { TransactionBodyDto } from './transactionBody.dto';
import { TransactionDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  create = (data: TransactionBodyDto) => {
    const transaction: TransactionDto = {
      id: 'lalala',
      ...data,
      effectiveDate: new Date().toISOString(),
    };
    return transaction;
  };
}
