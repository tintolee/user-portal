import { useShowNoResult } from '@src/hooks';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import { ResolvedTransactionsBlockI } from '../components/transactionList';
import { handleFilterTransactions, handleFormatTransactions } from '../utils';

interface UseFilterTransactionsOptions {
  transactions: ClientApi.Transaction[];
}

const useFilterTransactions = (options: UseFilterTransactionsOptions) => {
  const { transactions } = options;

  const [searchValue, setSearchValue] = useState('');
  const [searchedTransactions, setSearchedTransactions] = useState<ClientApi.Transaction[]>([]);

  const [transactionsBlockData, setTransactionsBlockData] = useState<ResolvedTransactionsBlockI[]>(
    []
  );

  const { showNoResult } = useShowNoResult({
    data: transactionsBlockData
  });

  const handleblockData = (transactions: ClientApi.Transaction[]) => {
    setTransactionsBlockData(handleFormatTransactions(transactions));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  useEffect(() => {
    if (transactions) {
      setSearchedTransactions(transactions);
    }
  }, [transactions]);

  useEffect(() => {
    if (searchedTransactions) {
      handleblockData(searchedTransactions);
    }
  }, [searchedTransactions]);

  useEffect(() => {
    if (searchValue) {
      const filtered = handleFilterTransactions(searchedTransactions, searchValue);

      if (filtered) {
        handleblockData(filtered);
      }
    } else {
      handleblockData(searchedTransactions);
    }
  }, [searchValue, searchedTransactions]);

  return { handleChange, searchValue, showNoResult, transactionsBlockData };
};

export default useFilterTransactions;
