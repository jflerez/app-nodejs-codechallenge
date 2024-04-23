import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  accountExternalIdDebit: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  accountExternalIdCredit: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  tranferTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  value: number;
}
