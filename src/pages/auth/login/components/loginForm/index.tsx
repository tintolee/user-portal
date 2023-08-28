import Form from '@sendsprint/ui-react/dist/components/form2/formContainer/FormContainer';
import { SetAddressFormData } from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm';
import React from 'react';
import LoginFormInner from './LoginFormInner';
import useLoginForm from '../../hooks/useLoginForm';
import { UseGetSendMoneyDetailsFromWebsiteResponse } from '@src/pages/auth/register/hooks/useGetSendMoneyDetailsFromWebsite';

export interface LoginI {
  email: string;
  password: string;
}

export interface LoginFormProps {
  detailsFromWebsite: UseGetSendMoneyDetailsFromWebsiteResponse;
}

export type LoginFormI = LoginI & SetAddressFormData;

const LoginForm = ({ detailsFromWebsite }: LoginFormProps) => {
  const loginFormLogic = useLoginForm({
    detailsFromWebsite
  });

  const { initialValues, validationSchema, handleSubmit } = loginFormLogic;

  return (
    <Form<LoginFormI>
      className="ss-flex ss-flex-col ss-gap-4"
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}>
      <LoginFormInner loginFormLogic={loginFormLogic} />
    </Form>
  );
};

export default LoginForm;
