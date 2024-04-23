interface Transaction {
  transactionExternalId: string;
  transactionType: {
    name: string;
  };
  transactionStatus: {
    name: string;
  };
  value: number;
  createdAt: Date;
}

export const transformData = (data: any): Transaction => {
  return {
    transactionExternalId: data.id,
    transactionType: {
      name: data.tranferTypeId.description,
    },
    transactionStatus: {
      name: data.status,
    },
    value: data.value,
    createdAt: data.createdAt,
  };
};
