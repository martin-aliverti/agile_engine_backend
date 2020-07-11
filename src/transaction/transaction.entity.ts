import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface TransactionEntity extends InMemoryDBEntity {
  uuid: string;
  type: string;
  amount: number;
  effectiveDate: string;
}
