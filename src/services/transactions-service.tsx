import Api from '@sendsprint/api-types';
import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import ClientApi from '@src/types/client';
import { getDateTimeWithTimezone } from '@src/utils/date';
import { dateDesc } from '@src/utils/sort';
import { AxiosResponse } from 'axios';
import { decorateWithAppIdAndKeyAndEmailAndHash, getApiEndpointResponse } from './api-service';

const formatTransactionInfo = ({
  TxRef: txRef,
  Amount: amount,
  payment_plan,
  URL
}: ClientApi.ExtendedTransactionRefInfo): ClientApi.TransactionRefInfo => {
  return { txRef, amount, payment_plan, URL };
};

const formatTransaction = (t: Api.Model.Transaction): ClientApi.Transaction => {
  const createdDateISO = getDateTimeWithTimezone(t.DateCreated);
  const updatedDateISO = getDateTimeWithTimezone(t.DateUpdated);

  return {
    id: t.Id,
    txRef: t.TxRef,
    sendAmount: t.ChargedAmount - t.Fee,
    receiveAmount: t.Amount,
    rate: t.Rate,
    fee: t.Fee,
    sendCurrency: t.SourceCurrency,
    receiveCurrency: t.TargetCurrency,
    securityQuestion: t.SecurityQuestion,
    securityAnswer: t.SecurityAnswer,
    status: t.Status,
    createdDate: new Date(createdDateISO),
    createdDateISO: createdDateISO,
    updatedDate: new Date(updatedDateISO),
    updatedDateISO: updatedDateISO,
    recipientId: t.RecipientId,
    ownerId: t.OwnerId,
    recipientName: t.RecipientName
    // paymentType: t.PaymentType
  };
};

const formatTransactions = (data: Api.Model.Transaction[]): ClientApi.Transaction[] => {
  return data.map(formatTransaction).sort((a, b) => dateDesc(a.createdDate, b.createdDate));
};

const getDateTimeWithTimezoneOrNull = (
  dateTimeMaybe: Api.Model.DateTime | null | undefined
): null | string => {
  if (dateTimeMaybe) {
    return getDateTimeWithTimezone(dateTimeMaybe);
  }
  return null;
};

const formatTransactionTimestamp = (
  data: Api.Model.TransactionTimestamp
): ClientApi.TransactionTimestamp => {
  return {
    createdDateISO: getDateTimeWithTimezone(data.DateCreated),

    failedChargeDateISO: getDateTimeWithTimezoneOrNull(data.DateFailedCharge),
    chargedDateISO: getDateTimeWithTimezoneOrNull(data.DateCharged),

    disbursedDateISO: getDateTimeWithTimezoneOrNull(data.DateDisbursed),
    failedDisburseISO: getDateTimeWithTimezoneOrNull(data.DateFailedDisburse),
    completedDateISO: getDateTimeWithTimezoneOrNull(data.DateCompleted),

    chargebackDateISO: getDateTimeWithTimezoneOrNull(data.DateChargeback),
    reversedDateISO: getDateTimeWithTimezoneOrNull(data.DateReversed)
  };
};

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const createTransactionService = async (
  payload: ClientApi.Transactions.CreateTransaction.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<ClientApi.Transactions.CreateTransaction.Request>
): Promise<ClientApi.TransactionRefInfo> => {
  const recurringPayload = {
    name: payload.transferScheduleData?.name,
    interval: payload.transferScheduleData?.interval,
    currency: payload.sendCurrency,
    duration: payload.transferScheduleData?.duration
  };

  const serializedData: Api.Transaction.CreateTransaction.Request =
    payload.transferScheduleData?.transferType === 'recurring'
      ? decorateWithAppIdAndKeyAndEmailAndHash({
          RecipientId: `${payload.recipientId}`,
          Amount: `${payload.amount}`,
          SourceCurrency: payload.sendCurrency,
          TargetCurrency: payload.receiveCurrency,
          SecurityQuestion: payload.securityQuestion,
          SecurityAnswer: payload.securityAnswer,
          RecurringRequest: recurringPayload,
          GiftRequest: payload.gift,
          ChargeRoute: payload.chargeRoute,
          WireFXRequest: payload.wireFxRequest,
          PIN: payload.PIN,
          ModulrBank: payload.ModulrBank,
          Voucher: payload.Voucher
        })
      : decorateWithAppIdAndKeyAndEmailAndHash({
          RecipientId: `${payload.recipientId}`,
          Amount: `${payload.amount}`,
          SourceCurrency: payload.sendCurrency,
          TargetCurrency: payload.receiveCurrency,
          SecurityQuestion: payload.securityQuestion,
          SecurityAnswer: payload.securityAnswer,
          GiftRequest: payload.gift,
          ChargeRoute: payload.chargeRoute,
          WireFXRequest: payload.wireFxRequest,
          PIN: payload.PIN,
          ModulrBank: payload.ModulrBank,
          Voucher: payload.Voucher
        });

  return AxiosConfig.post<
    Api.Transaction.CreateTransaction.Response,
    AxiosResponse<Api.Transaction.CreateTransaction.Response>
  >('/account/inserttransaction', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatTransactionInfo(Data));
};

