import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import ClientApi from '@src/types/client';
import { AxiosResponse } from 'axios';
import { getApiEndpointResponse } from './api-service';

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const loadReferralCountService = async (
  payload: ClientApi.Referral.LoadReferralCount.Request,
  config?: RequestConfig
): Promise<ClientApi.Referral.LoadReferralCount.ReferralI[]> => {
  return AxiosConfig.get<
    ClientApi.Referral.LoadReferralCount.Response,
    AxiosResponse<ClientApi.Referral.LoadReferralCount.Response>
  >(`/account/loadreferralcount?email=${payload.email}`, config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};
