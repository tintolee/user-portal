import React, { useState } from 'react';
import { Box, Button, Form, FormField, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline, LockOutline } from '@sendsprint/ui-react/dist/icons';
import { Dialog2, Image } from '@src/components';
import OtpField from '@src/components/sendMoneyFlow/components/addressStep/otpModal/OtpField';
import { useAccount, useToasts } from '@src/contexts';
import { Shape } from '@src/validations';
import * as yup from 'yup';
import { lock } from '@src/pages/user/profile/assets';
import { FormikHelpers } from 'formik';
import { useChangePin, useGenerateOtp, useResetPin } from '@src/hooks';
import { getState } from '@src/utils/stateStorage';
import cs from 'classnames';
import { convertToTime } from '@src/utils';

interface ChangeCodeFormI {
  currentCode: string;
  newCode: string;
  confirmNewCode: string;
  otpCode: string;
  password: string;
}

interface Props {
  handleFalse: () => void;
  state: boolean;
  handleStartTimer: () => void;
  countDown: number;
  isStarted: boolean;
}

type FormStepI = 'initial' | 'initial-new-code' | 'reset' | 'reset-otp' | 'reset-new-code';

const initialValues: ChangeCodeFormI = {
  currentCode: '',
  newCode: '',
  confirmNewCode: '',
  otpCode: '',
  password: ''
};

