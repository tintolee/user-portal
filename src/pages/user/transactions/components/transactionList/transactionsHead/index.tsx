import { Box, Text } from '@sendsprint/ui-react';
import { SearchInput } from '@src/components';
import React from 'react';

interface Props {
  searchValue: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransactionsHead = ({ searchValue, handleChange }: Props) => {
  return (
    <Box className="ss-mb-6 md:ss-mb-14">
      <Box className="ss-flex ss-gap-3 ss-items-center ss-justify-between">
        <Box className="ss-flex ss-items-center ss-gap-3">
          <Text variant="h5" className="ss-font-bold">
            Transactions
          </Text>
          <Box className="ss-flex ss-items-center ss-justify-center ss-w-9 ss-h-9 ss-bg-primary1-50 ss-rounded-full">
            <p className="ss-font-bold">40</p>
          </Box>
        </Box>
        <Box className="ss-hidden md:ss-flex ss-items-center ss-justify-end ss-w-8/12 ss-gap-2">
          <SearchInput
            placeholder="Recipient, Date, Currency, Status"
            inputClasses="ss-py-3"
            containerClasses="ss-min--w-220 ss-hidden lg:ss-block ss-flex-1"
            handleChange={handleChange}
            value={searchValue}
          />
        </Box>
      </Box>
      <Box className="ss-block ss-mt-6 lg:ss-hidden">
        <SearchInput
          inputClasses="ss-py-3"
          containerClasses="ss-min--w-220 ss-flex-1"
          handleChange={handleChange}
          value={searchValue}
        />
      </Box>
    </Box>
  );
};

export default TransactionsHead;
