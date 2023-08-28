import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import ClientApi from '@src/types/client';
import { AxiosResponse } from 'axios';
import { getApiEndpointResponse } from './api-service';

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const loadGiftCountriesService = async (
  config?: RequestConfig
): Promise<ClientApi.GiftCountries[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftCountries.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftCountries.Response>
  >(`/gift/loadgiftcountries`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftCategoriesService = async (
  config?: RequestConfig
): Promise<ClientApi.GiftCategories[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftCategories.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftCategories.Response>
  >(`/gift/loadgiftcategorynames`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftCategoriesByCountryService = async (
  payload: ClientApi.Connect.LoadGiftCategoriesByCountry.Request,
  config?: RequestConfig
): Promise<ClientApi.GiftCategories[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftCategoriesByCountry.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftCategoriesByCountry.Response>
  >(`/gift/loadgiftcategorynamesbycountry/${payload.country}`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftMerchantsService = async (
  config?: RequestConfig
): Promise<ClientApi.GiftMerchants[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftMerchants.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftMerchants.Response>
  >('/gift/loadgiftmerchants', config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftMerchantsByCountryService = async (
  payload: ClientApi.Connect.LoadGiftMerchantsByCountry.Request,
  config?: RequestConfig
): Promise<ClientApi.GiftMerchants[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftMerchantsByCountry.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftMerchantsByCountry.Response>
  >(`/gift/loadmerchantsbycountry/${payload.country}`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftMerchantsByCategoryService = async (
  payload: ClientApi.Connect.LoadGiftMerchantsByCategory.Request,
  config?: RequestConfig
): Promise<ClientApi.GiftMerchants[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftMerchantsByCategory.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftMerchantsByCategory.Response>
  >(`/gift/loadmerchantsbycategory/${payload.category}`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftMerchantsByCountryAndCategoryService = async (
  payload: ClientApi.Connect.LoadGiftMerchantsByCountryAndCategory.Request,
  config?: RequestConfig
): Promise<ClientApi.GiftMerchants[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftMerchantsByCountryAndCategory.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftMerchantsByCountryAndCategory.Response>
  >(`/gift/loadmerchantsbycountryandcategory/${payload.country}/${payload.category}`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftCuratedService = async (
  config?: RequestConfig
): Promise<ClientApi.GiftMerchants[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftCurated.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftCurated.Response>
  >(`/gift/loadgiftcurated`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftCuratedByGroupService = async (
  payload: ClientApi.Connect.LoadGiftCuratedByGroup.Request,
  config?: RequestConfig
): Promise<ClientApi.GiftMerchants[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftCuratedByGroup.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftCuratedByGroup.Response>
  >(`/gift/loadgiftcuratedbygroup/${payload.name}`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftPopularService = async (
  config?: RequestConfig
): Promise<ClientApi.GiftMerchants[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftPopular.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftPopular.Response>
  >(`/gift/loadgiftpopular`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const loadGiftBestSellingService = async (
  config?: RequestConfig
): Promise<ClientApi.GiftMerchants[]> => {
  return AxiosConfig.get<
    ClientApi.Connect.LoadGiftBestSelling.Response,
    AxiosResponse<ClientApi.Connect.LoadGiftBestSelling.Response>
  >(`/gift/loadgiftbestselling`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};
