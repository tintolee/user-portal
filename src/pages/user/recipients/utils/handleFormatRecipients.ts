import ClientApi from '@src/types/client';
import { handleSortRecipients } from '@src/utils';
import { ResolvedRecipientsBlockI } from '../components/recipientList';

export const handleFormatRecipients = (recipients: ClientApi.Recipient[]) => {
  const sortedRecipients = handleSortRecipients(recipients);

  const arr: ResolvedRecipientsBlockI[] = [];

  for (const recipient of sortedRecipients) {
    const indexOfAlphabet = recipient?.firstName
      ? arr.findIndex(
          (item) => item?.title?.toLowerCase() === recipient?.firstName[0]?.toLowerCase()
        )
      : -1;
    if (indexOfAlphabet > -1) {
      arr[indexOfAlphabet].recipients.push(recipient);
    } else {
      arr.push({
        title: recipient.firstName[0]?.toUpperCase(),
        recipients: [recipient]
      });
    }
  }

  return arr;
};
