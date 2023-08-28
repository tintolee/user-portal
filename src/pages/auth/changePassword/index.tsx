import Text from '@sendsprint/ui-react/dist/components/Text';
import AuthLayout from '@src/layouts/auth';
import { Path } from '@src/navigations/routes';
import { FormikHelpers } from 'formik';
import React, { lazy, useEffect, useState } from 'react';
import ChangePasswordForm, { ChangePasswordI } from './components/changePasswordForm';
import { useToasts } from '@src/contexts/toast-context';
import { useChangePassword } from '@src/hooks/queries/account';
import { useAppLocation } from '@src/hooks/utils/useAppLocation';
import { Navigate } from 'react-router-dom';
import ClientApi from '@src/types/client';
import { getUrlHashData } from './utils/getUrlHashData';
import { isUrlHashDataValid } from './utils/isUrlHashDataValid';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import Loader from '@src/components/loader';

const SuccessScreen = lazy(
  () => import(/*webpackChunkName: 'ChangePasswordSuccessScreen'*/ './components/successScreen')
);

const ChangePassword = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const { addToast } = useToasts();
  const location = useAppLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const urlData = getUrlHashData(location as any);
  const isUrlDataValid = isUrlHashDataValid(urlData);

  useEffect(() => {
    if (!isUrlDataValid) {
      addToast(
        {
          title: 'Invalid Url',
          body: 'The supplied Url is invalid. Please make sure that you pasted the right one from the email'
        },
        { appearance: 'warning' }
      );
    }
  }, [isUrlDataValid]);

  if (!isUrlDataValid) {
    return <Navigate to={Path.ResetPassword} />;
  }

  const { mutate, isLoading } = useChangePassword({
    onSuccess: () => {
      setIsPasswordChanged(true);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleSubmit = (values: ChangePasswordI, formikHelpers: FormikHelpers<ChangePasswordI>) => {
    const payload: ClientApi.Account.ChangePassword.Request = {
      Email: urlData.email,
      NewPassword: values.password,
      Password: urlData.password
    };

    mutate(payload);
  };
  return (
    <AuthLayout pageTitle="Change password" headerButtonLabel="Login" headerButtonLink={Path.Login}>
      {!isPasswordChanged && (
        <>
          <Text className="ss-text-left" variant="h3">
            Password recovery
          </Text>
          <Text className="ss-text-neutral-400 ss-mb-6" variant="paragraphLarge">
            Email: <span className="ss-font-bold">{urlData.email}</span>
          </Text>
          <ChangePasswordForm handleSubmit={handleSubmit} isLoading={isLoading} />
        </>
      )}
      {isPasswordChanged && (
        <SuspenseWrapper
          suspenseFallback={
            <Loader
              ballSize="small"
              height="content"
              className="ss-bg-white ss-min-h-250 md:ss-min-h-300 ss-rounded-lg"
            />
          }>
          <SuccessScreen />
        </SuspenseWrapper>
      )}
    </AuthLayout>
  );
};

export default ChangePassword;
