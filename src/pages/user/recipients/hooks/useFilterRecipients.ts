import { useSearchRecipients, useShowNoResult } from '@src/hooks';
import ClientApi from '@src/types/client';
import { useEffect, useState } from 'react';
import { ResolvedRecipientsBlockI } from '../components/recipientList';
import { handleFormatRecipients } from '../utils';

interface UseFilterRecipientsOptions {
  recipients: ClientApi.Recipient[];
}

const useFilterRecipients = (options: UseFilterRecipientsOptions) => {
  const { recipients } = options;

  const { filteredRecipients, searchValue, handleSearch } = useSearchRecipients({
    recipients
  });

  const [recipientsBlockData, setRecipientsBlockData] = useState<ResolvedRecipientsBlockI[]>([]);

  const { showNoResult } = useShowNoResult({
    data: recipientsBlockData
  });

  const handleblockData = (recipients: ClientApi.Recipient[]) => {
    setRecipientsBlockData(handleFormatRecipients(recipients));
  };

  useEffect(() => {
    if (filteredRecipients) {
      handleblockData(filteredRecipients);
    }
  }, [filteredRecipients]);

  return { recipientsBlockData, searchValue, handleSearch, showNoResult };
};

export default useFilterRecipients;
