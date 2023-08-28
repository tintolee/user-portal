import { AxiosResponse, AxiosError } from 'axios';
import Api from '@sendsprint/api-types';
import { AuthContextI } from '@src/contexts';
import { AddToast, ToastType } from '@src/contexts';
import { getEnvData } from '@src/utils/env';
import { getState } from '@src/utils/stateStorage';
import { AxiosConfig } from '@src/config/axiosConfig';
export type { AxiosRequestConfig as RequestConfig } from 'axios';

const ENV_DATA = getEnvData();

type ConfigureInterceptorProps = {
  addToast: AddToast;
  logout: AuthContextI['logout'];
};

export function configureInterceptors({ addToast, logout }: ConfigureInterceptorProps) {
  const addApiErrorToast = (content: ToastType['content']) => {
    addToast(content, { appearance: 'warning' });
  };

  const responseInterceptor = AxiosConfig.interceptors.response.use(
    function (response: AxiosResponse<Api.Endpoint.Response.SuccessResponse>) {
      return response;
    },
    function (
      error: AxiosError<
        Api.Endpoint.Response.ErrorResponse | Api.Endpoint.Response.InternalServerErrorResponse
      >
    ) {
      const errorResponse = error.response?.data as Api.Endpoint.Response.ErrorResponse | undefined;
      const serverErrorResponse = error.response?.data as
        | Api.Endpoint.Response.InternalServerErrorResponse
        | undefined;

      const getReturnObject = () => Promise.reject(error.response?.data || error);

      // Invalid or expired hash, then log out
      if (errorResponse?.ResponseCode === Api.Endpoint.Response.Code.InvalidHash) {
        // this is for error handling of register form
        if (errorResponse?.ResponseMessage === 'Email already registered before. Please login') {
          logout(true)
            .then(() => {
              addApiErrorToast({
                title: 'Error',
                body: 'Email already registered. Please Login or reset password.'
              });
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(() => {});
        } else {
          logout(true)
            .then(() => {
              addApiErrorToast({
                title: 'Your session has expired',
                body: 'Please log in to your account'
              });
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(() => {});
        }
        return getReturnObject();
      }

      if (error.config.showToastOnError) {
        const errorMessage: string =
          errorResponse?.ResponseMessage || serverErrorResponse?.Message || error.message;

        addApiErrorToast({ title: 'Error', body: errorMessage });
      }

      return getReturnObject();
    }
  );

  return function cleanupInterceptors(): void {
    AxiosConfig.interceptors.response.eject(responseInterceptor);
  };
}

export function decorateWithAppIdAndKey<T>(data: T): T & Api.Endpoint.Request.DataWithApiIdAndKey {
  return {
    ...data,
    ApplicationID: ENV_DATA.API_APPLICATION_ID,
    SecretKey: ENV_DATA.API_SECRET_KEY
  };
}

export function decorateWithEmailAndHash<T>(
  data: T
): T & Api.Endpoint.Request.DataWithEmailAndHash {
  const state = getState();
  const hash = (state && state.hash) || '';
  const email = (state && state.user && state.user.email) || '';

  return {
    Email: email,
    Hash: hash,
    ...data
  };
}

export function decorateWithAppIdAndKeyAndEmailAndHash<T>(
  data: T
): T & Api.Endpoint.Request.DataWithApiAndKeyAndEmailAndHash {
  return decorateWithAppIdAndKey(decorateWithEmailAndHash(data));
}

/**
 * Response extractor. Get the actual data/info returned from an API endpoint
 * @param response
 */
export function getApiEndpointResponse<T>(response: AxiosResponse<T>): T {
  return response.data;
}
