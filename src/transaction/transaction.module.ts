import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { AccountService } from './account.service';

@Module({
  controllers: [TransactionController],
  providers: [AccountService],
})
export class TransactionModule {}
