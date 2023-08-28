import Api from '@sendsprint/api-types';
import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import FormField from '@sendsprint/ui-react/dist/components/form2/formInput/FormInput';
import Text from '@sendsprint/ui-react/dist/components/Text';
import CalendarOutline from '@sendsprint/ui-react/dist/icons/CalendarOutline';
import MapOutline from '@sendsprint/ui-react/dist/icons/MapOutline';
import PhoneOutline from '@sendsprint/ui-react/dist/icons/PhoneOutline';
import PinOutline from '@sendsprint/ui-react/dist/icons/PinOutline';
import Recaptcha from '@src/components/form/Recaptcha';
import CountryField from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm/CountryField';
import PostCodeField from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm/PostCodeField';
import StateField from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm/StateField';
import OtpModal from '@src/components/sendMoneyFlow/components/addressStep/otpModal';
import ClientApi from '@src/types/client';
import { convertToTime } from '@src/utils/convertToTime';
import React from 'react';

export interface AddressFormInnerProps {
  setSelectedCountry: React.Dispatch<React.SetStateAction<Api.Model.CountryInitials | undefined>>;
  isPhoneNumberModalShown: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  handleUserDetailsUpdate: (values: any, helpers: any) => Promise<void>;
  stepsForPhoneUpdate: 'initial' | 'generated' | 'verified';
  handleChangePhoneNo: () => void;
  phoneUpdateLoading: boolean;
  verifyStatus: boolean | null;
  handlePhoneNumberClose: () => void;
  emailQuery: string | null;
  hashQuery: string | null;
  isStarted: boolean;
  handleStartTimer: () => void;
  countDown: number;
  sendCountries: ClientApi.SendCountry[];
}

const AddressFormInner = ({
  emailQuery,
  handleChangePhoneNo,
  handlePhoneNumberClose,
  handleUserDetailsUpdate,
  hashQuery,
  isPhoneNumberModalShown,
  phoneUpdateLoading,
  setSelectedCountry,
  stepsForPhoneUpdate,
  verifyStatus,
  isStarted,
  handleStartTimer,
  countDown,
  sendCountries
}: AddressFormInnerProps) => {
  return (
    <Box>
      <Text className="ss-text-left" variant="h3">
        Where are you sending from?
        {isStarted && countDown > 0 && (
          <Text variant="paragraphSmall" className="ss-mt-2">
            Remaining {convertToTime(countDown)}
          </Text>
        )}
      </Text>
      <Text className="ss-text-neutral-400 ss-mb-6" variant="paragraphLarge">
        For the best rates, let us know where you&apos;re sending from
      </Text>
      <Box className="ss-space-y-4">
        <CountryField
          countries={sendCountries}
          name="country"
          setSelectedCountry={setSelectedCountry}
        />
        <StateField countryFieldName="country" name="state" />
        <FormField icon={PinOutline} name="streetAddress" label="Street address" />
        <FormField icon={MapOutline} name="city" label="City" />
        <PostCodeField />
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
          queryValues={{
            email: emailQuery,
            hash: hashQuery
          }}
        />
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
        <Box className="ss-mt-6 ss-flex ss-gap-5">
          <Button
            type="submit"
            isBlock
            label="Continue"
            disabled={phoneUpdateLoading || isPhoneNumberModalShown || (countDown > 0 && isStarted)}
            showSpinner={phoneUpdateLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddressFormInner;
