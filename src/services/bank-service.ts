import Api from '@sendsprint/api-types';
import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import ClientApi from '@src/types/client';
import { localeCompare } from '@src/utils/sort';
import { AxiosResponse } from 'axios';
import { decorateWithAppIdAndKeyAndEmailAndHash, getApiEndpointResponse } from './api-service';

const formatBanks = (banks: Api.Model.BankMw[] | Api.Model.Bank[]): ClientApi.Bank[] => {
  return banks
    .map(({ id, code, name }) => ({ id, code, name }))
    .sort((a, b) => localeCompare(a.name, b.name));
};

const formatBankBranches = (bankBranches: Api.Model.BankBranchMw[]): ClientApi.BankBranch[] => {
  return bankBranches
    .map(({ id, code, name }) => ({
      id,
      code,
      name
    }))
    .sort((a, b) => localeCompare(a.name, b.name));
};

const formatResolvedBankAccount = ({
  account_name,
  account_number
}: Api.Model.ResolvedBankAccount): ClientApi.ResolvedBankAccount => {
  return { accountName: account_name, accountNumber: account_number };
};

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const getBanksService = async (
  payload: ClientApi.Banks.GetBanks.Request,
  config?: RequestConfig<ClientApi.Banks.GetBanks.Request>
): Promise<ClientApi.Bank[]> => {
  if (!payload.country) return [];
  return AxiosConfig.get<
    Api.Bank.ListBanksByCountryMw.Response,
    AxiosResponse<Api.Bank.ListBanksByCountryMw.Response>
  >(`/bank/loadmoneywavebanklist/${payload.country}`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatBanks(Data || []));
};

export const getBanksForCashPickupService = async (
  config?: RequestConfig<ClientApi.Banks.GetBanks.Request>
): Promise<ClientApi.Bank[]> => {
  return AxiosConfig.get<
    Api.Bank.ListBanksForCashPickup.Response,
    AxiosResponse<Api.Bank.ListBanksForCashPickup.Response>
  >('/bank/loadcashpickupbanks', config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatBanks(Data || []));
};

export const getBanksForAutoDomService = async (
  config?: RequestConfig<ClientApi.Banks.GetBanks.Request>
): Promise<ClientApi.Bank[]> => {
  return AxiosConfig.get<
    Api.Bank.ListBanksForCashPickup.Response,
    AxiosResponse<Api.Bank.ListBanksForCashPickup.Response>
  >('/bank/loadautodombanks', config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatBanks(Data || []));
};

export const getBankBranchesService = async (
  payload: ClientApi.Banks.GetBankBranches.Request,
  config?: RequestConfig<ClientApi.Banks.GetBankBranches.Request>
): Promise<ClientApi.BankBranch[]> => {
  return AxiosConfig.get<
    Api.Bank.ListBankBranchesByBankCodeMw.Response,
    AxiosResponse<Api.Bank.ListBankBranchesByBankCodeMw.Response>
  >(`/bank/loadmoneywavebankbranches/${payload.country}/${payload.bankCode}`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatBankBranches(Data || []));
};

export const resolveBankAccountService = async (
  payload: ClientApi.Banks.ResolveBankAccount.Request,
  config?: RequestConfig<Api.Bank.ResolveBankAccount.Request>
): Promise<ClientApi.ResolvedBankAccount> => {
  const serializedData: Api.Bank.ResolveBankAccount.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({
      AccountNo: payload.AccountNo,
      BankCode: payload.BankCode
    });

  return AxiosConfig.post<
    Api.Bank.ResolveBankAccount.Response,
    AxiosResponse<Api.Bank.ResolveBankAccount.Response>,
    Api.Bank.ResolveBankAccount.Request
  >('/bank/bankaccountresolve', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatResolvedBankAccount(Data || {}));
};

export const getModulrBanksService = async (
  config?: RequestConfig<ClientApi.Banks.GetBanks.Request>
): Promise<ClientApi.Banks.GetModulrBanks.ModulrBankI[]> => {
  return AxiosConfig.get<
    ClientApi.Banks.GetModulrBanks.Response,
    AxiosResponse<ClientApi.Banks.GetModulrBanks.Response>
  >(`/bank/loadmodulrbanks`, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};
