import { useGetReceiveCountries, useGetSendCountries } from '@src/hooks';

const useGetCountries = () => {
  const {
    data: sendCountries = [],
    isLoading: isSendCountriesLoading,
    error: sendCountriesError
  } = useGetSendCountries();

  const {
    data: receiveCountries = [],
    isLoading: isReceiveCountriesLoading,
    error: receiveCountryError
  } = useGetReceiveCountries();

  const isLoading = isSendCountriesLoading || isReceiveCountriesLoading;
  const error = sendCountriesError || receiveCountryError;

  return { sendCountries, receiveCountries, isLoading, error };
};

export default useGetCountries;
