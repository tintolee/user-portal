import Loader from '@src/components/loader';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import ClientApi from '@src/types/client';
import React, { lazy } from 'react';
import { UseRegisterFormResponse } from '../../hooks/useRegisterForm';
import AddressErrorFallback from '../addressErrorFallback';
import SignUpForm from '../signUpForm';

const AddressForm = lazy(() => import(/*webpackChunkName: 'AddressForm'*/ '../addressForm'));
const SignupSuccessModal = lazy(
  () => import(/*webpackChunkName: 'SignupSuccessModal'*/ '../signUpSuccessModal')
);

interface Props {
  registerFormLogic: UseRegisterFormResponse;
  signUpSourcesLoading: boolean;
  signUpSources: ClientApi.Account.SignUpSource.SignUpSourceData[] | undefined;
  isRegistered: boolean;
  loginUrl: string;
}

const RegisterFormInner = ({
  registerFormLogic,
  signUpSources,
  signUpSourcesLoading,
  isRegistered,
  loginUrl
}: Props) => {
  const {
    currentStep,
    emailQuery,
    handleChangePhoneNo,
    handlePhoneNumberClose,
    handleUserDetailsUpdate,
    hashQuery,
    isLoading,
    isPhoneNumberModalShown,
    phoneUpdateLoading,
    setSelectedCountry,
    stepsForPhoneUpdate,
    verifyStatus
  } = registerFormLogic;
  return (
    <>
      {currentStep === 1 && (
        <SignUpForm
          isLoading={isLoading}
          signUpSources={signUpSources}
          signUpSourcesLoading={signUpSourcesLoading}
        />
      )}
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
            hashQuery={hashQuery}
            emailQuery={emailQuery}
          />
        </SuspenseWrapper>
      )}
      {isRegistered && (
        <SuspenseWrapper returnNullErrorFallback>
          <SignupSuccessModal isRegistered={isRegistered} loginUrl={loginUrl} />
        </SuspenseWrapper>
      )}
    </>
  );
};

export default RegisterFormInner;
