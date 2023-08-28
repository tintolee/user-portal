import { Box, Text } from '@sendsprint/ui-react';
import { CloseBtn, Dialog2 } from '@src/components';
import { useGetTransactionByTxref } from '@src/hooks';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import DetailsInfo from './detailsInfo';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const TransactionDetails = ({ handleClose, isOpen }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const txrefFromQuery = searchParams.get('txref');
  const typeFromQuery = searchParams.get('type');

  const { data: transaction, isFetching } = useGetTransactionByTxref(
    {
      txref: txrefFromQuery || ''
    },
    {
      enabled: !!txrefFromQuery
    }
  );

  const handleCloseModal = () => {
    searchParams.delete('txref');
    searchParams.delete('type');
    setSearchParams(searchParams);
    handleClose();
  };
  return (
    <Dialog2 isOpen={isOpen} handleClose={handleCloseModal}>
      <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
        <Text className="ss-text-neutral-500" variant="h5">
          Transaction Details
        </Text>
        <CloseBtn onClick={handleCloseModal} />
      </Box>
      <DetailsInfo typeFromQuery={typeFromQuery} isLoading={isFetching} transaction={transaction} />
    </Dialog2>
  );
};

export default TransactionDetails;
