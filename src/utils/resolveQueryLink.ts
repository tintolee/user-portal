interface ResolveQueryLinkOptions {
  sendAmount: string | null;
  sendCountry: string | null;
  receiveCountry: string | null;
  connectQuery: string | null;
  campaignIdQuery: string | null;
  recipientCurrency: string | null;
  senderCurrency: string | null;
  cartFromQuery: string | null;
  totalAmountFromQuery?: string | null;
  totalAmountPlusFeeFromQuery?: string | null;
  rateFromQuery?: string | null;
}

export const resolveQueryLink = ({
  receiveCountry,
  sendAmount,
  sendCountry,
  campaignIdQuery,
  cartFromQuery,
  connectQuery,
  recipientCurrency,
  senderCurrency,
  rateFromQuery,
  totalAmountFromQuery,
  totalAmountPlusFeeFromQuery
}: ResolveQueryLinkOptions) => {
  const query = [];
  let result = '';

  if (receiveCountry) {
    query.push(`receiveCountry=${receiveCountry}`);
  }

  if (sendAmount) {
    query.push(`sendAmount=${sendAmount}`);
  }

  if (sendCountry) {
    query.push(`sendCountry=${sendCountry}`);
  }

  if (campaignIdQuery) {
    query.push(`c=${campaignIdQuery}`);
  }

  if (cartFromQuery) {
    query.push(`cart=${cartFromQuery}`);
  }

  if (connectQuery) {
    query.push(`connect=${connectQuery}`);
  }

  if (recipientCurrency) {
    query.push(`recipientCurrency=${recipientCurrency}`);
  }

  if (senderCurrency) {
    query.push(`senderCurrency=${senderCurrency}`);
  }

  if (rateFromQuery) {
    query.push(`rate=${rateFromQuery}`);
  }

  if (totalAmountFromQuery) {
    query.push(`totalAmount=${totalAmountFromQuery}`);
  }

  if (totalAmountPlusFeeFromQuery) {
    query.push(`totalAmountPlusFee=${totalAmountPlusFeeFromQuery}`);
  }

  if (query.length) {
    result = `?${query.join('&')}`;
  }

  return result;
};
