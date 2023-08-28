import Api from '@sendsprint/api-types';
import { UseGetSendMoneyDetailsFromWebsiteResponse } from '@src/pages/auth/register/hooks/useGetSendMoneyDetailsFromWebsite';
import { LoginFormI } from '../../components/loginForm';
import { UseLoginFormResponse } from '../../hooks/useLoginForm';

export const loginValuesMockData: LoginFormI = {
  email: '',
  password: '',
  streetAddress: '',
  dateOfBirth: '',
  state: '',
  postCode: '',
  city: '',
  country: Api.Model.CountryInitials.UnitedKingdom,
  phone: '',
  otp: '',
  captcha: ''
};

export const fullLoginValuesMock: LoginFormI = {
  email: 'test@test.com',
  password: 'test',
  streetAddress: 'test',
  state: 'test',
  postCode: 'test',
  city: 'test',
  phone: '7455555553',
  otp: '1111',
  captcha: 'true',
  dateOfBirth: '01/01/1111',
  country: Api.Model.CountryInitials.UnitedKingdom
};

export const detailsFromWebsite: UseGetSendMoneyDetailsFromWebsiteResponse = {
  sendAmount: null,
  sendCountry: null,
  receiveCountry: null,
  connectQuery: null,
  campaignIdQuery: null,
  recipientCurrency: null,
  senderCurrency: null,
  cartFromQuery: null,
  rateFromQuery: null,
  totalAmountFromQuery: null,
  totalAmountPlusFeeFromQuery: null,
  isCheckoutPage: false
};

export const useLoginFormResponse: UseLoginFormResponse = {
  currentStep: 1,
  handleChangePhoneNo: jest.fn(),
  handlePhoneNumberClose: jest.fn(),
  handleSubmit: jest.fn(),
  handleUserDetailsUpdate: jest.fn(),
  initialValues: loginValuesMockData,
  isLoading: false,
  isPhoneNumberModalShown: false,
  pendingLoggedInUser: undefined,
  phoneUpdateLoading: false,
  setSelectedCountry: jest.fn(),
  stepsForPhoneUpdate: 'initial',
  validationSchema: {},
  verifyStatus: false
};
