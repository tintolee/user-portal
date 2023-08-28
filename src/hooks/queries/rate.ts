import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { getCheckRateSprint } from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { CONFIG_NO_ERROR_TOAST, DURATION_1_HR } from '@src/constants';

export const useCheckRateSprint = (
  payload: ClientApi.Rate.CheckRateSprint.Request,
  options?: UseQueryOptions<
    ClientApi.RateType | undefined,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<ClientApi.RateType | undefined, AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getCheckRateSprint', payload.amount, payload.receiveCurrency, payload.sendCurrency],
    queryFn: () => getCheckRateSprint(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};
