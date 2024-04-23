export interface UseCaseTransaction {
  findById(id: string): Promise<any>;
  register(newTransaction: any): Promise<any>;
  update(id: string, dataToUpdate: object): Promise<any>;
}
