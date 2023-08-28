import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
  changePinService,
  checkIfPinExistsService,
  createPinService,
  createTransactionService,
  getTransactionsByTxrefService,
  getTransactionsService,
  getTransactionsTimestampService,
  loadVoucherService,
  nethoneCheckByTxrefService,
  resetPinService
} from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { CONFIG_NO_ERROR_TOAST, DURATION_1_HR } from '@src/constants';
import { useAccount } from '@src/contexts';

export const useCreateTransactionMutation = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.TransactionRefInfo,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Transactions.CreateTransaction.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.TransactionRefInfo,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Transactions.CreateTransaction.Request
  >('createTransaction', createTransactionService, options);
};

export const useGetTransactions = (
  options?: UseQueryOptions<
    ClientApi.Transaction[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.Transaction[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getTransactions', isLoggedIn],
    queryFn: () => getTransactionsService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useGetTransactionByTxref = (
  payload: ClientApi.Transactions.GetTransactionByTxref.Request,
  options?: UseQueryOptions<
    null | ClientApi.Transaction,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<null | ClientApi.Transaction, AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getTransactionByTxref', payload.txref, isLoggedIn],
    queryFn: () => getTransactionsByTxrefService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useGetTransactionTimestamp = (
  payload: ClientApi.Transactions.GetTransactionByTxref.Request,
  options?: UseQueryOptions<
    null | ClientApi.TransactionTimestamp,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<
    null | ClientApi.TransactionTimestamp,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['getTransactionTimestamp', payload.txref, isLoggedIn],
    queryFn: () => getTransactionsTimestampService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useLoadVoucher = (
  payload: ClientApi.Transactions.LoadVoucher.Request,
  options?: UseQueryOptions<any, AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  return useQuery<any, AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['loadVoucher', payload.voucher],
    queryFn: () => loadVoucherService(payload, CONFIG_NO_ERROR_TOAST),
    // staleTime: DURATION_1_HR,
    ...options
  });
};

export const useNethoneCheckMutation = (
  options?: Omit<
    UseMutationOptions<
      any,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Transactions.NethoneCheckByTxref.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    any,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Transactions.NethoneCheckByTxref.Request
  >('nethoneCheckMutation', nethoneCheckByTxrefService, options);
};

export const useCheckIfPinExists = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.Transactions.CheckIfPinExists.Response,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      any
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.Transactions.CheckIfPinExists.Response,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    any
  >('checkIfPinExists', checkIfPinExistsService, options);
};

export const useCheckIfPinExistsQuery = (
  options?: UseQueryOptions<
    ClientApi.Transactions.CheckIfPinExists.Response,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<
    ClientApi.Transactions.CheckIfPinExists.Response,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['checkIfPinExistsQuery', isLoggedIn],
    queryFn: () => checkIfPinExistsService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useCreatePin = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.Transactions.CreatePin.Response,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Transactions.CreatePin.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.Transactions.CreatePin.Response,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Transactions.CreatePin.Request
  >('createPin', createPinService, options);
};

export const useChangePin = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.Transactions.ChangePin.Response['Data'],
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Transactions.ChangePin.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.Transactions.ChangePin.Response['Data'],
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Transactions.ChangePin.Request
  >('changePin', changePinService, options);
};

export const useResetPin = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.Transactions.ResetPin.Response['Data'],
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Transactions.ResetPin.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.Transactions.ResetPin.Response['Data'],
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Transactions.ResetPin.Request
  >('resetPin', resetPinService, options);
};
