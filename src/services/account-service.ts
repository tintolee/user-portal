import Api from '@sendsprint/api-types';
import { AxiosConfig, RequestConfig } from '@src/config/axiosConfig';
import ClientApi from '@src/types/client';
import { clearState, getState, setState } from '@src/utils/stateStorage';
import { getFullName } from '@src/utils/user';
import { AxiosResponse } from 'axios';
import {
  decorateWithAppIdAndKey,
  decorateWithAppIdAndKeyAndEmailAndHash,
  getApiEndpointResponse
} from './api-service';

/**
 * Response extractor. Extracts the LoggedInData from login and register endpoints
 * @param responseData
 */
function getLoggedInDataFromApiResponse(
  responseData: Api.Account.Login.Response | Api.Account.Register.Response
): ClientApi.LoggedInData {
  const firstItem = responseData.Data[0];

  const {
    Hash,
    Status,
    Role,
    FirstName,
    LastName,
    Email,
    City,
    Country,
    PostCode,
    Street,
    ReferralCode,
    Phone,
    DateOfBirth,
    State
  } = firstItem;
  const user: ClientApi.LoggedInData['user'] = {
    status: Status,
    role: Role,
    firstName: FirstName,
    lastName: LastName,
    fullName: getFullName({ firstName: FirstName, lastName: LastName }),
    email: Email,
    referralCode: ReferralCode,
    isEmailVerified: Status === Api.Model.Status.Active
  };
  let address: ClientApi.LoggedInData['address'] = null;
  if (City && Country && Street) {
    address = {
      city: City,
      country: Country,
      postCode: PostCode || '',
      street: Street,
      phone: Phone,
      dateOfBirth: DateOfBirth,
      state: State
    };
  }

  return { hash: Hash, user, address };
}

// function used to save logged in user in session storage
export function persistLoggedInState(loggedInData: ClientApi.LoggedInData): void {
  const { hash, user, address } = loggedInData;
  setState({ hash, user, address });
}

/**
 * ===================
 * ENDPOINTS
 * ===================
 */

export const loginService = async (
  payload: ClientApi.Account.Login.Request,
  config?: RequestConfig<Api.Account.Login.Request>
): Promise<ClientApi.LoggedInData> => {
  const serializedData: Api.Account.Login.Request = decorateWithAppIdAndKey({
    Email: payload.Email,
    Password: payload.Password,
    LoginType: ''
  });

  return AxiosConfig.post<
    Api.Account.Login.Response,
    AxiosResponse<Api.Account.Login.Response>,
    Api.Account.Login.Request
  >('/account/login', serializedData, config)
    .then(getApiEndpointResponse)
    .then(getLoggedInDataFromApiResponse)
    .then((loggedInData) => {
      // persistLoggedInState(loggedInData);
      return loggedInData;
    });
};

