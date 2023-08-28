import { Box, Text } from '@sendsprint/ui-react';
import { SearchInput } from '@src/components';
import React from 'react';
import DealsFilter from './DealsFilter';

interface Props {
  search: string;
  // eslint-disable-next-line no-unused-vars
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  handleSetRedeemed: (arg: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleSetSender: (arg: string) => void;
}

const DealsHeader = ({ handleSearch, search, handleSetRedeemed, handleSetSender }: Props) => {
  return (
    <Box>
      <Box className="ss-flex ss-flex-col md:ss-flex-row ss-gap-5 ss-items-start md:ss-items-center ss-justify-between">
        <Text variant="h5" className="ss-font-bold">
          Rewards
        </Text>
        <SearchInput
          placeholder="search rewards, deals"
          inputClasses="ss-py-3"
          containerClasses="ss-w-full md:ss-min-w-300"
          handleChange={handleSearch}
          value={search}
        />
      </Box>
      <DealsFilter handleSetRedeemed={handleSetRedeemed} handleSetSender={handleSetSender} />
    </Box>
  );
};

export default DealsHeader;
