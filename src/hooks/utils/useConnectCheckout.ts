import { CAMPAIGN_ID_QUERY_KEY, CAMPAIGN_ID_STORE_NAME } from '@src/constants';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useConnectCheckout = () => {
  const [searchParams] = useSearchParams();
  const connectQuery = searchParams.get('connect');
  const campaignIdQuery = searchParams.get(CAMPAIGN_ID_QUERY_KEY);
  const recipientCurrency = searchParams.get('recipientCurrency');
  const senderCurrency = searchParams.get('senderCurrency');
  const cartFromQuery = searchParams.get('cart');

  useEffect(() => {
    if (campaignIdQuery) {
      localStorage.setItem(CAMPAIGN_ID_STORE_NAME, campaignIdQuery as string);
    }
  }, [campaignIdQuery]);

  return { connectQuery, recipientCurrency, senderCurrency, cartFromQuery };
};

export default useConnectCheckout;
