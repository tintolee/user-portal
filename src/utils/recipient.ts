import ClientApi from '@src/types/client';

export const handleSortRecipients = (recipients: ClientApi.Recipient[]) => {
  return recipients.sort((a, b) =>
    a.firstName.toLowerCase() < b.firstName.toLowerCase()
      ? -1
      : a.firstName.toLowerCase() > b.firstName.toLowerCase()
      ? 1
      : 0
  );
};
