import ClientApi from '@src/types/client';

export const handleFilterTransactions = (
  searchedTransactions: ClientApi.Transaction[],
  searchValue: string
) => {
  return searchedTransactions.filter((transaction) => {
    if (transaction.recipientName.toLowerCase().includes(searchValue.toLowerCase()))
      return transaction;
    if (transaction.status.toLowerCase().includes(searchValue.toLowerCase())) return transaction;
    if (transaction.sendCurrency.toLowerCase().includes(searchValue.toLowerCase()))
      return transaction;
    if (transaction.receiveCurrency.toLowerCase().includes(searchValue.toLowerCase()))
      return transaction;
  });
};
