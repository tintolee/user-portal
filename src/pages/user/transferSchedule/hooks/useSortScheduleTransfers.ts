import { usePagination, useShowNoResult } from '@src/hooks';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import { sortScheduleData } from '../utils';

interface UseSortScheduleTransfersOptions {
  data: ClientApi.RecurringTransactionI[];
}

const useSortScheduleTransfers = (options: UseSortScheduleTransfersOptions) => {
  const { data } = options;

  const [sortedData, setSortedData] = useState<ClientApi.RecurringTransactionI[]>([]);
  const [search, setSearch] = useState('');

  const { currentPage, dataLength, numOfPagePosts, setCurrentPage, slicedPosts } = usePagination(
    sortedData,
    1,
    12
  );

  const { showNoResult } = useShowNoResult({
    data: slicedPosts
  });

  useEffect(() => {
    if (data) {
      if (search) {
        const filtered = data.filter((item) => {
          if (item.RecurringStatus.toLowerCase().includes(search.toLowerCase())) return item;
          if (item.RecipientName.toLowerCase().includes(search.toLowerCase())) return item;
          if ('completed'.includes(search.toLowerCase())) return item;
        });

        if (filtered) {
          setSortedData(sortScheduleData(filtered));
        }
      } else {
        setSortedData(sortScheduleData(data));
      }
    }
  }, [data, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return {
    currentPage,
    dataLength,
    numOfPagePosts,
    setCurrentPage,
    slicedPosts,
    handleSearch,
    showNoResult,
    search
  };
};

export default useSortScheduleTransfers;
