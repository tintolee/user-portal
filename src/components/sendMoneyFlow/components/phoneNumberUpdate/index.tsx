import Api from '@sendsprint/api-types';
import { useAccount, useMixpanel } from '@src/contexts';
import { mixpanelEvents } from '@src/types/mixpanel';
import React, { useEffect, useState } from 'react';
import { SetAddressFormData } from '../addressStep/addressStepForm';
import PhoneNumberUpdateForm from './phoneNumberUpdateForm';
import SelectedPhoneNumber from './selectedPhoneNumber';

export interface UpdatePhoneNumberData {
  phone: string;
  captcha?: string;
  otp?: string;
}

type UpdatePhoneNumberStepProps = {
  formData?: UpdatePhoneNumberData;
  editMode?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmitSuccess: (value: SetAddressFormData) => void;
};

const PhoneNumberUpdate = ({ onSubmitSuccess, formData, editMode }: UpdatePhoneNumberStepProps) => {
  const [isEditMode, setIsEditMode] = useState(editMode);
  const { userAddress } = useAccount();

  const { mixpanelInstance } = useMixpanel();
  useEffect(() => {
    mixpanelInstance.track(mixpanelEvents.ViewingPhoneNumberStep);
  }, [mixpanelInstance]);

  if (formData && !isEditMode)
    return (
      <SelectedPhoneNumber
        onEdit={() => {
          setIsEditMode(true);
        }}
        onContinue={() => {
          onSubmitSuccess({
            city: userAddress?.city || '',
            country: userAddress?.country || ('' as Api.Model.CountryInitials),
            postCode: userAddress?.postCode || '',
            streetAddress: userAddress?.street || '',
            phone: formData.phone,
            dateOfBirth: userAddress?.dateOfBirth || '',
            state: userAddress?.state || ''
          });
        }}
        formData={formData}
      />
    );

  return (
    <div>
      <PhoneNumberUpdateForm onSubmitSuccess={onSubmitSuccess} formData={formData} />
    </div>
  );
};

export default PhoneNumberUpdate;
