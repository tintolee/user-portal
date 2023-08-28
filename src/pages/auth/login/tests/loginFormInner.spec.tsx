import { act } from '@testing-library/react';
import { renderWrapper } from '@src/tests-utils/render';
import { mockMatchMedia } from '@src/tests-utils/mocks/matchMedia';
import LoginFormInner from '../components/loginForm/LoginFormInner';
import { UseLoginFormResponse } from '../hooks/useLoginForm';
import { useLoginFormResponse } from './mocks/loginForm';
import { Form } from '@sendsprint/ui-react';
import * as locationService from '../../../../services/location-service';
import ClientApi from '@src/types/client';
import Api from '@sendsprint/api-types';

jest.mock('../../../../services/location-service', () => ({
  getSendCountriesService: jest.fn()
}));

const getSendCountriesServiceMock = jest.spyOn(locationService, 'getSendCountriesService');

describe('LoginFormInner component', () => {
  beforeAll(() => {
    mockMatchMedia();
  });

  beforeEach(() => {
    getSendCountriesServiceMock.mockResolvedValue([
      {
        currency: '',
        id: 1,
        initials: Api.Model.CountryInitials.UnitedKingdom,
        name: '',
        telCode: ''
      }
    ] as ClientApi.SendCountry[]);
  });

  afterEach(() => {
    getSendCountriesServiceMock.mockReset();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render login step when current step is 1', async () => {
    const updatedProps: UseLoginFormResponse = {
      ...useLoginFormResponse,
      currentStep: 1
    };

    const { baseElement, findByText } = await act(() =>
      renderWrapper(
        <Form
          initialValues={updatedProps.initialValues}
          enableReinitialize
          onSubmit={updatedProps.handleSubmit}>
          <LoginFormInner loginFormLogic={updatedProps} />
        </Form>
      )
    );

    const loginStepHeader = await findByText(/Welcome back!/i);

    expect(baseElement).toBeTruthy();
    expect(loginStepHeader).toBeTruthy();
  });

  it('should render address step when current step is 2', async () => {
    const updatedProps: UseLoginFormResponse = {
      ...useLoginFormResponse,
      currentStep: 2
    };

    const { baseElement, findByText } = await act(() =>
      renderWrapper(
        <Form
          initialValues={updatedProps.initialValues}
          enableReinitialize
          onSubmit={updatedProps.handleSubmit}>
          <LoginFormInner loginFormLogic={updatedProps} />
        </Form>
      )
    );

    const addressStepHeader = await findByText(/Where are you sending from?/i);

    expect(baseElement).toBeTruthy();
    expect(addressStepHeader).toBeTruthy();
  });
});
