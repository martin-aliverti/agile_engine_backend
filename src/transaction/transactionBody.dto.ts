import { IsString, Length, IsNumber } from 'class-validator';

export class TransactionBodyDto {
  @IsString() @Length(5, 10) type: string;
  @IsNumber() amount: number;
}
