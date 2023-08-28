import Api from '@sendsprint/api-types';
import { Box, Button, Form, FormField, FormProps, Text } from '@sendsprint/ui-react';
import {
  CalendarOutline,
  MapOutline,
  PhoneOutline,
  PinOutline
} from '@sendsprint/ui-react/dist/icons';
import { useMixpanel } from '@src/contexts';
import { useAddressUpdate, useCountDown } from '@src/hooks';
import { addressStepValidationSchema } from '../../../utils/addressStep';
import ClientApi from '@src/types/client';
import { mixpanelEvents } from '@src/types/mixpanel';
import React, { useState } from 'react';
import OtpModal from '../otpModal';
import PostCodeField from './PostCodeField';
import CountryField from './CountryField';
import { Recaptcha } from '@src/components/form';
import { RESEND_OTP_COUNTDOWN_TIME } from '@src/constants';
import { convertToTime } from '@src/utils';
import StateField from './StateField';

export type SetAddressFormProps = {
  formData?: SetAddressFormData;
  countries: ClientApi.SendCountry[];
  // eslint-disable-next-line no-unused-vars
  onSubmitSuccess?: (value: SetAddressFormData) => void | (() => void);
  onSubmit: FormProps<SetAddressFormData>['onSubmit'];
};

export type SetAddressFormData = {
  streetAddress: string;
  postCode: string;
  city: string;
  country: Api.Model.CountryInitials;
  phone: string;
  dateOfBirth: string;
  state: string;
  captcha?: string;
  otp?: string;
};

const initialValues: ClientApi.InitialFormData<SetAddressFormData> = {
  streetAddress: '',
  postCode: '',
  city: '',
  country: '',
  state: '',
  phone: '',
  dateOfBirth: '',
  captcha: '',
  otp: ''
};

const AddressStepForm = ({
  countries,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  onSubmit,
  formData,
  onSubmitSuccess
}: SetAddressFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Api.Model.CountryInitials | undefined>(
    countries[0].initials
  );

  const { countDown, handleStartTimer, isStarted } = useCountDown({
    countDownValue: RESEND_OTP_COUNTDOWN_TIME
  });

  const { mixpanelInstance } = useMixpanel();

  const {
    formState,
    handleChangePhoneNo,
    handlePhoneNumberSuccessClose,
    handleUserDetailsUpdate,
    isPhoneNumberModalShown,
    phoneUpdateLoading,
    stepsForPhoneUpdate,
    verifyStatus,
    handlePhoneNumberClose
  } = useAddressUpdate({ type: 'setAddress', onSubmitSuccess: handlePhoneNumberSuccessCloseBtn });

  function handlePhoneNumberSuccessCloseBtn() {
    handlePhoneNumberSuccessClose();
    mixpanelInstance.track(mixpanelEvents.CompleteAddressStep);

    if (onSubmitSuccess && formState) {
      onSubmitSuccess(formState);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const validationSchema = addressStepValidationSchema(selectedCountry!, stepsForPhoneUpdate);

  return (
    <Form<SetAddressFormData>
      initialValues={formData || (initialValues as SetAddressFormData)}
      onSubmit={handleUserDetailsUpdate}
      validationSchema={validationSchema}
      enableReinitialize>
      <Text className="ss-text-neutral-400 ss-mb-6 ss-font-bold">
        Where are you sending money from?
        {isStarted && countDown > 0 && (
          <Text variant="paragraphSmall" className="ss-mt-2">
            Remaining {convertToTime(countDown)}
          </Text>
        )}
      </Text>
      <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-mb-5 ss-rounded ss-space-y-4">
        <CountryField
          countries={countries}
          name="country"
          setSelectedCountry={setSelectedCountry}
        />
        <StateField countryFieldName="country" name="state" />
        <FormField icon={MapOutline} name="city" label="City" />
        <FormField icon={PinOutline} name="streetAddress" label="Street address" />
        <PostCodeField />
        <FormField
          label="Phone Number"
          extraInfo="We'll verify this number with an SMS to protect your account. Pls make sure you have access to your number because changing this number
          would take up to 2 minutes."
          type="tel"
          name="phone"
          icon={PhoneOutline}
        />
        <FormField name="dateOfBirth" type="date" label="Date of birth" icon={CalendarOutline} />
        <Recaptcha fieldName="captcha" />
        <OtpModal
          state={isPhoneNumberModalShown}
          handleSubmit={handleUserDetailsUpdate}
          stepsForPhoneUpdate={stepsForPhoneUpdate}
          changePhoneNumber={handleChangePhoneNo}
          phoneUpdateLoading={phoneUpdateLoading}
          verifyStatus={verifyStatus}
          handlePhoneNumberClose={handlePhoneNumberClose}
          counter={countDown}
          handleStartTimer={handleStartTimer}
          isStarted={isStarted}
        />
      </Box>
      <Box>
        <Button
          label="Continue"
          disabled={phoneUpdateLoading || (countDown > 0 && isStarted)}
          showSpinner={phoneUpdateLoading}
          isBlock
          type="submit"
        />
      </Box>
    </Form>
  );
};

export default AddressStepForm;
