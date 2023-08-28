import { Box, Text } from '@sendsprint/ui-react';
import { format } from 'date-fns';
import React from 'react';
import { ResolvedTransactionsBlockI } from '..';
import TransactionRow from '../../transactionRow';

interface Props {
  item: ResolvedTransactionsBlockI;
  handleOpenModal: () => void;
}

const TransactionBlock = ({ item, handleOpenModal }: Props) => {
  const title = format(item.title, 'MMMM yyyy');
  return (
    <Box>
      <Text className="ss-text-primary1-300 ss-mb-4 ss-font-bold" variant="paragraphLarge">
        {title}
      </Text>
      <Box className="ss-p-2 md:ss-p-5 ss-rounded-lg ss-bg-white ss-flex ss-flex-col ss-gap-2">
        {item.transactions.map((item) => (
          <TransactionRow key={item.id} handleOpenModal={handleOpenModal} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default TransactionBlock;
