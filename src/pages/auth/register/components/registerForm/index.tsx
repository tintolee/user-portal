import Form from '@sendsprint/ui-react/dist/components/form2/formContainer/FormContainer';
import { SetAddressFormData } from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm';
import ClientApi from '@src/types/client';
import React from 'react';
import useRegisterForm from '../../hooks/useRegisterForm';
import { useAccount } from '@src/contexts/auth-context';
import { UseGetSendMoneyDetailsFromWebsiteResponse } from '../../hooks/useGetSendMoneyDetailsFromWebsite';
import RegisterFormInner from './RegisterFormInner';

export interface RegisterI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signUpSource: string;
  referralCode: string;
  acceptTerms: boolean;
}

export type RegisterFormI = RegisterI & SetAddressFormData;

interface Props {
  signUpSourcesLoading: boolean;
  signUpSources: ClientApi.Account.SignUpSource.SignUpSourceData[] | undefined;
  detailsFromWebsite: UseGetSendMoneyDetailsFromWebsiteResponse;
  loginUrl: string;
}

const RegisterForm = ({
  signUpSourcesLoading,
  signUpSources,
  detailsFromWebsite,
  loginUrl
}: Props) => {
  const { isRegistered } = useAccount();
  const registerFormLogic = useRegisterForm({
    detailsFromWebsite,
    loginUrl
  });

  const { initialValues, validationSchema, handleSubmit } = registerFormLogic;

  return (
    <Form<RegisterFormI>
      className="ss-flex ss-flex-col ss-gap-4"
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}>
      <RegisterFormInner
        isRegistered={isRegistered}
        loginUrl={loginUrl}
        registerFormLogic={registerFormLogic}
        signUpSources={signUpSources}
        signUpSourcesLoading={signUpSourcesLoading}
      />
    </Form>
  );
};

export default RegisterForm;
