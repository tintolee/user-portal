import ClientApi from '@src/types/client';
import { getRecipientTypeFromMapping } from '@src/utils/recipient-type';

export const handleResolvePaymentType = (
  data: ClientApi.Recipient,
  setResolvedPaymentType: React.Dispatch<
    React.SetStateAction<ClientApi.RecipientType | null | undefined>
  >
) => {
  const type = getRecipientTypeFromMapping({
    country: data.country,
    paymentType: data.paymentType
  });

  if (type) {
    setResolvedPaymentType(type);
  }
};
