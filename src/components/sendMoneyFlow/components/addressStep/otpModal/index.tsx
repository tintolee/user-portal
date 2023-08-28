/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Icon, Text, useId } from '@sendsprint/ui-react';
import { PhoneNumberImage } from './assets';
import Api from '@sendsprint/api-types';
import { FormikHelpers, useField, useFormikContext } from 'formik';
import OtpField from './OtpField';
import { getState } from '@src/utils/stateStorage';
import { generateOtpService } from '@src/services/account-service';
import ClientApi from '@src/types/client';
import { getCountryTelCode } from '@src/utils';
import { useAccount, useMixpanel } from '@src/contexts';
import { mixpanelEvents } from '@src/types/mixpanel';
import { UpdatePhoneNumberData } from '../../phoneNumberUpdate';
import { SetAddressFormData } from '../addressStepForm';
import { Dialog2 } from '@src/components';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';

const convertToTime = (counter: number) => {
  let min: string | number = Math.floor(counter / 60);
  min = min < 10 ? `0${min}` : min;

  let secs: string | number = counter % 60;
  secs = secs < 10 ? `0${secs}` : secs;

  return `${min}:${secs}`;
};

interface Props {
  state: boolean;
  handleSubmit?: (values: SetAddressFormData, helpers: FormikHelpers<SetAddressFormData>) => void;
  handlePhoneSubmit?: (
    values: UpdatePhoneNumberData,
    helpers: FormikHelpers<UpdatePhoneNumberData>
  ) => void;
  changePhoneNumber?: () => void;
  handlePhoneNumberClose: () => void;
  phoneUpdateLoading?: boolean;
  verifyStatus?: boolean | null;
  stepsForPhoneUpdate?: 'initial' | 'generated' | 'verified';
  counter: number;
  handleStartTimer: () => void;
  isStarted: boolean;
  queryValues?: {
    email: string | null;
    hash: string | null;
  };
}

const OtpModal: FC<Props> = ({
  state,
  handleSubmit,
  stepsForPhoneUpdate,
  changePhoneNumber,
  phoneUpdateLoading,
  verifyStatus,
  handlePhoneSubmit,
  handlePhoneNumberClose,
  counter,
  handleStartTimer,
  isStarted,
  queryValues
}) => {
  const titleId = useId();
  const { user } = useAccount();
  const formikContext = useFormikContext();

  // effect to handle timer
  useEffect(() => {
    if (stepsForPhoneUpdate !== 'initial' && counter > 0) {
      if (handleStartTimer) {
        handleStartTimer();
      }
    }
  }, [stepsForPhoneUpdate]);

  const submit = () => {
    formikContext.submitForm();
  };

  // const handleModalClose = (otherFunc?: () => void) => {
  //   setCounter(RESEND_OTP_COUNTDOWN_TIME);

  //   if (otherFunc) {
  //     otherFunc();
  //   }
  // };

  return (
    <>
      <Dialog2
        isOpen={state}
        handleClose={() => null}
        aria-labelledby={titleId}
        disableOverlayClick>
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-gap-4 ss-items-center">
          <Text className="ss-text-neutral-500 ss-flex-1" variant="h5">
            Phone Number Verification
          </Text>
          <Button
            onClick={handlePhoneNumberClose}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <Box className="ss-bg-white ss-p-4 ss-rounded-lg ss-mb-6">
          <div className="ss-text-center ss-bg-neutral-5 ss-flex ss-justify-center ss-py-12">
            <img src={PhoneNumberImage} className="ss-w-36" alt="phone" />
          </div>
          <Box className="ss-max-w-4xl ss-mx-auto">
            <div className="ss-mb-10 ss-space-y-4">
              <OtpScreen
                changePhoneNumber={changePhoneNumber}
                titleId={titleId}
                counter={counter}
                user={user}
                verifyStatus={verifyStatus}
                handleStartTimer={handleStartTimer}
                isStarted={isStarted}
                queryValues={queryValues}
              />
            </div>
            <div className="ss-space-y-6"></div>
          </Box>
        </Box>

        <Box className="ss-text-center ss-max-w-4xl ss-mx-auto">
          <div>
            <>
              <Button
                className="ss-mb-6"
                label="Verify phone number"
                variant="primary"
                type="button"
                onClick={submit}
                // type="submit"
                isBlock={true}
                showSpinner={phoneUpdateLoading}
                disabled={phoneUpdateLoading}
              />
            </>
          </div>
        </Box>
      </Dialog2>
    </>
  );
};

interface OtpScreenProps {
  titleId: string;
  changePhoneNumber?: () => void;
  counter: number;
  user?: ClientApi.UserProfile | null;
  verifyStatus?: boolean | null;
  handleStartTimer?: () => void;
  isStarted?: boolean;
  queryValues?: {
    email: string | null;
    hash: string | null;
  };
}

const OtpScreen: React.FC<OtpScreenProps> = ({
  titleId,
  changePhoneNumber,
  counter,
  user,
  verifyStatus,
  handleStartTimer,
  isStarted,
  queryValues
}) => {
  const field = useField('phone');
  const otpField = useField('otp');
  const phoneValue: string = field[0].value;
  const [resendLoading, setResendLoading] = useState(false);
  const { mixpanelInstance } = useMixpanel();

  const resendFunc = async () => {
    const state = getState();
    const hash = (state && state.hash) || queryValues?.hash || '';

    setResendLoading(true);

    const payload: Omit<ClientApi.GenerateOtpI, 'otp'> = {
      email: user?.email || queryValues?.email || '',
      hash: hash,
      phone: `${getCountryTelCode(
        state?.address?.country || Api.Model.CountryInitials.UnitedKingdom
      )}${field[0].value}`
      // phone: field[0].value,
    };
    try {
      const res = await generateOtpService(payload);

      if (res?.data?.ResponseCode === Api.Endpoint.Response.Code.Successful) {
        if (handleStartTimer) {
          handleStartTimer();
        }

        mixpanelInstance.track(mixpanelEvents.ResendOTP);
      }

      setResendLoading(false);
    } catch (error) {
      setResendLoading(false);
    }
  };

  const handleChangePhone = () => {
    if (changePhoneNumber) {
      changePhoneNumber();
    }

    otpField[2].setValue('');
  };

  return (
    <>
      {/* <Text as="h6" className="ss-text-center" id={titleId}>
        We sent you a code
      </Text> */}

      <Text className="ss-text-neutral-40 ss-text-center">
        Please enter the code we sent to ( .. ) ...... {phoneValue.slice(-3)}.
      </Text>

      <Box className="ss-text-center">
        {!isStarted && counter && (
          <Button
            type="button"
            variant="tertiary"
            isBlock
            onClick={handleChangePhone}
            label="Change your phone number"
          />
        )}
      </Box>
      <OtpField verifyStatus={verifyStatus} name="otp" />
      <Box className="ss-text-center">
        {isStarted && counter ? (
          <Text className="ss-text-neutral-60 ss-font-bold ss-my-2">
            Resend code in {convertToTime(counter)}
          </Text>
        ) : (
          ''
        )}
        {!isStarted && counter && (
          <Box className="ss-flex ss-items-center ss-justify-center ss-gap-2">
            <p className="ss-text-neutral-400">Didn&apos;t get the code?</p>
            <button
              disabled={resendLoading}
              onClick={resendFunc}
              className="ss-outline-none focus:ss-focus-ring ss-text-primary1-500 ss-font-bold">
              {resendLoading ? 'Loading...' : 'Resend it'}
            </button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default OtpModal;
