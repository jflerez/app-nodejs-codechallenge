import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Record {
  @Field(() => String, { nullable: true })
  transactionExternalId?: string;
}
@ObjectType()
export class TransactionCreateOuput {
  @Field(() => String, { nullable: true })
  message?: string;
  @Field(() => Boolean)
  success: boolean;
  @Field(() => Record, { nullable: true })
  record?: Record;
}
