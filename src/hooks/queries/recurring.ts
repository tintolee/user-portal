import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
  activateRecurringService,
  cancelRecurringService,
  loadUserRecurringIntervalsService,
  loadUserRecurringTransactionByTxrefService,
  loadUserRecurringTransactionsService,
  pauseRecurringService
} from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { CONFIG_NO_ERROR_TOAST, DURATION_1_HR } from '@src/constants';

export const useLoadUserRecurringTransactions = (
  options?: UseQueryOptions<
    ClientApi.RecurringTransactionI[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<
    ClientApi.RecurringTransactionI[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['loadUserRecurringTransactions'],
    queryFn: () => loadUserRecurringTransactionsService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useLoadUserRecurringTransactionByTxref = (
  payload: ClientApi.Recurring.RecurringTransactionsByTxref.Request,
  options?: UseQueryOptions<
    ClientApi.RecurringTransactionByTxref[] | undefined,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<
    ClientApi.RecurringTransactionByTxref[] | undefined,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['loadUserRecurringTransactionByTxref', payload.txref],
    queryFn: () => loadUserRecurringTransactionByTxrefService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useLoadUserRecurringIntervals = (
  options?: UseQueryOptions<
    ClientApi.RecurringIntervalObjI[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<
    ClientApi.RecurringIntervalObjI[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['loadUserRecurringIntervals'],
    queryFn: () => loadUserRecurringIntervalsService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useCancelRecurring = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.RecurringTransactionI[] | undefined,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Recurring.CancelRecurring.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.RecurringTransactionI[] | undefined,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Recurring.CancelRecurring.Request
  >('cancelTransaction', cancelRecurringService, options);
};

export const useActivateRecurring = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.RecurringTransactionI[] | undefined,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Recurring.ActivateRecurring.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.RecurringTransactionI[] | undefined,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Recurring.ActivateRecurring.Request
  >('activateTransaction', activateRecurringService, options);
};

export const usePauseRecurring = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.RecurringTransactionI[] | undefined,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Recurring.PauseRecurring.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.RecurringTransactionI[] | undefined,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Recurring.PauseRecurring.Request
  >('pauseTransaction', pauseRecurringService, options);
};
