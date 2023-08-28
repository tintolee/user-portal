import Box from '@sendsprint/ui-react/dist/components/Box';
import TransactionRow from '@src/pages/user/transactions/components/transactionRow';
import ClientApi from '@src/types/client';
import React from 'react';

interface Props {
  transactions: ClientApi.Transaction[];
}

const TransactionsListInner = ({ transactions }: Props) => {
  return (
    <Box className="ss-space-y-3">
      {transactions.map((transaction) => (
        <TransactionRow as="link" key={transaction.id} item={transaction} />
      ))}
    </Box>
  );
};

export default TransactionsListInner;
