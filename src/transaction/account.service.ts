import { v4 as uuidv4 } from 'uuid';
import { TransactionBodyDto } from './transactionBody.dto';
import { TransactionDto } from './transaction.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { TransactionEntity } from './transaction.entity';

export const types = {
  CREDIT: 'credit',
  DEBIT: 'debit',
};

export class AccountService extends InMemoryDBService<TransactionEntity> {
  doCreate = (data: TransactionBodyDto) => {
    const transaction: TransactionDto = {
      uuid: uuidv4(),
      ...data,
      effectiveDate: new Date().toISOString(),
    };
    return super.create(transaction);
  };

  getOne = (uuid: string) =>
    super.query(transaction => transaction.uuid === uuid)[0];

  getBalance = () =>
    super.getAll().reduce((accu, transaction) => {
      const adjustment = transaction.type === types.CREDIT ? 1 : -1;
      return accu + adjustment * transaction.amount;
    }, 0);
}
