export interface CrudTransactionTypeRepository {
  findOne(code: number): Promise<any>;
}
