import AuthLayout from '@src/layouts/auth';
import { Path } from '@src/navigations/routes';
import React from 'react';
import useGetSendMoneyDetailsFromWebsite from '../register/hooks/useGetSendMoneyDetailsFromWebsite';
import { resolveQueryLink } from '@src/utils/resolveQueryLink';
import LoginForm from './components/loginForm';
import useMixpanelLoadEvent from '@src/hooks/utils/useMixpanelLoadEvent';

const Login = () => {
  useMixpanelLoadEvent({ pageViewName: 'Login' });

  const detailsFromWebsite = useGetSendMoneyDetailsFromWebsite();
  const registerUrl = `${Path.Register}${resolveQueryLink({
    ...detailsFromWebsite
  })}`;

  return (
    <>
      <AuthLayout
        pageTitle="Log in to send money and gifts to Africa with SendSprint"
        pageDescription="Log in to your SendSprint account and send money and gifts to friends and family. Choose the fastest, simplest and most secure way to send money and gift cards."
        headerButtonLabel="Create Account"
        headerButtonLink={registerUrl}>
        <LoginForm detailsFromWebsite={detailsFromWebsite} />
      </AuthLayout>
    </>
  );
};

export default Login;
