import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { getReceiveCountriesService, getSendCountriesService } from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { CONFIG_NO_ERROR_TOAST, DURATION_1_HR } from '@src/constants';

export const useGetSendCountries = (
  options?: UseQueryOptions<
    ClientApi.SendCountry[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<ClientApi.SendCountry[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['location', 'getSendCountries'],
    queryFn: () => getSendCountriesService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useGetReceiveCountries = (
  options?: UseQueryOptions<
    ClientApi.ReceiveCountry[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<ClientApi.ReceiveCountry[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['location', 'getReceiveCountries'],
    queryFn: () => getReceiveCountriesService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};
