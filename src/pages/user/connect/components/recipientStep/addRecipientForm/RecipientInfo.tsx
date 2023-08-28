import { Box, Button, ExtraInfo, FormField, FormFieldDropdown, Text } from '@sendsprint/ui-react';
import {
  CalendarOutline,
  EmailOutline,
  Globe2Outline,
  MapOutline,
  PersonOutline,
  PhoneOutline,
  PinOutline
} from '@sendsprint/ui-react/dist/icons';
import ClientApi from '@src/types/client';
import React from 'react';

interface Props {
  addRecipientLoading: boolean;
  receiveCountries: ClientApi.GiftCountries[];
}

const RecipientInfo = ({ addRecipientLoading, receiveCountries }: Props) => {
  // useEffect(() => {
  //   if (receiveCountries.length) {
  //     setValue(Api.Model.CountryInitials.Nigeria);
  //   }
  // }, [receiveCountries]);

  return (
    <Box>
      <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-4 ss-p-4 ss-rounded-lg ss-mb-6">
        <Text className="ss-text-neutral-400 ss-font-bold">
          Recipient&apos;s personal information
        </Text>
        <FormField icon={PersonOutline} name="firstName" label="First name" />
        <FormField icon={PersonOutline} name="middleName" label="Middle name" />
        <FormField icon={PersonOutline} name="lastName" label="Last name" />
        <FormField
          icon={CalendarOutline}
          name="birthday"
          type="date"
          label="Recipient's birthday (Optional)"
        />
      </Box>
      <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-4 ss-p-4 ss-rounded-lg ss-mb-6">
        <Text className="ss-text-neutral-400 ss-font-bold">
          Recipient&apos;s contact information
        </Text>
        <ExtraInfo
          variant="warning"
          extraInfo="Please ensure the recipient's phone number & email address are correct. We'll notify the recipient once you've made payment."
        />
        <FormField icon={PhoneOutline} name="phoneNumber" type="tel" label="Phone number" />
        <FormField icon={EmailOutline} name="email" type="email" label="Email address" />
        <FormField icon={PinOutline} name="address" label="Recipient's address " />
        <FormField icon={MapOutline} name="city" label="City" />
        <FormFieldDropdown
          emptyOptionLabel=""
          data={receiveCountries}
          optionLabel="Name"
          optionValue="Initials"
          optionIcon="Initials"
          icon={Globe2Outline}
          name="country"
          label="Country"
          disabled
        />
      </Box>
      <Box className="ss-flex ss-gap-6 ss-items-center">
        <Button
          type="submit"
          showSpinner={addRecipientLoading}
          disabled={addRecipientLoading}
          className="ss-flex-1"
          label="Save"
        />
      </Box>
    </Box>
  );
};

export default RecipientInfo;
