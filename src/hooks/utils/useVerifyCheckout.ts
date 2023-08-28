import { CAMPAIGN_ID_QUERY_KEY, CAMPAIGN_ID_STORE_NAME, CHECKOUT_QUERY } from '@src/constants';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useVerifyCheckout = () => {
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  const [searchParams] = useSearchParams();
  const checkoutQuery = searchParams.get(CHECKOUT_QUERY);
  const campaignIdQuery = searchParams.get(CAMPAIGN_ID_QUERY_KEY);

  useEffect(() => {
    if (checkoutQuery === 'true') {
      setIsCheckoutPage(true);
    } else {
      setIsCheckoutPage(false);
    }
  }, [checkoutQuery]);

  useEffect(() => {
    if (campaignIdQuery) {
      localStorage.setItem(CAMPAIGN_ID_STORE_NAME, campaignIdQuery as string);
    }
  }, [campaignIdQuery]);

  return { isCheckoutPage };
};

export default useVerifyCheckout;
