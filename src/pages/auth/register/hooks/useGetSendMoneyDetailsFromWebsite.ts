import { CAMPAIGN_ID_QUERY_KEY, CAMPAIGN_ID_STORE_NAME } from '@src/constants';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface UseGetSendMoneyDetailsFromWebsiteResponse {
  sendAmount: string | null;
  sendCountry: string | null;
  receiveCountry: string | null;
  connectQuery: string | null;
  campaignIdQuery: string | null;
  recipientCurrency: string | null;
  senderCurrency: string | null;
  cartFromQuery: string | null;
  rateFromQuery: string | null;
  totalAmountFromQuery: string | null;
  totalAmountPlusFeeFromQuery: string | null;
  isCheckoutPage: boolean;
}

const useGetSendMoneyDetailsFromWebsite = (): UseGetSendMoneyDetailsFromWebsiteResponse => {
  const [searchParams] = useSearchParams();

  // send money queries
  const sendCountry = searchParams.get('sendCountry');
  const sendAmount = searchParams.get('sendAmount');
  const receiveCountry = searchParams.get('receiveCountry');

  // connect queries
  const connectQuery = searchParams.get('connect');
  const recipientCurrency = searchParams.get('recipientCurrency');
  const senderCurrency = searchParams.get('senderCurrency');
  const cartFromQuery = searchParams.get('cart');
  const rateFromQuery = searchParams.get('rate');
  const totalAmountFromQuery = searchParams.get('totalAmount');
  const totalAmountPlusFeeFromQuery = searchParams.get('totalAmountPlusFee');

  // campaign queries
  const campaignIdQuery = searchParams.get(CAMPAIGN_ID_QUERY_KEY);

  useEffect(() => {
    if (campaignIdQuery) {
      localStorage.setItem(CAMPAIGN_ID_STORE_NAME, campaignIdQuery as string);
    }
  }, [campaignIdQuery]);

  const isCheckoutPage = !!connectQuery;

  return {
    sendAmount,
    sendCountry,
    receiveCountry,
    connectQuery,
    campaignIdQuery,
    recipientCurrency,
    senderCurrency,
    cartFromQuery,
    rateFromQuery,
    totalAmountFromQuery,
    totalAmountPlusFeeFromQuery,
    isCheckoutPage
  };
};

export default useGetSendMoneyDetailsFromWebsite;
