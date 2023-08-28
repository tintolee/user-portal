import Api from '@sendsprint/api-types';
import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import ClientApi from '@src/types/client';
import { AxiosResponse } from 'axios';
import { getApiEndpointResponse } from './api-service';

const formatCountriesData = (
  countries: Api.Model.SendCountry[] | Api.Model.ReceiveCountry[]
): (ClientApi.SendCountry | ClientApi.ReceiveCountry)[] => {
  return countries.map((c) => ({
    id: c.Id,
    name: c.Name,
    telCode: `+${c.Code}`,
    initials: c.Initials,
    currency: c.Currency
  }));
};

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const getSendCountriesService = async (
  config?: RequestConfig
): Promise<ClientApi.SendCountry[]> => {
  return AxiosConfig.get<
    Api.Location.ListSendCountries.Response,
    AxiosResponse<Api.Location.ListSendCountries.Response>
  >('/location/loadsendcountries', config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatCountriesData(Data || []));
};

export const getReceiveCountriesService = async (
  config?: RequestConfig
): Promise<ClientApi.ReceiveCountry[]> => {
  return AxiosConfig.get<
    Api.Location.ListReceiveCountries.Response,
    AxiosResponse<Api.Location.ListReceiveCountries.Response>
  >('/location/loadreceivecountries', config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatCountriesData(Data || []));
};
