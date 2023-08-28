import Api from '@sendsprint/api-types';
import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import ClientApi from '@src/types/client';
import { isNumber } from '@src/utils/type';
import { AxiosResponse } from 'axios';
import { getApiEndpointResponse } from './api-service';

const formatRateData = (data: Api.Model.RateType): ClientApi.RateType => {
  return {
    rate: data.Rate,
    fee: data.Fee,
    amount: data.Amount
  };
};

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const getCheckRateSprint = async (
  payload: ClientApi.Rate.CheckRateSprint.Request,
  config?: RequestConfig<ClientApi.Rate.CheckRateSprint.Request>
): Promise<ClientApi.RateType | undefined> => {
  if (!payload.receiveCurrency || !payload.sendCurrency) return;

  const serializedParams: Api.Rate.CheckRateSprint.Request = {
    From: payload.sendCurrency,
    To: payload.receiveCurrency,
    Amount: isNumber(payload.amount) ? payload.amount : 1
  };

  return AxiosConfig.get<
    Api.Rate.CheckRateSprint.Response,
    AxiosResponse<Api.Rate.CheckRateSprint.Response>
  >('/rates/checkratesprint', {
    ...config,
    params: serializedParams
  })
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatRateData(Data || []));
};
