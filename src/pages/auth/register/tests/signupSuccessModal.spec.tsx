import { act, fireEvent } from '@testing-library/react';
import { renderWrapper } from '@src/tests-utils/render';
import { mockMatchMedia } from '@src/tests-utils/mocks/matchMedia';
import SignUpSuccessModal from '../components/signUpSuccessModal';
import * as reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

const useNavigateMock = jest.spyOn(reactRouterDom, 'useNavigate');
const navigateMock = jest.fn();

describe('SignUpSuccessModal component', () => {
  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    useNavigateMock.mockReset();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should not show on the page when isRegistered is false', async () => {
    const { baseElement, queryByText } = await act(() =>
      renderWrapper(<SignUpSuccessModal isRegistered={false} loginUrl={''} />)
    );

    const successStepHeader = queryByText(/Welcome to Sendsprint/i);

    expect(baseElement).toBeTruthy();
    expect(successStepHeader).toBeFalsy();
  });

  it('should show on the page when isRegistered is true', async () => {
    const { baseElement, queryByText } = await act(() =>
      renderWrapper(<SignUpSuccessModal isRegistered={true} loginUrl={''} />)
    );

    const successStepHeader = queryByText(/Welcome to Sendsprint/i);

    expect(baseElement).toBeTruthy();
    expect(successStepHeader).toBeTruthy();
  });

  it('should trigger the handleClose function on button click', async () => {
    useNavigateMock.mockImplementation(() => navigateMock);

    const { baseElement, queryByText, getByTestId } = await act(() =>
      renderWrapper(<SignUpSuccessModal isRegistered={true} loginUrl={''} />)
    );

    const successStepHeader = queryByText(/Welcome to Sendsprint/i);
    const ctaButton = getByTestId('cta-button');

    act(() => {
      fireEvent.click(ctaButton);
    });

    expect(baseElement).toBeTruthy();
    expect(successStepHeader).toBeTruthy();
    expect(navigateMock).toHaveBeenCalled();
  });
});
