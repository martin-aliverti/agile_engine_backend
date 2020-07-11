import { TransactionBodyDto } from './transactionBody.dto';
import { TransactionDto } from './transaction.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { TransactionEntity } from './transaction.entity';

const CREDIT = 'credit';
const DEBIT = 'debit';

export class AccountService extends InMemoryDBService<TransactionEntity> {
  doCreate = (data: TransactionBodyDto) => {
    const transaction: TransactionDto = {
      uuid: 'lalala',
      ...data,
      effectiveDate: new Date().toISOString(),
    };
    return super.create(transaction);
  };

  getBalance = () =>
    super.getAll().reduce((accu, transaction) => {
      const adjustment = transaction.type === CREDIT ? 1 : -1;
      return accu + adjustment * transaction.amount;
    }, 0);
}
