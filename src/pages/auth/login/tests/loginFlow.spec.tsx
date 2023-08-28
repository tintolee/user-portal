import { act, fireEvent } from '@testing-library/react';
import { renderWrapper } from '@src/tests-utils/render';
import { mockMatchMedia } from '@src/tests-utils/mocks/matchMedia';
import LoginForm from '../components/loginForm';
import { detailsFromWebsite } from './mocks/loginForm';
import * as accountServices from '../../../../services/account-service';
import { loggedInUser, loggedInUserWithoutPhone } from './mocks/loginUser';

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

describe('LoginForm page', () => {
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

  it('should render', async () => {
    const { baseElement } = await act(() =>
      renderWrapper(<LoginForm detailsFromWebsite={detailsFromWebsite} />)
    );

    expect(baseElement).toBeTruthy();
  });

  describe('Login form functionalities', () => {
    it('should validate the login form properly', async () => {
      loginServiceMock.mockResolvedValue(loggedInUser);

      const { getByLabelText, baseElement, queryByText } = await act(() =>
        renderWrapper(<LoginForm detailsFromWebsite={detailsFromWebsite} />)
      );

      const emailField = getByLabelText(/Email address/);
      const passwordField = getByLabelText(/Password/);
      const submitBtn = baseElement.querySelector("button[type='submit']") as HTMLElement;

      await act(() => {
        fireEvent.click(submitBtn);
      });

      expect(queryByText(/Please enter an email/i)).toBeTruthy();
      expect(queryByText(/Please enter a password/i)).toBeTruthy();
      expect(queryByText(/Please enter a valid email/i)).toBeNull();

      await act(() => {
        fireEvent.change(emailField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: '1234' } });
        fireEvent.click(submitBtn);
      });

      expect(queryByText(/Please enter an email/i)).toBeNull();
      expect(queryByText(/Please enter a password/i)).toBeNull();
      expect(queryByText(/Please enter a valid email/i)).toBeTruthy();
    });

    it('should login successfully when the user has address/phone number', async () => {
      loginServiceMock.mockResolvedValue(loggedInUser);

      const { getByLabelText, baseElement, queryByText } = await act(() =>
        renderWrapper(<LoginForm detailsFromWebsite={detailsFromWebsite} />)
      );

      const emailField = getByLabelText(/Email address/);
      const passwordField = getByLabelText(/Password/);
      const submitBtn = baseElement.querySelector("button[type='submit']") as HTMLElement;

      await act(() => {
        fireEvent.change(emailField, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordField, { target: { value: '1234' } });
        fireEvent.click(submitBtn);
      });

      expect(queryByText(/Please enter an email/i)).toBeNull();
      expect(queryByText(/Please enter a password/i)).toBeNull();
      expect(queryByText(/Please enter a valid email/i)).toBeNull();
      expect(queryByText(/Where are you sending from?/i)).toBeNull();
    });

    it('should prevent direct login and navigate to the address step when the user has no address/phone number', async () => {
      loginServiceMock.mockResolvedValue(loggedInUserWithoutPhone);

      const { getByLabelText, baseElement, queryByText } = await act(() =>
        renderWrapper(<LoginForm detailsFromWebsite={detailsFromWebsite} />)
      );

      const emailField = getByLabelText(/Email address/);
      const passwordField = getByLabelText(/Password/);
      const submitBtn = baseElement.querySelector("button[type='submit']") as HTMLElement;

      await act(() => {
        fireEvent.change(emailField, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordField, { target: { value: '1234' } });
        fireEvent.click(submitBtn);
      });

      expect(queryByText(/Please enter an email/i)).toBeNull();
      expect(queryByText(/Please enter a password/i)).toBeNull();
      expect(queryByText(/Please enter a valid email/i)).toBeNull();
      expect(queryByText(/Where are you sending from?/i)).toBeTruthy();

      // NOTE: testing of the address form will be done in the register page
    });
  });
});
