import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';

interface UseSearchRecipientsOptions {
  recipients: ClientApi.Recipient[];
}

const useSearchRecipients = ({ recipients }: UseSearchRecipientsOptions) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedRecipients, setSearchedRecipients] = useState<ClientApi.Recipient[]>([]);
  const [filteredRecipients, setFilteredRecipients] = useState<ClientApi.Recipient[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  useEffect(() => {
    if (recipients) {
      setSearchedRecipients(recipients);
    }
  }, [recipients]);

  useEffect(() => {
    if (searchValue) {
      const filtered = searchedRecipients.filter((recipient) => {
        if (recipient.firstName.toLowerCase().includes(searchValue.toLowerCase())) return recipient;
        if (recipient.lastName.toLowerCase().includes(searchValue.toLowerCase())) return recipient;
      });

      if (filtered) {
        setFilteredRecipients(filtered);
      }
    } else {
      setFilteredRecipients(searchedRecipients);
    }
  }, [searchValue, searchedRecipients]);

  return { filteredRecipients, searchValue, searchedRecipients, handleSearch };
};

export default useSearchRecipients;
