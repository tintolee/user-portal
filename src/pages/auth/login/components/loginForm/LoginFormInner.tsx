import Loader from '@src/components/loader';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import AddressErrorFallback from '@src/pages/auth/register/components/addressErrorFallback';
import React, { lazy } from 'react';
import { UseLoginFormResponse } from '../../hooks/useLoginForm';
import LoginFormContent from '../loginFormContent';

const AddressForm = lazy(
  () =>
    import(/*webpackChunkName: 'AddressForm'*/ '@src/pages/auth/register/components/addressForm')
);

interface Props {
  loginFormLogic: UseLoginFormResponse;
}

const LoginFormInner = ({ loginFormLogic }: Props) => {
  const {
    currentStep,
    handleChangePhoneNo,
    handlePhoneNumberClose,
    handleUserDetailsUpdate,
    isLoading,
    isPhoneNumberModalShown,
    pendingLoggedInUser,
    phoneUpdateLoading,
    setSelectedCountry,
    stepsForPhoneUpdate,
    verifyStatus
  } = loginFormLogic;
  return (
    <>
      {currentStep === 1 && <LoginFormContent isLoading={isLoading} />}
      {currentStep === 2 && (
        <SuspenseWrapper
          errorFallback={AddressErrorFallback}
          suspenseFallback={
            <Loader
              ballSize="small"
              height="content"
              className="ss-bg-white ss-min-h-300 md:ss-min-h-400 ss-rounded-lg"
            />
          }>
          <AddressForm
            setSelectedCountry={setSelectedCountry}
            isPhoneNumberModalShown={isPhoneNumberModalShown}
            handleUserDetailsUpdate={handleUserDetailsUpdate}
            stepsForPhoneUpdate={stepsForPhoneUpdate}
            handleChangePhoneNo={handleChangePhoneNo}
            phoneUpdateLoading={phoneUpdateLoading}
            verifyStatus={verifyStatus}
            handlePhoneNumberClose={handlePhoneNumberClose}
            emailQuery={pendingLoggedInUser?.user.email || null}
            hashQuery={pendingLoggedInUser?.hash || null}
          />
        </SuspenseWrapper>
      )}
    </>
  );
};

export default LoginFormInner;
