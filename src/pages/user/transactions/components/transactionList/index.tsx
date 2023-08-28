import { Box } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import React from 'react';
import TransactionBlock from './transactionBlock';
import TransactionsHead from './transactionsHead';
import { useFilterTransactions } from '../../hooks';
import { NoResult } from '@src/components';

interface Props {
  handleOpenModal: () => void;
  transactions: ClientApi.Transaction[];
}

export interface ResolvedTransactionsBlockI {
  title: Date;
  transactions: ClientApi.Transaction[];
}

const TransactionList = ({ handleOpenModal, transactions }: Props) => {
  const { handleChange, searchValue, showNoResult, transactionsBlockData } = useFilterTransactions({
    transactions
  });

  return (
    <Box>
      <TransactionsHead handleChange={handleChange} searchValue={searchValue} />
      <Box className="ss-flex ss-flex-col ss-gap-6">
        {transactionsBlockData.map((item) => (
          <TransactionBlock
            handleOpenModal={handleOpenModal}
            key={item.title.toString()}
            item={item}
          />
        ))}
      </Box>
      {showNoResult ? <NoResult /> : null}
    </Box>
  );
};

export default TransactionList;
