import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class CommonData {
  @Field(() => String, { nullable: true })
  name?: string;
}
@ObjectType()
export class TransactionOuput {
  @Field(() => String, { nullable: true })
  transactionExternalId?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Int, { nullable: true })
  tranferTypeId?: number;

  @Field(() => CommonData, { nullable: true })
  transactionType?: CommonData;

  @Field(() => CommonData, { nullable: true })
  transactionStatus?: CommonData;

  @Field(() => Int, { nullable: true })
  value?: number;
}

@ObjectType()
export class FindTransactionResponse {
  @Field(() => TransactionOuput, { nullable: true })
  record?: TransactionOuput;

  @Field(() => String, { nullable: true })
  message?: string;
  @Field(() => Boolean)
  success: boolean;
}
