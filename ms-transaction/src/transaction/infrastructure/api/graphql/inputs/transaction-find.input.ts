import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class FindTransactionInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  transactionExternalId: string;
}
