import Api from '@sendsprint/api-types';
import { RegisterFormI } from '../../components/registerForm';
import { UseRegisterFormResponse } from '../../hooks/useRegisterForm';

export const registerValuesMockData: RegisterFormI = {
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
  captcha: '',
  acceptTerms: false,
  firstName: '',
  lastName: '',
  referralCode: '',
  signUpSource: ''
};

export const useRegisterFormResponse: UseRegisterFormResponse = {
  currentStep: 1,
  handleChangePhoneNo: jest.fn(),
  handlePhoneNumberClose: jest.fn(),
  handleSubmit: jest.fn(),
  handleUserDetailsUpdate: jest.fn(),
  initialValues: registerValuesMockData,
  isLoading: false,
  isPhoneNumberModalShown: false,
  phoneUpdateLoading: false,
  setSelectedCountry: jest.fn(),
  stepsForPhoneUpdate: 'initial',
  validationSchema: {},
  verifyStatus: false,
  emailQuery: '',
  hashQuery: ''
};
