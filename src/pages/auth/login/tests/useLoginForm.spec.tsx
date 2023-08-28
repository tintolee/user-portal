/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook } from '@testing-library/react';
import { mockMatchMedia } from '@src/tests-utils/mocks/matchMedia';
import useLoginForm from '../hooks/useLoginForm';
import { Wrapper } from '@src/tests-utils/render';
import { detailsFromWebsite, fullLoginValuesMock } from './mocks/loginForm';
import * as accountServices from '../../../../services/account-service';
import { loggedInUser, loggedInUserWithoutPhone } from './mocks/loginUser';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { formikHelpers } from '@src/tests-utils/mocks/formik';

jest.mock('../../../../services/account-service', () => ({
  ...jest.requireActual('../../../../services/account-service'),
  loginService: jest.fn(),
  generateOtpService: jest.fn(),
  verifyOtpService: jest.fn(),
  setAddressService: jest.fn()
}));

const loginServiceMock = jest.spyOn(accountServices, 'loginService');
const generateOtpServiceMock = jest.spyOn(accountServices, 'generateOtpService');
const verifyOtpServiceMock = jest.spyOn(accountServices, 'verifyOtpService');
const setAddressServiceMock = jest.spyOn(accountServices, 'setAddressService');

describe('useLoginForm hook', () => {
  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    loginServiceMock.mockReset();
    generateOtpServiceMock.mockReset();
    verifyOtpServiceMock.mockReset();
    setAddressServiceMock.mockReset();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render with default return values', async () => {
    const { result } = renderHook(
      () =>
        useLoginForm({
          detailsFromWebsite
        }),
      { wrapper: Wrapper }
    );

    expect(result.current.currentStep).toBe(1);
    expect(result.current.pendingLoggedInUser).toBeUndefined();
    expect(result.current.stepsForPhoneUpdate).toBe('initial');
    expect(result.current.phoneUpdateLoading).toBe(false);
    expect(result.current.verifyStatus).toBe(null);
    expect(result.current.isPhoneNumberModalShown).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should trigger handleLoginSuccess function when the login response contains phone number', async () => {
    // this loggedInUser have phone number in the response
    loginServiceMock.mockResolvedValue(loggedInUser);

    const { result } = renderHook(
      () =>
        useLoginForm({
          detailsFromWebsite
        }),
      { wrapper: Wrapper }
    );

    await act(async () => {
      await result.current.handleSubmit(fullLoginValuesMock, formikHelpers);
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.stepsForPhoneUpdate).toBe('initial');
  });

  it('should prompt for address when the login response does not contain phone number', async () => {
    // this loggedInUser does not have phone number in the response
    loginServiceMock.mockResolvedValue(loggedInUserWithoutPhone);
    generateOtpServiceMock.mockResolvedValue({
      data: { ResponseCode: Api.Endpoint.Response.Code.Successful, Data: [], ResponseMessage: '' }
    } as any);
    verifyOtpServiceMock.mockResolvedValue({
      data: { ResponseCode: Api.Endpoint.Response.Code.Successful, Data: [], ResponseMessage: '' }
    } as any);
    setAddressServiceMock.mockResolvedValue({
      city: 'test',
      country: Api.Model.CountryInitials.UnitedKingdom,
      dateOfBirth: '01/01/1111',
      phone: '745555555',
      postCode: '292929',
      state: 'test',
      street: 'test'
    } as ClientApi.UserAddress);

    const { result } = renderHook(
      () =>
        useLoginForm({
          detailsFromWebsite
        }),
      { wrapper: Wrapper }
    );

    // initial login form submit
    await act(async () => {
      await result.current.handleSubmit(fullLoginValuesMock, formikHelpers);
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.pendingLoggedInUser).toEqual(loggedInUserWithoutPhone);

    // address form submit for otp
    await act(async () => {
      await result.current.handleSubmit(fullLoginValuesMock, formikHelpers);
    });

    expect(result.current.stepsForPhoneUpdate).toBe('generated');
    expect(result.current.verifyStatus).toBe(null);

    // otp verification and auto-address set and login
    await act(async () => {
      await result.current.handleSubmit(fullLoginValuesMock, formikHelpers);
    });

    expect(result.current.verifyStatus).toBe(true);
  });
});
