import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
  loadGiftBestSellingService,
  loadGiftCategoriesByCountryService,
  loadGiftCategoriesService,
  loadGiftCountriesService,
  loadGiftCuratedByGroupService,
  loadGiftCuratedService,
  loadGiftMerchantsByCategoryService,
  loadGiftMerchantsByCountryAndCategoryService,
  loadGiftMerchantsByCountryService,
  loadGiftMerchantsService,
  loadGiftPopularService
} from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { CONFIG_NO_ERROR_TOAST, DURATION_1_HR } from '@src/constants';
import { useAccount } from '@src/contexts';

export const useLoadGiftCountries = (
  options?: UseQueryOptions<
    ClientApi.GiftCountries[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftCountries[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadGiftCountries'],
    queryFn: () => loadGiftCountriesService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftCategories = (
  options?: UseQueryOptions<
    ClientApi.GiftCategories[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftCategories[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadGiftCategories'],
    queryFn: () => loadGiftCategoriesService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftCategoriesByCountry = (
  payload: ClientApi.Connect.LoadGiftCategoriesByCountry.Request,
  options?: UseQueryOptions<
    ClientApi.GiftCategories[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftCategories[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadGiftCategoriesByCountry', payload.country],
    queryFn: () => loadGiftCategoriesByCountryService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftMerchants = (
  options?: UseQueryOptions<
    ClientApi.GiftMerchants[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftMerchants[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadgiftmerchants'],
    queryFn: () => loadGiftMerchantsService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftMerchantsByCountry = (
  payload: ClientApi.Connect.LoadGiftMerchantsByCountry.Request,
  options?: UseQueryOptions<
    ClientApi.GiftMerchants[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftMerchants[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadmerchantsbycountry'],
    queryFn: () => loadGiftMerchantsByCountryService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftMerchantsByCategory = (
  payload: ClientApi.Connect.LoadGiftMerchantsByCategory.Request,
  options?: UseQueryOptions<
    ClientApi.GiftMerchants[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftMerchants[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadmerchantsbycategory'],
    queryFn: () => loadGiftMerchantsByCategoryService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftMerchantsByCountryAndCategory = (
  payload: ClientApi.Connect.LoadGiftMerchantsByCountryAndCategory.Request,
  options?: UseQueryOptions<
    ClientApi.GiftMerchants[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftMerchants[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadmerchantsbycountryandcategory'],
    queryFn: () => loadGiftMerchantsByCountryAndCategoryService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftCurated = (
  options?: UseQueryOptions<
    ClientApi.GiftMerchants[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftMerchants[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadgiftcurated'],
    queryFn: () => loadGiftCuratedService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftCuratedByGroup = (
  payload: ClientApi.Connect.LoadGiftCuratedByGroup.Request,
  options?: UseQueryOptions<
    ClientApi.GiftMerchants[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftMerchants[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadgiftcuratedbygroup'],
    queryFn: () => loadGiftCuratedByGroupService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftPopular = (
  options?: UseQueryOptions<
    ClientApi.GiftMerchants[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftMerchants[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadgiftpopular'],
    queryFn: () => loadGiftPopularService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};

export const useLoadGiftBestSelling = (
  options?: UseQueryOptions<
    ClientApi.GiftMerchants[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.GiftMerchants[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['connect', 'loadgiftbestselling'],
    queryFn: () => loadGiftBestSellingService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    enabled: isLoggedIn,
    ...options
  });
};
