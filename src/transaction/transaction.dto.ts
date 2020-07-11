import {
  IsString,
  Length,
  IsNumber,
  IsInt,
  IsDateString,
} from 'class-validator';

export class TransactionDto {
  @IsInt() uuid: string;
  @IsString() @Length(5, 10) type: string;
  @IsNumber() amount: number;
  @IsDateString() effectiveDate: string;
}
