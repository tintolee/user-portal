import { Box } from '@sendsprint/ui-react';
import { NoResult, Pagination } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';
import { useSortScheduleTransfers } from '../../hooks';
import { sortScheduleData } from '../../utils';
import TransferCard from '../transferCard';
import TransferListHead from './TransferListHead';

interface Props {
  data: ClientApi.RecurringTransactionI[];
  refetch: () => void;
}

export interface DropdownI {
  name: string;
}

const TransferList = ({ data, refetch }: Props) => {
  const {
    currentPage,
    dataLength,
    handleSearch,
    numOfPagePosts,
    setCurrentPage,
    showNoResult,
    slicedPosts,
    search
  } = useSortScheduleTransfers({ data });

  return (
    <Box>
      <TransferListHead data={data} handleSearch={handleSearch} search={search} />
      <Box className="ss-mt-8">
        {slicedPosts ? (
          <Box className="ss-grid ss-grid-cols-1 md:ss-grid-cols-2 ss-gap-6">
            {sortScheduleData(slicedPosts).map((item, index) => (
              <TransferCard handleRetry={refetch} item={item} key={index} />
            ))}
          </Box>
        ) : (
          ''
        )}
        {showNoResult ? <NoResult /> : null}

        {slicedPosts.length ? (
          <Box className="ss-flex ss-justify-center ss-mt-5">
            <Pagination
              currentPage={currentPage}
              currentPageFunc={setCurrentPage}
              dataLength={dataLength}
              postsPerPage={numOfPagePosts}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default TransferList;
