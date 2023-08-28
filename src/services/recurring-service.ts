import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import ClientApi from '@src/types/client';
import { AxiosResponse } from 'axios';
import { decorateWithAppIdAndKeyAndEmailAndHash, getApiEndpointResponse } from './api-service';

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const loadUserRecurringTransactionsService = async (
  config?: RequestConfig
): Promise<ClientApi.RecurringTransactionI[]> => {
  const payload = decorateWithAppIdAndKeyAndEmailAndHash({});

  return AxiosConfig.post<
    ClientApi.Recurring.RecurringTransactions.Response,
    AxiosResponse<ClientApi.Recurring.RecurringTransactions.Response>
  >('/account/loaduserrecurringtransactions', payload, config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};

export const loadUserRecurringTransactionByTxrefService = async (
  payload: ClientApi.Recurring.RecurringTransactionsByTxref.Request,
  config?: RequestConfig<ClientApi.Recurring.RecurringTransactionsByTxref.Request>
): Promise<ClientApi.RecurringTransactionByTxref[] | undefined> => {
  if (!payload.txref) return;

  return AxiosConfig.get<
    ClientApi.Recurring.RecurringTransactionsByTxref.Response,
    AxiosResponse<ClientApi.Recurring.RecurringTransactionsByTxref.Response>
  >(`/account/loadrecurringbytxref?txRef=${payload.txref}`, config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};

export const loadUserRecurringIntervalsService = async (
  config?: RequestConfig
): Promise<ClientApi.RecurringIntervalObjI[]> => {
  return AxiosConfig.get<
    ClientApi.Recurring.RecurringIntervals.Response,
    AxiosResponse<ClientApi.Recurring.RecurringIntervals.Response>
  >('/account/loadrecurringintervals', config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};

export const cancelRecurringService = async (
  payload: ClientApi.Recurring.CancelRecurring.Request,
  config?: RequestConfig<ClientApi.Recurring.CancelRecurring.Request>
): Promise<ClientApi.RecurringTransactionI[] | undefined> => {
  if (!payload.txref) return;

  const newPayload = decorateWithAppIdAndKeyAndEmailAndHash({
    TxRef: payload.txref
  });

  return AxiosConfig.post<
    ClientApi.Recurring.CancelRecurring.Response,
    AxiosResponse<ClientApi.Recurring.CancelRecurring.Response>
  >('/account/cancelrecurring', newPayload, config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};

export const activateRecurringService = async (
  payload: ClientApi.Recurring.ActivateRecurring.Request,
  config?: RequestConfig<ClientApi.Recurring.ActivateRecurring.Request>
): Promise<ClientApi.RecurringTransactionI[] | undefined> => {
  if (!payload.txref) return;

  const newPayload = decorateWithAppIdAndKeyAndEmailAndHash({
    TxRef: payload.txref
  });

  return AxiosConfig.post<
    ClientApi.Recurring.ActivateRecurring.Response,
    AxiosResponse<ClientApi.Recurring.ActivateRecurring.Response>
  >('/account/activaterecurring', newPayload, config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};

export const pauseRecurringService = async (
  payload: ClientApi.Recurring.PauseRecurring.Request,
  config?: RequestConfig<ClientApi.Recurring.PauseRecurring.Request>
): Promise<ClientApi.RecurringTransactionI[] | undefined> => {
  if (!payload.txref) return;

  const newPayload = decorateWithAppIdAndKeyAndEmailAndHash({
    TxRef: payload.txref
  });

  return AxiosConfig.post<
    ClientApi.Recurring.PauseRecurring.Response,
    AxiosResponse<ClientApi.Recurring.PauseRecurring.Response>
  >('/account/pauserecurring', newPayload, config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};
