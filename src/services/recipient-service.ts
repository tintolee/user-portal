import Api from '@sendsprint/api-types';
import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import { CONFIG_NO_ERROR_TOAST } from '@src/constants';
import { AddRecipientFormI } from '@src/pages/user/recipients/components/addRecipientForm';
import ClientApi from '@src/types/client';
import {
  getOptionsFromRecipientType,
  getRecipientTypeFromMapping
} from '@src/utils/recipient-type';
import { localeCompare } from '@src/utils/sort';
import { getFullName } from '@src/utils/user';
import { AxiosResponse } from 'axios';
import { decorateWithAppIdAndKeyAndEmailAndHash, getApiEndpointResponse } from './api-service';
interface ExtendedRecipientI extends Api.Model.Recipient {
  DateOfBirth?: null | string;
}

const formatPaymentTypeInfo = (
  paymentTypes: Api.Model.PaymentTypeInfo[]
): ClientApi.PaymentTypeInfo[] =>
  paymentTypes.map(({ Id, Country, PaymentType, PaymentName, Status }) => ({
    id: Id,
    country: Country,
    paymentName: PaymentName,
    paymentType: PaymentType,
    status: Status,
    recipientType: getRecipientTypeFromMapping({
      country: Country,
      paymentType: PaymentType
    }) as ClientApi.RecipientType
  }));

const formatRecipient = (r: ExtendedRecipientI): ClientApi.Recipient => ({
  id: r.Id,
  ownerId: r.OwnerId,
  type: getRecipientTypeFromMapping({
    country: r.Country,
    paymentType: r.PaymentType
  }) as ClientApi.RecipientType,
  firstName: r.FirstName,
  lastName: r.LastName,
  middleName: r.MiddleName,
  fullName: getFullName({
    firstName: r.FirstName,
    middleName: r.MiddleName,
    lastName: r.LastName
  }),
  bankCode: r.BankCode,
  branchCode: r.BranchCode,
  accountNumber: r.AccountNumber,
  routingNumber: r.RoutingNumber,
  address: r.Address,
  email: r.Email,
  phoneNumber: r.Phone,
  paymentOperator: r.PaymentOperator,
  country: r.Country,
  paymentType: r.PaymentType,
  status: r.Status,
  dateOfBirth: r.DateOfBirth
});

export const formatRecipients = (data: Api.Model.Recipient[]): ClientApi.Recipient[] => {
  return data.map(formatRecipient).sort((a, b) => localeCompare(a.fullName, b.fullName));
};

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const getPaymentTypesByCountryService = async (
  payload: ClientApi.Recipients.GetPaymentTypesByCountry.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  config?: RequestConfig<ClientApi.Recipients.GetPaymentTypesByCountry.Request>
): Promise<ClientApi.PaymentTypeInfo[]> => {
  const serializedData: Api.Recipient.ListPaymentTypesByCountry.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({ Country: payload.country });

  return AxiosConfig.post<
    Api.Recipient.ListPaymentTypesByCountry.Response,
    AxiosResponse<Api.Recipient.ListPaymentTypesByCountry.Response>
  >('/account/loadpaymenttypesbycountry', serializedData, CONFIG_NO_ERROR_TOAST)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatPaymentTypeInfo(Data || []));
};

export const addRecipientService = async (
  payload: AddRecipientFormI,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<AddRecipientFormI>
): Promise<ClientApi.Recipient | null> => {
  const serializedData: ClientApi.Recipients.AddRecipient.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({
      FirstName: payload.firstName.trim(),
      MiddleName: (payload.middleName || '').trim(),
      LastName: payload.lastName.trim(),

      AccountNumber: (payload.accountNumber.toString() || '').trim(),
      BankCode: payload.bankCode || '',
      BranchCode: payload.branchCode || '',
      RoutingNumber: (payload.routingNumber || '').trim(),

      Address: payload.address.trim(),

      RecipientEmail: (payload.email || '').trim(),
      Phone: (payload.phoneNumber || '').replace(/\D/g, ''), // strip non-digit characters
      PaymentOperator: (payload.paymentOperator || '').trim(),

      Country: payload.country as Api.Model.CountryInitials,
      PaymentType: payload.paymentType as Api.Model.PaymentType,
      Status: payload.saveDetails ? Api.Model.Status.Saved : Api.Model.Status.Temporary,
      DateOfBirth: payload.birthday
    });

  return AxiosConfig.post<
    Api.Recipient.AddRecipient.Response,
    AxiosResponse<Api.Recipient.AddRecipient.Response>
  >('/account/insertrecipient', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => {
      if (Data === null) {
        return Data;
      }
      const [recipient] = formatRecipients(Data);
      return recipient;
    });
};

export const getRecipientsService = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig
): Promise<ClientApi.Recipient[]> => {
  const serializedData: Api.Recipient.ListRecipients.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({});

  return AxiosConfig.post<
    Api.Recipient.ListRecipients.Response,
    AxiosResponse<Api.Recipient.ListRecipients.Response>
  >('/account/loaduserrecipients', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatRecipients(Data || []));
};

export const getRecipientByIdService = async (
  payload: ClientApi.Recipients.GetRecipientById.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<ClientApi.Recipients.GetRecipientById.Request>
): Promise<ClientApi.Recipient | null> => {
  const serializedData: Api.Recipient.FindRecipientById.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({ Id: payload.id });

  return AxiosConfig.post<
    Api.Recipient.FindRecipientById.Response,
    AxiosResponse<Api.Recipient.FindRecipientById.Response>
  >('/account/loadrecipientbyid', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data: data }) => data && formatRecipient(data[0]));
};

export const getRecipientByTypeService = async (
  payload: ClientApi.Recipients.GetRecipientsByType.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<ClientApi.Recipients.GetRecipientsByType.Request>
): Promise<ClientApi.Recipient[]> => {
  const { country, paymentType } = getOptionsFromRecipientType(payload.type);
  const serializedData: Api.Recipient.ListRecipientsByType.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({ Country: country, PaymentType: paymentType });

  return AxiosConfig.post<
    Api.Recipient.ListRecipientsByType.Response,
    AxiosResponse<Api.Recipient.ListRecipientsByType.Response>
  >('/account/loaduserrecipientsbytype', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => formatRecipients(Data || []));
};

export const deleteRecipientByIdService = async (
  payload: ClientApi.Recipients.DeleteRecipientById.Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: RequestConfig<ClientApi.Recipients.DeleteRecipientById.Request>
) => {
  const serializedData: Api.Recipient.DeleteRecipientById.Request =
    decorateWithAppIdAndKeyAndEmailAndHash({ Id: payload.id });

  return AxiosConfig.post<
    Api.Recipient.DeleteRecipientById.Response,
    AxiosResponse<Api.Recipient.DeleteRecipientById.Response>
  >('/account/deleterecipientbyid', serializedData, config)
    .then(getApiEndpointResponse)
    .then(({ Data }) => Data);
};
