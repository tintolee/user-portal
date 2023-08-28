import { act } from '@testing-library/react';
import { renderWrapper } from '@src/tests-utils/render';
import { mockMatchMedia } from '@src/tests-utils/mocks/matchMedia';
import RegisterFormInner from '../components/registerForm/RegisterFormInner';
import { useRegisterFormResponse } from './mocks/registerForm';
import { Form } from '@sendsprint/ui-react';
import { UseRegisterFormResponse } from '../hooks/useRegisterForm';

describe('RegisterFormInner component', () => {
  beforeAll(() => {
    mockMatchMedia();
  });
  it('should render register step when current step is 1', async () => {
    const { baseElement, getByText } = await act(() =>
      renderWrapper(
        <Form
          initialValues={useRegisterFormResponse.initialValues}
          enableReinitialize
          onSubmit={useRegisterFormResponse.handleSubmit}>
          <RegisterFormInner
            isRegistered={false}
            loginUrl=""
            signUpSources={[]}
            signUpSourcesLoading={false}
            registerFormLogic={useRegisterFormResponse}
          />
        </Form>
      )
    );

    const regesterFormHeader = getByText(/Sign up for free today/i);

    expect(baseElement).toBeTruthy();
    expect(regesterFormHeader).toBeTruthy();
  });

  it('should render address step when current step is 2', async () => {
    const updatedProps: UseRegisterFormResponse = {
      ...useRegisterFormResponse,
      currentStep: 2
    };

    const { baseElement, findByText } = await act(() =>
      renderWrapper(
        <Form
          initialValues={updatedProps.initialValues}
          enableReinitialize
          onSubmit={updatedProps.handleSubmit}>
          <RegisterFormInner
            isRegistered={false}
            loginUrl=""
            signUpSources={[]}
            signUpSourcesLoading={false}
            registerFormLogic={updatedProps}
          />
        </Form>
      )
    );

    const addressStepHeader = await findByText(/Where are you sending from?/i);

    expect(baseElement).toBeTruthy();
    expect(addressStepHeader).toBeTruthy();
  });

  it('should render the success modal when isRegistered is true', async () => {
    const updatedProps: UseRegisterFormResponse = {
      ...useRegisterFormResponse,
      currentStep: 2
    };

    const { baseElement, findByText } = await act(() =>
      renderWrapper(
        <Form
          initialValues={updatedProps.initialValues}
          enableReinitialize
          onSubmit={updatedProps.handleSubmit}>
          <RegisterFormInner
            isRegistered={true}
            loginUrl=""
            signUpSources={[]}
            signUpSourcesLoading={false}
            registerFormLogic={updatedProps}
          />
        </Form>
      )
    );

    const addressStepHeader = await findByText(/Where are you sending from?/i);
    const successStepHeader = await findByText(/Welcome to Sendsprint/i);

    expect(baseElement).toBeTruthy();
    expect(addressStepHeader).toBeTruthy();
    expect(successStepHeader).toBeTruthy();
  });
});
