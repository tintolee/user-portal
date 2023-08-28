import Api from '@sendsprint/api-types';
import { getRecipientTypeFromMapping, RecipientTypeOptions } from '@src/utils/recipient-type';

export const resolvePaymentType = (options: RecipientTypeOptions) => {
  const recipientType = getRecipientTypeFromMapping(options);
  const { paymentType } = options;

  if (recipientType === 'NG-DOM') return 'Domiciliary USD Account';
  if (recipientType === 'NG-CASH') return 'USD Cash Pickup';
  if (recipientType === 'NG-V-DOM') return '';
  if (recipientType === 'NEW-NG-BANK') return 'Bank Account';
  if (recipientType === 'NG-A-DOM') return 'Virtual Domiciliary USD Account';
  if (recipientType === 'GH-BANK') return 'Bank Account';
  if (recipientType === 'GH-MOBILE') return 'Mobile Money Account';
  if (recipientType === 'KE-BANK') return 'Bank Account';
  if (recipientType === 'KE-MOBILE') return 'Mpesa Mobile Money Account';
  if (recipientType === 'ZA-BANK') return 'Bank Account';

  if (paymentType === Api.Model.PaymentType.GiftCard) return 'Gift';
};
