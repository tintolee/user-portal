import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
  getBankBranchesService,
  getBanksForAutoDomService,
  getBanksForCashPickupService,
  getBanksService,
  getModulrBanksService,
  resolveBankAccountService
} from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { CONFIG_NO_ERROR_TOAST, DURATION_10_MIN } from '@src/constants';

export const useGetBanks = (
  payload: ClientApi.Banks.GetBanks.Request,
  options?: UseQueryOptions<ClientApi.Bank[], AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  return useQuery<ClientApi.Bank[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getBanks', payload.country],
    queryFn: () => getBanksService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_10_MIN,
    ...options
  });
};

type OptionsTypes = 'bank' | 'mobile';

interface UseGetBanksGhOptionsI {
  type: OptionsTypes;
  options: ClientApi.Banks.GetBanks.Request;
}

export const useGetBanksGh = (
  payload: UseGetBanksGhOptionsI,
  options?: UseQueryOptions<ClientApi.Bank[], AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  const { type = 'bank' } = payload;

  const GH_MOBILE_OPERATOR_CODES = [
    'AIR', // Airtel Mobile Money
    'MTN', // MTN Mobile Money
    'TIG', // TIGO Mobile Money
    'VDF' // Vodafone Mobile Money
  ];

  const query = useGetBanks(payload.options, options);

  if (query.data) {
    query.data = query.data.filter((bank) => {
      const isMobileOperator = GH_MOBILE_OPERATOR_CODES.includes(bank.code);
      if (type === 'bank') {
        return !isMobileOperator;
      }
      return isMobileOperator;
    });
  }

  return query;
};

export const useGetBanksForCashPickup = (
  options?: UseQueryOptions<ClientApi.Bank[], AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  return useQuery<ClientApi.Bank[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getBanksForCashPickup'],
    queryFn: () => getBanksForCashPickupService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_10_MIN,
    ...options
  });
};

export const useGetBanksForAutoDom = (
  options?: UseQueryOptions<ClientApi.Bank[], AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  return useQuery<ClientApi.Bank[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getBanksForAutoDom'],
    queryFn: () => getBanksForAutoDomService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_10_MIN,
    ...options
  });
};

export const useGetBankBranches = (
  payload: ClientApi.Banks.GetBankBranches.Request,
  options?: UseQueryOptions<ClientApi.BankBranch[], AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  return useQuery<ClientApi.BankBranch[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getBankBranches', payload.country, payload.bankCode],
    queryFn: () => getBankBranchesService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_10_MIN,
    ...options
  });
};

export const useResolveBankAccount = (
  payload: ClientApi.Banks.ResolveBankAccount.Request,
  options?: UseQueryOptions<
    ClientApi.ResolvedBankAccount,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<ClientApi.ResolvedBankAccount, AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['resolveBankAccount', payload.AccountNo, payload.BankCode],
    queryFn: () => resolveBankAccountService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_10_MIN,
    retry: false,
    ...options
  });
};

export const useGetModulrBanks = (
  options?: UseQueryOptions<
    ClientApi.Banks.GetModulrBanks.ModulrBankI[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<
    ClientApi.Banks.GetModulrBanks.ModulrBankI[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['getModulrBanks'],
    queryFn: () => getModulrBanksService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_10_MIN,
    ...options
  });
};
