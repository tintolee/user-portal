import AuthLayout from '@src/layouts/auth';
import { Path } from '@src/navigations/routes';
import React from 'react';
import { useSignUpSources } from '@src/hooks/queries/account';
import useGetSendMoneyDetailsFromWebsite from './hooks/useGetSendMoneyDetailsFromWebsite';
import { resolveQueryLink } from '@src/utils/resolveQueryLink';
import { RegisterForm } from './components';
import { useMixpanelLoadEvent } from '@src/hooks';

const Register = () => {
  useMixpanelLoadEvent({ pageViewName: 'Register' });

  const detailsFromWebsite = useGetSendMoneyDetailsFromWebsite();
  const { data: signUpSources, isLoading: signUpSourcesLoading } = useSignUpSources();
  const loginUrl = `${Path.Login}${resolveQueryLink({
    ...detailsFromWebsite
  })}`;

  return (
    <AuthLayout
      pageTitle="Sign up with Sendsprint and set up your account in minutes"
      pageDescription="Register with SendSprint and send money and gift cards to Africa in minutes! Set up your account now to get started."
      headerButtonLabel="Login"
      headerButtonLink={loginUrl}>
      <RegisterForm
        signUpSources={signUpSources}
        signUpSourcesLoading={signUpSourcesLoading}
        loginUrl={loginUrl}
        detailsFromWebsite={detailsFromWebsite}
      />
    </AuthLayout>
  );
};

export default Register;