const ChangeCode = ({ handleFalse, state, countDown, handleStartTimer, isStarted }: Props) => {
  const [formStep, setFormStep] = useState<FormStepI>('initial');
  const { addToast } = useToasts();
  const { user, userAddress } = useAccount();
  const userState = getState();

  const { mutate: changePinMutate, isLoading: changePinLoading } = useChangePin({
    onSuccess: () => {
      addToast({ body: 'Code updated successfully' });
      setFormStep('initial');
      handleFalse();
    }
  });

  const { mutate: resetPinMutate, isLoading: resetPinLoading } = useResetPin({
    onSuccess: () => {
      addToast({ body: 'Code updated successfully' });
      setFormStep('initial');
      handleFalse();
    }
  });

  const { mutate: generateOtpMutate, isLoading: generateOtpLoading } = useGenerateOtp({
    onSuccess: () => {
      setFormStep('reset');
      handleStartTimer();
    }
  });

  const validationSchema = yup.object().shape<Shape<ChangeCodeFormI>>({
    currentCode:
      formStep === 'initial'
        ? yup
            .string()
            .required('Please enter current code')
            .length(4, 'Code should be four characters')
        : yup.string(),
    newCode:
      formStep === 'initial-new-code' || formStep === 'reset-new-code'
        ? yup.string().required('Code is required').length(4, 'Code should be four characters')
        : yup.string(),
    confirmNewCode:
      formStep === 'initial-new-code' || formStep === 'reset-new-code'
        ? yup
            .string()
            .oneOf([yup.ref('newCode'), null], 'Codes do not match')
            .required('Code is required')
        : yup.string(),
    otpCode:
      formStep === 'reset-otp'
        ? yup.string().required('Please enter OTP').length(6, 'OTP should be six characters')
        : yup.string(),
    password:
      formStep === 'initial-new-code' || formStep === 'reset-new-code'
        ? yup.string().required('Please enter password')
        : yup.string()
  });

  const handleClose = () => {
    handleFalse();
    setFormStep('initial');
  };

  const handleGoBackToCurrentPin = () => {
    setFormStep('initial');
  };

  const handleGenerateOtp = () => {
    generateOtpMutate({
      email: user?.email || '',
      hash: userState?.hash || '',
      phone: userAddress?.phone || ''
    });
  };

  const handleChangePin = (values: ChangeCodeFormI) => {
    if (formStep === 'initial-new-code') {
      changePinMutate({
        NewPIN: values.newCode,
        OldPIN: values.currentCode,
        Password: values.password
      });
    }
  };

  const handleResetPin = (values: ChangeCodeFormI) => {
    if (formStep === 'reset-new-code') {
      resetPinMutate({
        NewPIN: values.newCode,
        OTPCode: values.otpCode,
        Password: values.password
      });
    }
  };

  const handleSubmit = (values: ChangeCodeFormI, formikHelpers: FormikHelpers<ChangeCodeFormI>) => {
    if (formStep === 'initial') {
      setFormStep('initial-new-code');
      formikHelpers.setTouched({
        confirmNewCode: false,
        currentCode: false,
        newCode: false,
        otpCode: false
      });
    }

    if (formStep === 'initial-new-code') {
      formikHelpers.setTouched({
        confirmNewCode: false,
        currentCode: false,
        newCode: false,
        otpCode: false
      });

      handleChangePin(values);
    }

    if (formStep === 'reset-otp') {
      setFormStep('reset-new-code');
      formikHelpers.setTouched({
        confirmNewCode: false,
        currentCode: false,
        newCode: false,
        otpCode: false
      });
    }

    if (formStep === 'reset-new-code') {
      formikHelpers.setTouched({
        confirmNewCode: false,
        currentCode: false,
        newCode: false,
        otpCode: false
      });
      handleResetPin(values);
    }
  };

  const resetBtnDisabled = generateOtpLoading || (countDown > 0 && isStarted);

  return (
    <Dialog2 isOpen={state} disableOverlayClick handleClose={handleClose}>
      <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
        <Text className="ss-text-neutral-500" variant="h5">
          {formStep === 'initial' || formStep === 'initial-new-code' ? 'Change Code' : 'Reset Code'}
        </Text>
        <Button
          onClick={handleClose}
          label={<Icon svg={CloseOutline} size={24} />}
          variant="tertiary"
          className="ss-p-0"
        />
      </Box>
      <Form<ChangeCodeFormI>
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}>
        <Box className="ss-bg-white ss-px-4 ss-py-10 ss-rounded-base ss-mb-8">
          {(formStep === 'initial' || formStep === 'initial-new-code') && (
            <>
              <Text
                className="ss-text-neutral-500 ss-font-bold ss-text-center"
                variant="paragraphLarge">
                Change Code
              </Text>
              <Text className="ss-text-neutral-400 ss-text-center ss-mb-10">
                Enter your current sendsprint code
              </Text>
            </>
          )}
          {(formStep === 'reset-otp' || formStep === 'reset-new-code') && (
            <>
              <Text
                className="ss-text-neutral-500 ss-font-bold ss-text-center"
                variant="paragraphLarge">
                Reset Code
              </Text>
              <Text className="ss-text-neutral-400 ss-text-center ss-mb-10">
                {formStep === 'reset-new-code'
                  ? 'Enter a new 4-digit PIN'
                  : 'Enter OTP sent to your registered email address'}
              </Text>
            </>
          )}
          <Box>
            {formStep === 'initial' && (
              <Box className="ss-flex ss-flex-col ss-items-center">
                <OtpField name="currentCode" length={4} />
                <Text
                  variant="paragraphVerySmall"
                  className="ss-text-primary1-500 ss-text-center ss-mt-6">
                  Forgot your current code?{' '}
                  <button
                    disabled={resetBtnDisabled}
                    onClick={handleGenerateOtp}
                    // onClick={() => setFormStep('reset')}
                    type="button"
                    className={cs('ss-font-bold focus:ss-focus-ring ss-rounded', {
                      'ss-opacity-60 ss-cursor-not-allowed': resetBtnDisabled
                    })}>
                    reset here {countDown > 0 && isStarted && `in ${convertToTime(countDown)}`}
                  </button>
                </Text>
              </Box>
            )}
            {(formStep === 'initial-new-code' || formStep === 'reset-new-code') && (
              <>
                <Box className="ss-mb-8">
                  <Text className="ss-text-center ss-mb-4">Enter new code</Text>
                  <OtpField name="newCode" length={4} />
                </Box>
                <Box>
                  <Text className="ss-text-center ss-mb-4">Confirm new code</Text>
                  <OtpField name="confirmNewCode" length={4} />
                </Box>
              </>
            )}
            {formStep === 'reset-otp' && (
              <>
                <Box className="">
                  <Text className="ss-text-center ss-mb-4">Enter OTP</Text>
                  <OtpField name="otpCode" length={6} />
                </Box>
              </>
            )}
          </Box>
          {formStep === 'reset' && (
            <Box>
              <Image alt="" src={lock} imgClasses="ss-w-32 ss-h-32 ss-mx-auto ss-mb-5" />
              <Text
                className="ss-text-neutral-500 ss-font-bold ss-text-center"
                variant="paragraphLarge">
                Reset Code
              </Text>
              <Text className="ss-text-neutral-400 ss-text-center">
                We sent an OTP to your registered phone number
              </Text>
            </Box>
          )}
        </Box>
        {(formStep === 'initial-new-code' || formStep === 'reset-new-code') && (
          <Box className="ss-bg-white ss-px-4 ss-py-4 ss-rounded-base ss-mb-8">
            <FormField
              name="password"
              type="password"
              icon={LockOutline}
              label="Enter your password"
            />
          </Box>
        )}
        <Box className="ss-space-y-3">
          {(formStep === 'initial' || formStep === 'reset-new-code') && (
            <Button
              disabled={resetPinLoading}
              showSpinner={resetPinLoading}
              label="Change code"
              type="submit"
              isBlock
            />
          )}
          {formStep === 'initial-new-code' && (
            <>
              <Button
                disabled={changePinLoading}
                showSpinner={changePinLoading}
                label="Confirm"
                type="submit"
                isBlock
              />
              <Button
                onClick={handleGoBackToCurrentPin}
                isBlock
                label="Go Back"
                variant="secondary"
              />
            </>
          )}
          {formStep === 'reset' && (
            <Button label="Change code" onClick={() => setFormStep('reset-otp')} isBlock />
          )}
          {formStep === 'reset-otp' && <Button label="Next" type="submit" isBlock />}
        </Box>
      </Form>
    </Dialog2>
  );
};

export default ChangeCode;
