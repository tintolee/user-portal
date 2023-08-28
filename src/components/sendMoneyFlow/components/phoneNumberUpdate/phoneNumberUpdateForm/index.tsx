import { Box, Button, Form, FormField, Text } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import React from 'react';
import { UpdatePhoneNumberData } from '..';
import { SetAddressFormData } from '../../addressStep/addressStepForm';
import * as yup from 'yup';
import { phoneSchemaFactory } from '@src/validations';
import { useAccount, useMixpanel } from '@src/contexts';
import { PhoneOutline } from '@sendsprint/ui-react/dist/icons';
import { useAddressUpdate, useCountDown } from '@src/hooks';
import { mixpanelEvents } from '@src/types/mixpanel';
import OtpModal from '../../addressStep/otpModal';
import { Recaptcha } from '@src/components/form';
import { RESEND_OTP_COUNTDOWN_TIME } from '@src/constants';
import { convertToTime } from '@src/utils';

interface PhoneNumberFormProps {
  formData?: UpdatePhoneNumberData;
  // eslint-disable-next-line no-unused-vars
  onSubmitSuccess: (value: SetAddressFormData) => void;
}

const initialValues: ClientApi.InitialFormData<UpdatePhoneNumberData> = {
  phone: '',
  otp: '',
  captcha: ''
};

const PhoneNumberUpdateForm = ({ onSubmitSuccess, formData }: PhoneNumberFormProps) => {
  const { userAddress } = useAccount();
  const { mixpanelInstance } = useMixpanel();

  const { countDown, handleStartTimer, isStarted } = useCountDown({
    countDownValue: RESEND_OTP_COUNTDOWN_TIME
  });

  const {
    formState,
    handleChangePhoneNo,
    handlePhoneNumberSuccessClose,
    handleUserDetailsUpdate,
    isPhoneNumberModalShown,
    phoneUpdateLoading,
    verifyStatus,
    stepsForPhoneUpdate,
    handlePhoneNumberClose
  } = useAddressUpdate({ type: 'phoneUpdate', onSubmitSuccess: handlePhoneNumberSuccessCloseBtn });

  function handlePhoneNumberSuccessCloseBtn() {
    handlePhoneNumberSuccessClose();
    mixpanelInstance.track(mixpanelEvents.CompletePhoneNumberStep);

    if (onSubmitSuccess && formState) {
      onSubmitSuccess(formState);
    }
  }

  const validationSchema = yup.object().shape({
    phone: phoneSchemaFactory({
      countryCodeOrPath: userAddress?.country || 'US',
      required: true,
      numbersOnly: true
    }),
    // phone: yup.string(),
    captcha:
      stepsForPhoneUpdate === 'initial'
        ? yup.string().required('Please verify you are human')
        : yup.string().notRequired(),
    otp:
      stepsForPhoneUpdate === 'initial'
        ? yup.string().notRequired()
        : yup
            .string()
            .required('Please enter the otp sent')
            .numbersOnly('Please enter only digits')
            .length(6, 'Otp should be 6 digits')
    //   phone: addressSchema.phone,
  });
  return (
    <Form<UpdatePhoneNumberData>
      initialValues={formData || initialValues}
      onSubmit={handleUserDetailsUpdate}
      validationSchema={validationSchema}
      enableReinitialize>
      <Text className="ss-text-neutral-400 ss-mb-6 ss-font-bold">
        Please provide your phone number.
        {isStarted && countDown > 0 && (
          <Text variant="paragraphSmall" className="ss-mt-2">
            Remaining {convertToTime(countDown)}
          </Text>
        )}
      </Text>
      <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-mb-5 ss-rounded ss-space-y-4">
        <FormField
          label="Phone Number"
          extraInfo="We'll verify this number with an SMS to protect your account. Pls make sure you have access to your number because changing this number
          would take up to 2 minutes."
          type="tel"
          name="phone"
          icon={PhoneOutline}
        />
        <Recaptcha fieldName="captcha" />
        <OtpModal
          handlePhoneNumberClose={handlePhoneNumberClose}
          state={isPhoneNumberModalShown}
          // handleSubmit={handleSubmit}
          stepsForPhoneUpdate={stepsForPhoneUpdate}
          // stepsForPhoneUpdate={steps}
          changePhoneNumber={handleChangePhoneNo}
          phoneUpdateLoading={phoneUpdateLoading}
          verifyStatus={verifyStatus}
          counter={countDown}
          handleStartTimer={handleStartTimer}
          isStarted={isStarted}
        />
      </Box>
      <Box>
        <Button
          disabled={phoneUpdateLoading || (countDown > 0 && isStarted)}
          showSpinner={phoneUpdateLoading}
          label="Continue"
          isBlock
          type="submit"
        />
        {/* <Button
          label="Test"
          onClick={() => {
            if (onSubmitSuccess) {
              onSubmitSuccess({
                streetAddress: 'test',
                postCode: '11123',
                city: 'test',
                country: Api.Model.CountryInitials.Canada,
                phone: '+2340929923646',
                otp: '8383'
              });
            }
          }}
        /> */}
      </Box>
    </Form>
  );
};

export default PhoneNumberUpdateForm;
