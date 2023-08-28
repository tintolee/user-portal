import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
  addRecipientService,
  deleteRecipientByIdService,
  getPaymentTypesByCountryService,
  getRecipientByIdService,
  getRecipientByTypeService,
  getRecipientsService
} from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { AddRecipientFormI } from '@src/pages/user/recipients/components/addRecipientForm';
import { CONFIG_NO_ERROR_TOAST, DURATION_1_HR } from '@src/constants';
import { useAccount } from '@src/contexts';

export const useGetPaymentTypesByCountry = (
  payload: ClientApi.Recipients.GetPaymentTypesByCountry.Request,
  options?: UseQueryOptions<
    ClientApi.PaymentTypeInfo[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<ClientApi.PaymentTypeInfo[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getPaymentTypesByCountry', payload.country],
    queryFn: () => getPaymentTypesByCountryService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useAddRecipient = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.Recipient | null,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      AddRecipientFormI
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.Recipient | null,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    AddRecipientFormI
  >('addRecipient', addRecipientService, options);
};

export const useGetRecipients = (
  options?: UseQueryOptions<ClientApi.Recipient[], AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.Recipient[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getRecipients', isLoggedIn],
    queryFn: () => getRecipientsService(CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useGetRecipientById = (
  payload: ClientApi.Recipients.GetRecipientById.Request,
  options?: UseQueryOptions<
    ClientApi.Recipient | null,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.Recipient | null, AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getRecipientById', payload.id, isLoggedIn],
    queryFn: () => getRecipientByIdService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useGetRecipientByType = (
  payload: ClientApi.Recipients.GetRecipientsByType.Request,
  options?: UseQueryOptions<ClientApi.Recipient[], AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  const { isLoggedIn } = useAccount();

  return useQuery<ClientApi.Recipient[], AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getRecipientByType', payload.type, isLoggedIn],
    queryFn: () => getRecipientByTypeService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_1_HR,
    ...options
  });
};

export const useDeleteRecipientById = (
  options?: Omit<
    UseMutationOptions<
      null,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Recipients.DeleteRecipientById.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    null,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Recipients.DeleteRecipientById.Request
  >('deleteRecipientById', deleteRecipientByIdService, options);
};
