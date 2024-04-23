export interface CrudTransactionRepository {
  findById(id: string): Promise<any>;
  register(transaction: any): Promise<any>;
  update(id: string, dataToUpdate: object): Promise<any>;
}
