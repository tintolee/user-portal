import { Box, Icon, Text } from '@sendsprint/ui-react';
import { CreditCardOutline } from '@sendsprint/ui-react/dist/icons';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';

interface Props {
  data: ClientApi.Recipient;
  resolvedBanks: ClientApi.Bank[];
  bankBranches: ClientApi.BankBranch[];
}

const TransferInfo = ({ data, resolvedBanks, bankBranches }: Props) => {
  const [selectedBank, setSelectedBank] = useState<ClientApi.Bank>();
  const [selectedBankBranch, setSelectedBankBranch] = useState<ClientApi.BankBranch>();

  if (!data.bankCode) return null;

  useEffect(() => {
    if (data && resolvedBanks) {
      const filtered = resolvedBanks.find((bank) => bank.code === data.bankCode);

      setSelectedBank(filtered);
    } else {
      setSelectedBank(undefined);
    }
  }, [resolvedBanks, data]);

  useEffect(() => {
    if (data && bankBranches) {
      const filtered = bankBranches.find((bank) => bank.code === data.branchCode);

      setSelectedBankBranch(filtered);
    }
  }, [bankBranches, data]);

  return (
    <Box className="ss-flex ss-gap-4 ss-pl-4 ss-text-primary1-300">
      <Box>
        <Icon size={24} svg={CreditCardOutline} />
      </Box>
      <Box className="ss-pt-1">
        <Text className="ss-font-bold ss-mb-2">Transfer Information</Text>
        {selectedBank && (
          <>
            <Text className="ss-text-primary1-500">Bank Account</Text>
            <Text className="ss-text-primary1-500">{selectedBank.name}</Text>
          </>
        )}
        {selectedBankBranch && (
          <Text className="ss-text-primary1-500">{selectedBankBranch.name}</Text>
        )}
        {data.firstName && (
          <Text className="ss-text-primary1-500">
            {data.firstName} {data.lastName}
          </Text>
        )}
        {data.accountNumber && <Text className="ss-text-primary1-500">{data.accountNumber}</Text>}
        {data.routingNumber && (
          <Text className="ss-text-primary1-500">Routing Number - {data.routingNumber}</Text>
        )}
      </Box>
    </Box>
  );
};

export default TransferInfo;