export const registerService = async (
  payload: ClientApi.Account.Register.Request,
  config?: RequestConfig<Api.Account.Register.Request>
): Promise<[Api.Model.User]> => {
  const serializedData: Api.Account.Register.Request = decorateWithAppIdAndKey({
    FirstName: payload.FirstName,
    LastName: payload.LastName,
    Email: payload.Email,
    Password: payload.Password,
    Referrer: payload.Referrer,
    LoginType: '',
    SignUpSourceId: `${payload.SignUpSourceId}`,
    /**
     * This differentiate individual from business sign ups
     */
    UserType: 'Individual'
  });

  return AxiosConfig.post<
    Api.Account.Register.Response,
    AxiosResponse<Api.Account.Register.Response>,
    Api.Account.Register.Request
  >('/account/register', serializedData, config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};

export const resetPasswordByEmailService = async (
  payload: ClientApi.Account.ResetPasswordByEmail.Request,
  config?: RequestConfig<Api.Account.ResetPasswordByEmail.Request>
): Promise<Api.Account.ResetPasswordByEmail.Response> => {
  const serializedData: Api.Account.ResetPasswordByEmail.Request = decorateWithAppIdAndKey({
    Email: payload.Email
  });

  return AxiosConfig.post<
    Api.Account.ResetPasswordByEmail.Response,
    AxiosResponse<Api.Account.ResetPasswordByEmail.Response>,
    ClientApi.Account.ResetPasswordByEmail.Request
  >('/account/resetpasswordbyemail', serializedData, config).then(getApiEndpointResponse);
};

export const changePasswordService = async (
  payload: ClientApi.Account.ChangePassword.Request,
  config?: RequestConfig<ClientApi.Account.ChangePassword.Request>
): Promise<Api.Account.ChangePassword.Response> => {
  const serializedData: Api.Account.ChangePassword.Request = decorateWithAppIdAndKey({
    Email: payload.Email,
    NewPassword: payload.NewPassword,
    Password: payload.Password
  });

  return AxiosConfig.post<
    Api.Account.ChangePassword.Response,
    AxiosResponse<Api.Account.ChangePassword.Response>,
    ClientApi.Account.ResetPasswordByEmail.Request
  >('/account/changepassword', serializedData, config).then(getApiEndpointResponse);
};

export const changePasswordFromProfileService = async (
  payload: ClientApi.Account.ChangePasswordFromProfile.Request,
  config?: RequestConfig<ClientApi.Account.ChangePasswordFromProfile.Request>
): Promise<Api.Account.ChangePasswordFromProfile.Response> => {
  const serializedData: Api.Account.ChangePasswordFromProfile.Request = decorateWithAppIdAndKey({
    Email: payload.Email,
    NewPassword: payload.NewPassword,
    Password: payload.Password
  });

  return AxiosConfig.post<
    Api.Account.ChangePasswordFromProfile.Response,
    AxiosResponse<Api.Account.ChangePasswordFromProfile.Response>,
    ClientApi.Account.ResetPasswordByEmail.Request
  >('/account/changepasswordonprofile', serializedData, config).then(getApiEndpointResponse);
};

export const logoutService = () => {
  clearState();
  return Promise.resolve({});
};

export const getVeriffStatusService = async (
  payload: ClientApi.Account.GetVeriffStatus.Request,
  config?: RequestConfig<ClientApi.Account.GetVeriffStatus.Request>
): Promise<any> => {
  if (!payload.email) return;

  const encodedEmail = encodeURIComponent(payload.email);

  return AxiosConfig.get<any, AxiosResponse<any>>(
    `/account/checkveriffbyemail?email=${encodedEmail}`,
    config
  )
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};

export const veriffSessionsService = async (
  payload: ClientApi.Account.VeriffSessions.Request,
  config?: RequestConfig<ClientApi.Account.ChangePassword.Request>
): Promise<any> => {
  return AxiosConfig.post<any, AxiosResponse<any>>('/veriff/sessions', payload.data, config);
};

export const getSignUpSourceService = (
  config?: RequestConfig
): Promise<ClientApi.Account.SignUpSource.SignUpSourceData[]> => {
  return AxiosConfig.get<
    ClientApi.Account.SignUpSource.Response,
    AxiosResponse<ClientApi.Account.SignUpSource.Response>
  >('/account/loadsignupsources', config)
    .then(getApiEndpointResponse)
    .then((data) => data.Data);
};

export const setAddressService = async (
  payload: ClientApi.Account.SetAddress.Request,
  config?: RequestConfig<ClientApi.Account.ChangePassword.Request>
): Promise<ClientApi.UserAddress> => {
  const serializedData: Api.Account.SetAddress.Request = decorateWithAppIdAndKeyAndEmailAndHash({
    Street: payload.streetAddress,
    PostalCode: payload.postCode,
    City: payload.city,
    Country: payload.country,
    Phone: payload.phone
  });

  const serializedData2: Api.Account.SetAddress.Request = decorateWithAppIdAndKeyAndEmailAndHash({
    Street: payload.streetAddress,
    PostalCode: payload.postCode,
    City: payload.city,
    Country: payload.country,
    Phone: payload.phone,
    Hash: payload.hash,
    Email: payload.email,
    State: payload.state,
    DateOfBirth: payload.dateOfBirth
  });

  const selectedSerializedData = payload.hash ? serializedData2 : serializedData;

  return AxiosConfig.post<
    Api.Account.SetAddress.Response,
    AxiosResponse<Api.Account.SetAddress.Response>
  >('/account/setaddress', selectedSerializedData, config)
    .then(getApiEndpointResponse)
    .then(() => {
      // todo We should (ideally) persist address data from the backend
      const address: ClientApi.UserAddress = {
        city: payload.city,
        country: payload.country,
        street: payload.streetAddress,
        postCode: payload.postCode,
        phone: payload.phone,
        dateOfBirth: payload.dateOfBirth,
        state: payload.state
      };
      setState({ address });

      return address;
    });
};

export const generateOtpService = async (
  payload: ClientApi.Account.GenerateOtp.Request,
  config?: RequestConfig<ClientApi.Account.GenerateOtp.Request>
) => {
  const serializedData = decorateWithAppIdAndKey({
    Email: payload.email,
    Hash: payload.hash,
    Phone: payload.phone
  });

  return AxiosConfig.post<
    Api.Endpoint.Response.SuccessResponse,
    AxiosResponse<Api.Endpoint.Response.SuccessResponse>
  >('/account/generateotp', serializedData, config);
};

export const verifyOtpService = async (
  payload: ClientApi.Account.VerifyOtp.Request,
  config?: RequestConfig<ClientApi.Account.VerifyOtp.Request>
) => {
  const serializedData = decorateWithAppIdAndKey({
    Email: payload.email,
    Hash: payload.hash,
    Phone: payload.phone,
    OtpCode: payload.otp
  });

  return AxiosConfig.post<
    Api.Endpoint.Response.SuccessResponse,
    AxiosResponse<Api.Endpoint.Response.SuccessResponse>
  >('/account/verifyotp', serializedData, config);
};

export const loadChargeRouteService = async (
  payload: ClientApi.Account.LoadChargeRoute.Request,
  config?: RequestConfig<ClientApi.Account.LoadChargeRoute.Request>
): Promise<Api.Endpoint.Response.SuccessResponse | undefined> => {
  if (!payload.country) return;

  return AxiosConfig.get<
    Api.Endpoint.Response.SuccessResponse,
    AxiosResponse<Api.Endpoint.Response.SuccessResponse>
  >(`/account/loadchargeroute/${payload.country}`, config).then(getApiEndpointResponse);
};

/**
 * ===================
 * STATE RELATED FUNCTIONS
 * ===================
 */

// function used to get logged in user data
export const getLoggedInUserInfo = () => {
  const state = getState();
  const user = (state && state.user) || null;
  const address = (state && state.address) || null;

  return { user, address };
};

// function used to check if a user is logged in
export const checkIfLoggedIn = () => {
  const state = getState();
  return !!(state && state.hash);
};
