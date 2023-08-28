import Box from '@sendsprint/ui-react/dist/components/Box';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { useGetTransactions } from '@src/hooks/queries/transactions';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TransactionsContent from './transactionsContent';

const RecentTransactionsInner = () => {
  const { data: transactions = [], isSuccess, isLoading, isError, refetch } = useGetTransactions();
  const [slicedTransactions, setSlicedTransactions] = useState<ClientApi.Transaction[]>([]);

  useEffect(() => {
    if (transactions.length) {
      setSlicedTransactions(transactions.slice(0, 4));
    }
  }, [transactions]);

  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-mb-3 ss-justify-between">
        <Text className="ss-font-semibold" variant="paragraphLarge">
          Recent transactions
        </Text>
        {isSuccess && slicedTransactions.length ? (
          <Link
            to={Path.TransferHistory}
            className="ss-text-primary1-500 ss-text-paragraph-small ss-underline">
            See all transactions
          </Link>
        ) : null}
      </Box>
      <Box>
        <TransactionsContent
          isError={isError}
          isLoading={isLoading}
          refetch={refetch}
          transactions={slicedTransactions}
        />
      </Box>
    </Box>
  );
};

export default RecentTransactionsInner;
