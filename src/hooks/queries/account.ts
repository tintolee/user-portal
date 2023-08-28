/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import {
  changePasswordFromProfileService,
  changePasswordService,
  generateOtpService,
  getSignUpSourceService,
  getVeriffStatusService,
  loadChargeRouteService,
  loginService,
  registerService,
  resetPasswordByEmailService,
  setAddressService,
  veriffSessionsService
} from '@src/services';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { useAccount, useMixpanel } from '@src/contexts';
import { mixpanelEvents } from '@src/types/mixpanel';
import { CAMPAIGN_ID_STORE_NAME, CONFIG_NO_ERROR_TOAST, DURATION_10_MIN } from '@src/constants';
import { useNavigate } from 'react-router-dom';

/**
 * =================
 * Mutations
 * =================
 */

export const useLogin = (
  isCheckoutPage: boolean,
  connectUrl?: string,
  options?: Omit<
    UseMutationOptions<
      ClientApi.LoggedInData,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Account.Login.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  const { handleLoginSuccess } = useAccount();
  const { mixpanelInstance } = useMixpanel();

  return useMutation<
    ClientApi.LoggedInData,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Account.Login.Request
  >('login', loginService, {
    onSuccess: (loggedInData) => {
      // if there is no phone, it will be handled in the login page
      // by showing the set address form
      if (loggedInData.address?.phone) {
        handleLoginSuccess(loggedInData, { checkout: isCheckoutPage, connectUrl });
      }
    },
    onError: (e) => {
      mixpanelInstance.track(mixpanelEvents.LoginFailed, {
        error: e.response?.data.ResponseMessage || 'Error occured'
      });
    },
    ...options
  });
};

interface UseRegisterOptions {
  loginUrl: string;
}

export const useRegister = (
  registerOptions: UseRegisterOptions,
  options?: Omit<
    UseMutationOptions<
      [Api.Model.User],
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Account.Register.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  const { loginUrl } = registerOptions;

  // const { handleRegisterTrue } = useAccount();
  const { mixpanelInstance } = useMixpanel();
  const navigate = useNavigate();

  return useMutation<
    [Api.Model.User],
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Account.Register.Request
  >('register', registerService, {
    onSuccess: (serializedData) => {
      // handleRegisterTrue();

      const user = serializedData[0];

      mixpanelInstance.alias(user?.Email);
      mixpanelInstance.people.set({
        $first_name: user?.FirstName,
        $last_name: user?.LastName,
        $name: `${user.FirstName} ${user.LastName}`,
        $email: user?.Email,
        $created: new Date().toISOString()
      });
      mixpanelInstance.identify(user?.Email);

      // remove any campaign id if any
      localStorage.removeItem(CAMPAIGN_ID_STORE_NAME);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => {
      mixpanelInstance.track(mixpanelEvents.SignUpFailed, {
        error: e?.ResponseMessage || 'Error occured'
      });
      // if error, it removes the first name from the session storage
      sessionStorage.removeItem('SprintUser');

      if (
        e?.ResponseMessage === 'Email already registered before. Please login' &&
        e?.ResponseCode === '04'
      ) {
        navigate(loginUrl);
      }
    },
    ...options
  });
};

export const useResetPasswordByEmail = (
  options?: Omit<
    UseMutationOptions<
      Api.Account.ResetPasswordByEmail.Response,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Account.ResetPasswordByEmail.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Account.ResetPasswordByEmail.Response,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Account.ResetPasswordByEmail.Request
  >('resetPasswordByEmail', resetPasswordByEmailService, options);
};

export const useChangePassword = (
  options?: Omit<
    UseMutationOptions<
      Api.Account.ChangePassword.Response,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Account.ChangePassword.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Account.ChangePassword.Response,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Account.ChangePassword.Request
  >('changePassword', changePasswordService, options);
};

export const useChangePasswordFromProfile = (
  options?: Omit<
    UseMutationOptions<
      Api.Account.ChangePasswordFromProfile.Response,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Account.ChangePasswordFromProfile.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Account.ChangePasswordFromProfile.Response,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Account.ChangePasswordFromProfile.Request
  >('changePasswordFromProfile', changePasswordFromProfileService, options);
};

export const useVeriffStatus = (
  payload: ClientApi.Account.GetVeriffStatus.Request,
  options?: UseQueryOptions<any, AxiosError<Api.Endpoint.Response.ErrorResponse>>
) => {
  return useQuery<any, AxiosError<Api.Endpoint.Response.ErrorResponse>>({
    queryKey: ['getVeriffStatus', payload.email],
    queryFn: () => getVeriffStatusService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_10_MIN,
    ...options
  });
};

export const useVeriffSessions = (
  options?: Omit<
    UseMutationOptions<
      any,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Account.VeriffSessions.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    any,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Account.VeriffSessions.Request
  >('veriffSessions', veriffSessionsService, options);
};

export const useSignUpSources = (
  options?: UseQueryOptions<
    ClientApi.Account.SignUpSource.SignUpSourceData[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<
    ClientApi.Account.SignUpSource.SignUpSourceData[],
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['getSignUpSource'],
    queryFn: () => getSignUpSourceService(),
    staleTime: DURATION_10_MIN,
    ...options
  });
};

export const useSetAddress = (
  options?: Omit<
    UseMutationOptions<
      ClientApi.UserAddress,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Account.SetAddress.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    ClientApi.UserAddress,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Account.SetAddress.Request
  >('setAddress', setAddressService, options);
};

export const useLoadChargeRoute = (
  payload: ClientApi.Account.LoadChargeRoute.Request,
  options?: UseQueryOptions<
    Api.Endpoint.Response.SuccessResponse | undefined,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >
) => {
  return useQuery<
    Api.Endpoint.Response.SuccessResponse | undefined,
    AxiosError<Api.Endpoint.Response.ErrorResponse>
  >({
    queryKey: ['loadChargeRoute', payload.country],
    queryFn: () => loadChargeRouteService(payload, CONFIG_NO_ERROR_TOAST),
    staleTime: DURATION_10_MIN,
    ...options
  });
};

export const useGenerateOtp = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<Api.Endpoint.Response.SuccessResponse, any>,
      AxiosError<Api.Endpoint.Response.ErrorResponse>,
      ClientApi.Account.GenerateOtp.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    AxiosResponse<Api.Endpoint.Response.SuccessResponse, any>,
    AxiosError<Api.Endpoint.Response.ErrorResponse>,
    ClientApi.Account.GenerateOtp.Request
  >('generateOtp', generateOtpService, options);
};
