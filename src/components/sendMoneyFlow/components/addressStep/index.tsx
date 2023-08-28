import { Box, Skeleton } from '@sendsprint/ui-react';
import { useAccount, useMixpanel } from '@src/contexts';
import { useGetSendCountries } from '@src/hooks';
import { mixpanelEvents } from '@src/types/mixpanel';
import React, { useEffect, useState } from 'react';
import AddressStepForm, { SetAddressFormData, SetAddressFormProps } from './addressStepForm';
import SelectedAddress from './selectedAddress';

export type AddressStepProps = {
  formData?: SetAddressFormData;
  editMode?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmitSuccess: (value: SetAddressFormData) => void;
};

const AddressStep = ({ onSubmitSuccess, formData, editMode }: AddressStepProps) => {
  const { setAddress } = useAccount();
  const { mixpanelInstance } = useMixpanel();
  const { isLoading, error, data } = useGetSendCountries();
  const [isEditMode, setIsEditMode] = useState(editMode);

  const submitHandler: SetAddressFormProps['onSubmit'] = async (values, helpers) => {
    try {
      await setAddress(values);

      onSubmitSuccess(values);
    } catch (e) {
      helpers.setSubmitting(false);
    }
  };

  useEffect(() => {
    mixpanelInstance.track(mixpanelEvents.ViewingAddressStep);
  }, [mixpanelInstance]);

  if (formData && !isEditMode)
    return (
      <SelectedAddress
        onEdit={() => {
          setIsEditMode(true);
        }}
        onContinue={() => {
          onSubmitSuccess(formData);
        }}
        formData={formData}
      />
    );

  return (
    <Box>
      {(isLoading || error) && (
        <Box className="ss-space-y-4 ss-py-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="ss-h-16 ss-rounded" />
          ))}
        </Box>
      )}
      {data && (
        <AddressStepForm
          onSubmit={submitHandler}
          onSubmitSuccess={onSubmitSuccess}
          countries={data}
          formData={formData}
        />
      )}
    </Box>
  );
};

export default AddressStep;
