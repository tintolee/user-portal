import Text from '@sendsprint/ui-react/dist/components/Text';
import { FormikHelpers } from 'formik';
import AuthLayout from '@src/layouts/auth';
import { Path } from '@src/navigations/routes';
import React, { lazy, useState } from 'react';
import ResetPasswordForm, { ResetPasswordI } from './components/resetPasswordForm';
import { useResetPasswordByEmail } from '@src/hooks/queries/account';
import ClientApi from '@src/types/client';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import Loader from '@src/components/loader';

const SuccessScreen = lazy(
  () => import(/*webpackChunkName: 'ResetPasswordSuccessScreen'*/ './components/successScreen')
);

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);

  const { mutate, isLoading } = useResetPasswordByEmail({
    onSuccess: () => {
      setIsResetSent(true);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleSubmit = (values: ResetPasswordI, formikHelpers: FormikHelpers<ResetPasswordI>) => {
    setEmail(values.email);
    const payload: ClientApi.Account.ResetPasswordByEmail.Request = {
      Email: values.email
    };

    mutate(payload);
  };

  const handleResend = () => {
    const payload: ClientApi.Account.ResetPasswordByEmail.Request = {
      Email: email
    };

    mutate(payload);
  };
  return (
    <AuthLayout
      pageTitle="Reset your password"
      headerButtonLabel="Login"
      headerButtonLink={Path.Login}>
      {!isResetSent && (
        <>
          <Text className="ss-text-left" variant="h3">
            Forgotten your password?
          </Text>
          <Text className="ss-text-neutral-400 ss-mb-6" variant="paragraphLarge">
            Please enter the email you used to sign up
          </Text>
          <ResetPasswordForm handleSubmit={handleSubmit} isLoading={isLoading} />
        </>
      )}
      {isResetSent && (
        <SuspenseWrapper
          suspenseFallback={
            <Loader
              ballSize="small"
              height="content"
              className="ss-bg-white ss-min-h-250 md:ss-min-h-300 ss-rounded-lg"
            />
          }>
          <SuccessScreen isLoading={isLoading} email={email} handleResend={handleResend} />
        </SuspenseWrapper>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
