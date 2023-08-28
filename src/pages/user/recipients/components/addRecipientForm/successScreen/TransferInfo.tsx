import { Box, Icon, Text } from '@sendsprint/ui-react';
import { CreditCardOutline } from '@sendsprint/ui-react/dist/icons';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import { AddRecipientFormI } from '..';

interface Props {
  resolvedBanks: ClientApi.Bank[];
  values: AddRecipientFormI;
  bankBranches: ClientApi.BankBranch[];
}

const TransferInfo = ({ values, resolvedBanks, bankBranches }: Props) => {
  const [selectedBank, setSelectedBank] = useState<ClientApi.Bank>();
  const [selectedBankBranch, setSelectedBankBranch] = useState<ClientApi.BankBranch>();

  useEffect(() => {
    if (values.bankCode && resolvedBanks) {
      const filteredBank = resolvedBanks.find((bank) => bank.code === values.bankCode);

      if (filteredBank) {
        setSelectedBank(filteredBank);
      } else {
        setSelectedBank(undefined);
      }
    }
  }, [resolvedBanks, values]);

  useEffect(() => {
    if (values.branchCode && bankBranches) {
      const filteredBankBranch = bankBranches.find((bank) => bank.code === values.branchCode);

      if (filteredBankBranch) {
        setSelectedBankBranch(filteredBankBranch);
      } else {
        setSelectedBankBranch(undefined);
      }
    }
  }, [bankBranches, values]);

  if (!values.bankCode) return null;

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
        {values.accountName && <Text className="ss-text-primary1-500">{values.accountName}</Text>}
        {values.accountNumber && (
          <Text className="ss-text-primary1-500">{values.accountNumber}</Text>
        )}
        {values.routingNumber && (
          <Text className="ss-text-primary1-500">Routing Number - {values.routingNumber}</Text>
        )}
      </Box>
    </Box>
  );
};

export default TransferInfo;
