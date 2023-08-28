import { Box, ButtonLink, Text } from '@sendsprint/ui-react';
import { SearchInput } from '@src/components';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import React from 'react';

interface Props {
  data: ClientApi.RecurringTransactionI[];
  // eslint-disable-next-line no-unused-vars
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const TransferListHead = ({ data, handleSearch, search }: Props) => {
  return (
    <>
      <Box className="ss-flex ss-gap-3 ss-flex-col md:ss-flex-row md:ss-items-center ss-justify-between">
        <Box className="ss-flex ss-items-center ss-gap-3">
          <Text variant="h5" className="ss-font-bold">
            Transfer Schedules
          </Text>
          <Box className="ss-flex ss-items-center ss-justify-center ss-w-9 ss-h-9 ss-bg-primary1-50 ss-rounded-full">
            <p className="ss-font-bold">{data.length}</p>
          </Box>
        </Box>
        <ButtonLink
          to={Path.AddTransferSchedule}
          className="ss-block md:ss-hidden"
          label="Schedule a transfer"
        />
        <Box className="ss-hidden md:ss-flex ss-items-center ss-justify-end ss-flex-1 ss-gap-2">
          <SearchInput
            placeholder="Recipient, Status"
            inputClasses="ss-py-3"
            containerClasses="ss-min--w-220 ss-hidden xl:ss-block ss-flex-1"
            handleChange={handleSearch}
            value={search}
          />
          <ButtonLink to={Path.AddTransferSchedule} label="Schedule a transfer" />
        </Box>
      </Box>
      <Box className="ss-block ss-mt-6 xl:ss-hidden">
        <SearchInput
          placeholder="Recipient, Status"
          inputClasses="ss-py-3"
          containerClasses="ss-min--w-220 ss-flex-1"
          handleChange={handleSearch}
          value={search}
        />
      </Box>
    </>
  );
};

export default TransferListHead;
