import Api from '@sendsprint/api-types';
import { Box, Flag, Text } from '@sendsprint/ui-react';
import { getCountryNameFromInitials, getPostCodeLabel } from '@src/utils/address';
import React from 'react';
import { SetAddressFormData } from '../../addressStep/addressStepForm';
import EditButton from '../../editButton';
import { UpdatePhoneNumberData } from '../../phoneNumberUpdate';

interface Props {
  addressState: SetAddressFormData | undefined;
  phoneNumberState: UpdatePhoneNumberData | undefined;
  handleEdit: () => void;
}

const AddressSummary = ({ addressState, phoneNumberState, handleEdit }: Props) => {
  // when setting phone number, we also updated the address state. so, this works too
  if (!addressState) return null;

  const isPhoneNumberState = !!phoneNumberState;

  const { city, country, phone, postCode, streetAddress } = addressState;
  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-justify-between ss-mb-4">
        <Text className="ss-text-neutral-400 ss-font-bold">
          {isPhoneNumberState ? 'Phone number' : 'Your details'}
        </Text>
        <EditButton label="Edit" onEdit={handleEdit} />
      </Box>
      <Box className="ss-space-y-3">
        {phone && isPhoneNumberState && <InfoBlock label="Phone number" value={phone} />}
        {!isPhoneNumberState && country && (
          <InfoBlock
            label="Country"
            value={getCountryNameFromInitials(country)}
            country={country}
          />
        )}
        {!isPhoneNumberState && city && <InfoBlock label="City" value={city} />}
        {!isPhoneNumberState && streetAddress && (
          <InfoBlock label="Street ddress" value={streetAddress} />
        )}
        {!isPhoneNumberState && postCode && (
          <InfoBlock label={getPostCodeLabel(postCode)} value={postCode} />
        )}
        {!isPhoneNumberState && phone && <InfoBlock label="Phone number" value={phone} />}
      </Box>
    </Box>
  );
};

interface InfoBlockProps {
  label: string;
  value: string;
  country?: Api.Model.CountryInitials;
}

const InfoBlock = ({ label, value, country }: InfoBlockProps) => {
  return (
    <Box className="ss-bg-neutral-100 ss-py-2 ss-px-4 ss-rounded ss-flex ss-items-center ss-gap-3">
      {country && (
        <Box>
          <Flag countryInitials={country} />
        </Box>
      )}
      <Box>
        <Text variant="paragraphVerySmall" className="ss-text-neutral-400">
          {label}
        </Text>
        <Text>{value}</Text>
      </Box>
    </Box>
  );
};

export default AddressSummary;
