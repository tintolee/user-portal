import ClientApi from '@src/types/client';
import { isSameMonth, isSameYear } from 'date-fns';
import { ResolvedTransactionsBlockI } from '../components/transactionList';

const handleSortTransactions = (transactions: ClientApi.Transaction[]) => {
  return transactions.sort((a, b) =>
    a.createdDate.getMilliseconds < b.createdDate.getMilliseconds
      ? -1
      : a.createdDate.getMilliseconds > b.createdDate.getMilliseconds
      ? 1
      : 0
  );
};

export const handleFormatTransactions = (transactions: ClientApi.Transaction[]) => {
  const sortedTransactions = handleSortTransactions(transactions);

  const arr: ResolvedTransactionsBlockI[] = [];

  for (const transaction of sortedTransactions) {
    const indexOfTitle = arr.findIndex(
      (item) =>
        isSameMonth(item.title, transaction.createdDate) &&
        isSameYear(item.title, transaction.createdDate)
    );

    if (indexOfTitle > -1) {
      arr[indexOfTitle].transactions.push(transaction);
    } else {
      arr.push({
        title: transaction.createdDate,
        transactions: [transaction]
      });
    }
  }

  return arr;
};
