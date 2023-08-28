import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { useAccount, useMixpanel } from '@src/contexts';
import { generateOtpService, verifyOtpService } from '@src/services/account-service';
import { getState } from '@src/utils/stateStorage';
import { useCallback, useEffect, useState } from 'react';
import { mixpanelEvents } from '@src/types/mixpanel';
import { UpdatePhoneNumberData } from '@src/components/sendMoneyFlow/components/phoneNumberUpdate';
import { SetAddressFormData } from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm';
import { addTelCode } from '@src/utils/getCountryTelCode';

type GenerateOtpPayloadI = Omit<ClientApi.GenerateOtpI, 'otp'>;
export type UpdateType = 'phoneUpdate' | 'setAddress';

interface UseAddressUpdateOptions {
  type: UpdateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  onSubmitSuccess?: (value: any) => void;
  hash?: string;
  email?: string;
}

/**
 * custom hook to handle address and phone number update
 * it also handles the otp logic
 */
const useAddressUpdate = ({ onSubmitSuccess, type, hash, email }: UseAddressUpdateOptions) => {
  const [phoneUpdateLoading, setPhoneUpdateLoading] = useState(false);
  const [stepsForPhoneUpdate, setStepsForPhoneUpdate] = useState<
    'initial' | 'generated' | 'verified'
  >('initial');
  const [verifyStatus, setVerifyStatus] = useState<boolean | null>(null);
  const [phoneNumberVal, setPhoneNumberVal] = useState('');
  const [isPhoneNumberModalShown, setIsPhoneNumberModalShown] = useState(false);
  const [isPhoneNumberSuccessModalShown, setIsPhoneNumberSuccessModalShown] = useState(false);
  const [formState, setFormState] = useState<SetAddressFormData>();
  const [addressResponse, setAddressResponse] = useState<ClientApi.UserAddress>();

  const { mixpanelInstance } = useMixpanel();
  const { userAddress, setAddress, user } = useAccount();
  const state = getState();

  const handlePhoneNumberClose = () => {
    setIsPhoneNumberModalShown(false);
    setStepsForPhoneUpdate('initial');
  };

  const handlePhoneNumberSuccessClose = () => {
    setIsPhoneNumberSuccessModalShown(false);
  };

  const handleGenerateOtp = async (
    payload: GenerateOtpPayloadI,
    values: UpdatePhoneNumberData | SetAddressFormData
  ) => {
    setPhoneUpdateLoading(true);
    try {
      const res = await generateOtpService({
        ...payload,
        hash: hash || payload.hash,
        email: email || payload.email
      });
      const addressValues = values as SetAddressFormData;

      if (res?.data?.ResponseCode === Api.Endpoint.Response.Code.Successful) {
        const countryCode =
          type === 'phoneUpdate'
            ? state?.address?.country || Api.Model.CountryInitials.UnitedKingdom
            : addressValues.country || Api.Model.CountryInitials.UnitedKingdom;

        setIsPhoneNumberModalShown(true);
        setPhoneNumberVal(addTelCode(countryCode, values.phone));
        setStepsForPhoneUpdate('generated');

        mixpanelInstance.track(mixpanelEvents.GenerateOTPSuccess);
      }

      if (type === 'phoneUpdate') {
        setFormState({
          city: userAddress?.city || '',
          country: userAddress?.country || ('US' as Api.Model.CountryInitials),
          phone: addTelCode(
            state?.address?.country || Api.Model.CountryInitials.UnitedKingdom,
            values.phone
          ),
          postCode: userAddress?.postCode || '',
          streetAddress: userAddress?.street || '',
          dateOfBirth: userAddress?.dateOfBirth || '',
          state: userAddress?.state || ''
        });
      }

      if (type === 'setAddress') {
        setFormState({
          city: addressValues?.city || '',
          country: addressValues?.country || ('US' as Api.Model.CountryInitials),
          phone: addTelCode(
            addressValues?.country || Api.Model.CountryInitials.UnitedKingdom,
            values.phone
          ),
          postCode: addressValues?.postCode || '',
          streetAddress: addressValues?.streetAddress || '',
          dateOfBirth: addressValues?.dateOfBirth || '',
          state: addressValues?.state || ''
        });
      }

      setPhoneUpdateLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setPhoneUpdateLoading(false);
      mixpanelInstance.track(mixpanelEvents.GenerateOTPFailed, {
        error: e?.ResponseMessage || 'Error occured'
      });
    }
  };

  const handleVerifyOtp = async (payload: ClientApi.GenerateOtpI) => {
    // mixpanelInstance.track(mixpanelEvents.TriggerVerifyOTP);
    setPhoneUpdateLoading(true);
    try {
      const res = await verifyOtpService({
        ...payload,
        hash: hash || payload.hash,
        email: email || payload.email
      });

      if (res?.data?.ResponseCode === Api.Endpoint.Response.Code.Successful) {
        setStepsForPhoneUpdate('verified');
        setVerifyStatus(true);
        mixpanelInstance.track(mixpanelEvents.VerifyOTPSuccess);
      }

      if (res?.data?.ResponseCode === Api.Endpoint.Response.Code.DataNotFound) {
        setVerifyStatus(false);
        mixpanelInstance.track(mixpanelEvents.VerifyOTPFailed);
      }

      setPhoneUpdateLoading(false);
    } catch (error) {
      setPhoneUpdateLoading(false);
      mixpanelInstance.track(mixpanelEvents.VerifyOTPFailed);
    }
  };

  /**
   * handles generating otp and verifying otp
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUserDetailsUpdate = async (values: any, helpers: any) => {
    const hashVal = (state && state.hash) || hash || '';

    setPhoneUpdateLoading(true);
    if (stepsForPhoneUpdate === 'initial') {
      const countryCode =
        type === 'phoneUpdate'
          ? state?.address?.country || Api.Model.CountryInitials.UnitedKingdom
          : values?.country || Api.Model.CountryInitials.UnitedKingdom;

      const payload: GenerateOtpPayloadI = {
        email: user?.email || '',
        hash: hashVal,
        phone: addTelCode(countryCode, values.phone)
      };

      helpers.setTouched({
        otp: false
      });

      handleGenerateOtp(payload, values);
    } else if (stepsForPhoneUpdate === 'generated') {
      const countryCode =
        type === 'phoneUpdate'
          ? state?.address?.country || Api.Model.CountryInitials.UnitedKingdom
          : formState?.country || Api.Model.CountryInitials.UnitedKingdom;

      const payload: ClientApi.GenerateOtpI = {
        email: user?.email || '',
        hash: hashVal,
        phone: addTelCode(countryCode, values.phone),
        otp: values.otp || ''
      };

      handleVerifyOtp(payload);
    }
  };

  /**
   * handles the final address update
   */
  const handleAddressUpdate = useCallback(async () => {
    setPhoneUpdateLoading(true);
    const payload: SetAddressFormData = {
      city: formState?.city || '',
      country: formState?.country as Api.Model.CountryInitials,
      phone: formState?.phone || phoneNumberVal,
      postCode: formState?.postCode || '',
      streetAddress: formState?.streetAddress || '',
      dateOfBirth: formState?.dateOfBirth || '',
      state: formState?.state || ''
    };

    try {
      const res = await setAddress({ ...payload, hash, email });

      if (res) {
        setAddressResponse(res);
      }

      handlePhoneNumberClose();
      setIsPhoneNumberSuccessModalShown(true);
      setPhoneUpdateLoading(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(payload);
      }
    } catch (e) {
      setPhoneUpdateLoading(false);
      // helpers.setSubmitting(false);
    }
  }, [
    formState?.city,
    formState?.country,
    formState?.phone,
    formState?.postCode,
    formState?.streetAddress,
    phoneNumberVal,
    setAddress
  ]);

  /**
   * handles change phone number btn
   */
  const handleChangePhoneNo = () => {
    setStepsForPhoneUpdate('initial');
    setIsPhoneNumberModalShown(false);
    setVerifyStatus(null);
  };

  /**
   * effect that triggers the final address update
   */
  useEffect(() => {
    if (stepsForPhoneUpdate === 'verified') {
      handleAddressUpdate();
    }
  }, [handleAddressUpdate, stepsForPhoneUpdate]);

  return {
    phoneUpdateLoading,
    verifyStatus,
    isPhoneNumberModalShown,
    isPhoneNumberSuccessModalShown,
    handleAddressUpdate,
    handleUserDetailsUpdate,
    formState,
    handleChangePhoneNo,
    handlePhoneNumberSuccessClose,
    stepsForPhoneUpdate,
    setIsPhoneNumberModalShown,
    handlePhoneNumberClose,
    addressResponse
  };
};

export default useAddressUpdate;
