import { Inject } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { TransactionUseCaseService } from '../../../../../application/usecases/transaction/transaction-use-case.service';
import { UseCaseTransaction } from '../../../../../application/usecases/transaction/transaction-use-case.interface';
import { CreateTransactionInput } from '../../inputs/transaction-create.input';
import { TransactionCreateOuput } from '../../ouputs/transaction-create.ouput';
import { FindTransactionResponse } from '../../ouputs/transaction-find.ouput';
import { FindTransactionInput } from '../../inputs/transaction-find.input';

@Resolver()
export class TransactionResolver {
  constructor(
    @Inject(TransactionUseCaseService)
    private readonly _transactionService: UseCaseTransaction,
  ) {}
  @Query(() => FindTransactionResponse, {
    name: 'transactionFind',
    description: 'Query que permite obtener una transacion.',
  })
  async getTransaction(
    @Args('findTransactionInput')
    findTransactionInput: FindTransactionInput,
  ): Promise<FindTransactionResponse> {
    const resp = await this._transactionService.findById(
      findTransactionInput.transactionExternalId,
    );
    return resp;
  }

  @Mutation(() => TransactionCreateOuput, {
    name: 'transactionCreate',
    description: 'Mutacion que permite crear una transacion.',
  })
  async transaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ): Promise<TransactionCreateOuput> {
    const resp = await this._transactionService.register(
      createTransactionInput,
    );
    return resp;
  }
}
