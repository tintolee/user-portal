import Api from '@sendsprint/api-types';
import { useCheckRateSprint, useGetPaymentTypesByCountry } from '@src/hooks';
import ClientApi from '@src/types/client';

interface UseRatesAndPaymentTypesOptions {
  sendCurrency: string;
  receiveCurrency: string;
  sendAmount: number;
  receiveCountry: Api.Model.CountryInitials;
}

export interface UseRatesAndPaymentTypesReturnObj {
  rateOnlyData: ClientApi.RateType | undefined;
  rateData: ClientApi.RateType | undefined;
  isRateLoaded: boolean;
  paymentTypesByCountry: ClientApi.PaymentTypeInfo[] | undefined;
  isPaymentTypesLoaded: boolean;
  isPaymentTypesLoading: boolean;
  rateDataLoading: boolean;
}

const useRatesAndPaymentTypes = (
  options: UseRatesAndPaymentTypesOptions
): UseRatesAndPaymentTypesReturnObj => {
  const { receiveCurrency, sendCurrency, sendAmount, receiveCountry } = options;

  /** rate data used for the RateInfoBlock component, the value for fee is less accurate but doesn't matter as we only need the conversion rate here  */
  const { data: rateOnlyData } = useCheckRateSprint({
    sendCurrency,
    receiveCurrency
  });

  /** actual rate data that's saved to the form, it also uses sendAmount for an accurate fee */
  const {
    data: rateData,
    isSuccess: isRateLoaded,
    isLoading: rateDataLoading
  } = useCheckRateSprint({
    sendCurrency,
    receiveCurrency,
    amount: sendAmount
  });

  const {
    data: paymentTypesByCountry,
    isLoading: isPaymentTypesLoading,
    isSuccess: isPaymentTypesLoaded
  } = useGetPaymentTypesByCountry({
    country: receiveCountry
  });

  return {
    rateOnlyData,
    rateData,
    isRateLoaded,
    paymentTypesByCountry,
    isPaymentTypesLoaded,
    isPaymentTypesLoading,
    rateDataLoading
  };
};

export default useRatesAndPaymentTypes;
