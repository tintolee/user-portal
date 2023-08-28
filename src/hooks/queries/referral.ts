import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { loadReferralCountService } from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { CONFIG_NO_ERROR_TOAST, DURATION_1_HR } from '@src/constants';

export const useLoadReferralCount = (
  payload: ClientApi.Referral.LoadReferralCount.Request,
  options?: UseQueryOptions<
    ClientApi.Referral.LoadReferralCount.ReferralI[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<
    ClientApi.Referral.LoadReferralCount.ReferralI[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['loadReferralCount'],
    queryFn: () => loadReferralCountService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};
