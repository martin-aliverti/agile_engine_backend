import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [TransactionModule, InMemoryDBModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
