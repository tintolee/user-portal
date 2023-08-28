import Api from '@sendsprint/api-types';
import { Box, Flag, Text } from '@sendsprint/ui-react';
import { Gift, Money } from '@sendsprint/ui-react/dist/icons';
import { BoxWithIcon } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';
import StatusBox from './StatusBox';

interface Props {
  recipient: ClientApi.Recipient | null | undefined;
  transaction: ClientApi.Transaction;
  typeFromQuery: string | null;
}

const DetailsHead = ({ recipient, transaction, typeFromQuery }: Props) => {
  const littleHeader = typeFromQuery === 'gift' ? 'Gift to' : 'Transfer to';
  const mainIcon = typeFromQuery === 'gift' ? Gift : Money;
  return (
    <Box className="ss-flex ss-bg-white ss-p-4 ss-mb-8 ss-rounded-lg ss-items-start md:ss-items-center ss-justify-between">
      <Box className="ss-flex ss-flex-col md:ss-flex-row md:ss-items-center ss-gap-3">
        <BoxWithIcon
          smallIcon={<Flag size={'100%'} countryInitials={Api.Model.CountryInitials.Nigeria} />}
          mainIcon={mainIcon}
        />
        <Box>
          <Text variant="paragraphSmall" className="ss-text-neutral-400">
            {littleHeader}
          </Text>
          <Text className="ss-text-primary1-500 ss-font-bold">{recipient?.fullName}</Text>
        </Box>
      </Box>
      <StatusBox status={transaction.status} />
    </Box>
  );
};

export default DetailsHead;