export const getTransactionsService = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig
): Promise<ClientApi.Transaction[]> => {
  const serializedData: Api.Transaction.ListTransactions.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({});

  return AxiosConfig.post<
    Api.Transaction.ListTransactions.Response,
    AxiosResponse<Api.Transaction.ListTransactions.Response>
  >('/account/loadusertransactions', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatTransactions(Data || []));
};

export const getTransactionsByTxrefService = async (
  payload: ClientApi.Transactions.GetTransactionByTxref.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<ClientApi.Transactions.GetTransactionByTxref.Request>
): Promise<null | ClientApi.Transaction> => {
  const serializedData: Api.Transaction.FindTransactionByRef.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({ TxRef: payload.txref });

  return AxiosConfig.post<
    Api.Transaction.FindTransactionByRef.Response,
    AxiosResponse<Api.Transaction.FindTransactionByRef.Response>
  >('/account/loadtransactionbytxref', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data: data }) => data && formatTransaction(data[0]));
};

export const getTransactionsTimestampService = async (
  payload: ClientApi.Transactions.GetTransactionTimestamp.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<ClientApi.Transactions.GetTransactionTimestamp.Request>
): Promise<null | ClientApi.TransactionTimestamp> => {
  const serializedData: Api.Transaction.FindTimestampByRef.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({ TxRef: payload.txref });

  return AxiosConfig.post<
    Api.Transaction.FindTimestampByRef.Response,
    AxiosResponse<Api.Transaction.FindTimestampByRef.Response>
  >('/account/loadtransactiontimestamp', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data: data }) => data && formatTransactionTimestamp(data[0]));
};

export const loadVoucherService = async (
  payload: ClientApi.Transactions.LoadVoucher.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<ClientApi.Transactions.GetTransactionTimestamp.Request>
): Promise<any> => {
  if (!payload.voucher) return null;

  return AxiosConfig.get(`/account/loadvoucher/${payload.voucher}`, config).then(
    getApiEndpointResponse
  );
};

export const nethoneCheckByTxrefService = async (
  payload: ClientApi.Transactions.NethoneCheckByTxref.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<ClientApi.Transactions.NethoneCheckByTxref.Request>
): Promise<any> => {
  const serializedData = decorateWithAppIdAndKeyAndEmailAndHash({
    TxRef: payload.txref
  });

  return AxiosConfig.post<any, AxiosResponse<any>>(
    '/account/nethonecheckbytxref',
    serializedData,
    config
  ).then(getApiEndpointResponse);
};

export const checkIfPinExistsService = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig
): Promise<ClientApi.Transactions.CheckIfPinExists.Response> => {
  const serializedData = decorateWithAppIdAndKeyAndEmailAndHash({});

  return AxiosConfig.post<
    ClientApi.Transactions.CheckIfPinExists.Response,
    AxiosResponse<ClientApi.Transactions.CheckIfPinExists.Response>
  >('/account/checkifpinexists', serializedData, config).then(getApiEndpointResponse);
};

export const createPinService = async (
  payload: ClientApi.Transactions.CreatePin.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig
): Promise<ClientApi.Transactions.CreatePin.Response> => {
  const serializedData = decorateWithAppIdAndKeyAndEmailAndHash({
    PIN: payload.PIN
  });

  return AxiosConfig.post<
    ClientApi.Transactions.CreatePin.Response,
    AxiosResponse<ClientApi.Transactions.CreatePin.Response>
  >('/account/createpin', serializedData, config).then(getApiEndpointResponse);
};

export const changePinService = async (
  payload: ClientApi.Transactions.ChangePin.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig
): Promise<ClientApi.Transactions.ChangePin.Response['Data']> => {
  const serializedData = decorateWithAppIdAndKeyAndEmailAndHash({
    OldPIN: payload.OldPIN,
    NewPIN: payload.NewPIN,
    Password: payload.Password
  });

  return AxiosConfig.post<
    ClientApi.Transactions.ChangePin.Response,
    AxiosResponse<ClientApi.Transactions.ChangePin.Response>
  >('/account/changepin', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};

export const resetPinService = async (
  payload: ClientApi.Transactions.ResetPin.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig
): Promise<ClientApi.Transactions.ResetPin.Response['Data']> => {
  const serializedData = decorateWithAppIdAndKeyAndEmailAndHash({
    OTPCode: payload.OTPCode,
    NewPIN: payload.NewPIN,
    Password: payload.Password
  });

  return AxiosConfig.post<
    ClientApi.Transactions.ResetPin.Response,
    AxiosResponse<ClientApi.Transactions.ResetPin.Response>
  >('/account/resetpin', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};
