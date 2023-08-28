import Api from '@sendsprint/api-types';
import { Box, Button, Form, FormField } from '@sendsprint/ui-react';
import {
  CalendarOutline,
  MapOutline,
  PhoneOutline,
  PinOutline
} from '@sendsprint/ui-react/dist/icons';
import { Recaptcha } from '@src/components';
import { SetAddressFormData } from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm';
import CountryField from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm/CountryField';
import PostCodeField from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm/PostCodeField';
import StateField from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm/StateField';
import OtpModal from '@src/components/sendMoneyFlow/components/addressStep/otpModal';
import { addressStepValidationSchema } from '@src/components/sendMoneyFlow/utils/addressStep';
import { useAccount, useToasts } from '@src/contexts';
import { useAddressUpdate, useGetSendCountries } from '@src/hooks';
import { removeTelCodeFromNumber } from '@src/utils/getCountryTelCode';
import { FormikHelpers, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

interface Props {
  handleClose: () => void;
  handleStartTimer: () => void;
  countDown: number;
  isStarted: boolean;
}

const AddressUpdateFormInner = ({ handleClose, handleStartTimer, countDown, isStarted }: Props) => {
  const { userAddress, setAddress } = useAccount();
  const [selectedCountry, setSelectedCountry] = useState<Api.Model.CountryInitials | undefined>(
    userAddress?.country || Api.Model.CountryInitials.UnitedKingdom
  );
  const [isSamePhone, setIsSamePhone] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const formattedPhoneNo = removeTelCodeFromNumber(
    userAddress?.country || ('' as Api.Model.CountryInitials),
    userAddress?.phone || ''
  );

  const [initialValues, setInitialValues] = useState<SetAddressFormData>({
    streetAddress: '',
    postCode: '',
    city: '',
    country: Api.Model.CountryInitials.UnitedKingdom,
    phone: '',
    state: '',
    dateOfBirth: '',
    captcha: '',
    otp: ''
  });

  const { addToast } = useToasts();

  const handleSuccess = () => {
    handleClose();
    addToast(
      {
        title: 'Address update successful',
        body: 'Your address was saved successfully.'
      },
      { appearance: 'success' }
    );
  };
  const {
    handleChangePhoneNo,
    handleUserDetailsUpdate,
    isPhoneNumberModalShown,
    phoneUpdateLoading,
    stepsForPhoneUpdate,
    verifyStatus,
    handlePhoneNumberClose
  } = useAddressUpdate({ type: 'setAddress', onSubmitSuccess: handleSuccess });
  const { data: sendCountries = [] } = useGetSendCountries();

  useEffect(() => {
    if (userAddress) {
      setInitialValues({
        city: userAddress.city,
        country: userAddress.country,
        phone: formattedPhoneNo || userAddress.phone || '',
        postCode: userAddress.postCode,
        streetAddress: userAddress.street,
        dateOfBirth: userAddress.dateOfBirth || '',
        state: userAddress.state || '',
        otp: '',
        captcha: ''
      });
    }
  }, [userAddress, formattedPhoneNo]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const validationSchema = addressStepValidationSchema(selectedCountry!, stepsForPhoneUpdate);

  const handleSubmit = async (
    values: SetAddressFormData,
    formikHelpers: FormikHelpers<SetAddressFormData>
  ) => {
    if (isSamePhone) {
      setIsAddressLoading(true);
      const res = await setAddress(values);

      if (res) {
        handleSuccess();
        setIsAddressLoading(false);
      }
    } else {
      handleUserDetailsUpdate(values, formikHelpers);
    }

    setIsAddressLoading(false);
  };

  return (
    <Form<SetAddressFormData>
      initialValues={initialValues as SetAddressFormData}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize>
      <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-mb-5 ss-rounded ss-space-y-4">
        <ResolveSameNumber setIsSamePhone={setIsSamePhone} />
        <CountryField
          countries={sendCountries}
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
          disabled={isAddressLoading || phoneUpdateLoading || (countDown > 0 && isStarted)}
          showSpinner={isAddressLoading || phoneUpdateLoading}
          isBlock
          type="submit"
        />
      </Box>
    </Form>
  );
};

interface ResolveSameNumberProps {
  setIsSamePhone: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResolveSameNumber = ({ setIsSamePhone }: ResolveSameNumberProps) => {
  const { userAddress } = useAccount();
  const { values } = useFormikContext<SetAddressFormData>();

  useEffect(() => {
    const formattedNumber = removeTelCodeFromNumber(
      userAddress?.country || Api.Model.CountryInitials.UnitedKingdom,
      userAddress?.phone || ''
    );
    if (formattedNumber === values.phone) {
      setIsSamePhone(true);
    } else {
      setIsSamePhone(false);
    }
  }, [values.phone]);

  return null;
};

export default AddressUpdateFormInner;
