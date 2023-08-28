import { Box, Button, ExtraInfo, FormField, Text } from '@sendsprint/ui-react';
import {
  CalendarOutline,
  EmailOutline,
  PersonOutline,
  PhoneOutline,
  PinOutline
} from '@sendsprint/ui-react/dist/icons';
import { useField } from 'formik';
import React from 'react';
import { FormSteps } from '.';
import ResolvedFormField from './ResolvedFormField';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleToggleStep: (arg: FormSteps) => void;
  fieldsData: string[];
  addRecipientLoading: boolean;
  isWithoutAccountInfo: boolean;
}

const RecipientInfo = ({
  handleToggleStep,
  fieldsData,
  addRecipientLoading,
  isWithoutAccountInfo
}: Props) => {
  const [{ value }] = useField('paymentType');

  return (
    <Box>
      <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-4 ss-p-4 ss-rounded-lg ss-mb-6">
        <Text className="ss-text-neutral-400 ss-font-bold">
          Recipient&apos;s personal information
        </Text>
        {(value === 'NG-CASH' || value === 'NG-A-DOM') && (
          <ExtraInfo
            variant="warning"
            extraInfo="Enter the recipient's first & last name as it appears on their government issued ID"
          />
        )}
        <ResolvedFormField fieldName="firstName" fieldsData={fieldsData}>
          <FormField icon={PersonOutline} name="firstName" label="First name" />
        </ResolvedFormField>
        <ResolvedFormField fieldName="middleName" fieldsData={fieldsData}>
          <FormField icon={PersonOutline} name="middleName" label="Middle name" />
        </ResolvedFormField>
        <ResolvedFormField fieldName="lastName" fieldsData={fieldsData}>
          <FormField icon={PersonOutline} name="lastName" label="Last name" />
        </ResolvedFormField>
        <ResolvedFormField fieldName="birthday" fieldsData={fieldsData}>
          <FormField
            icon={CalendarOutline}
            name="birthday"
            type="date"
            label="Recipient's birthday (Optional)"
          />
        </ResolvedFormField>
      </Box>
      <Box className="ss-bg-white ss-flex ss-flex-col ss-gap-4 ss-p-4 ss-rounded-lg ss-mb-6">
        <Text className="ss-text-neutral-400 ss-font-bold">
          Recipient&apos;s contact information
        </Text>
        <ExtraInfo
          variant="warning"
          extraInfo="Please ensure the recipient's phone number & email address are correct. We'll notify the recipient once you've made payment."
        />
        <ResolvedFormField fieldName="phoneNumber" fieldsData={fieldsData}>
          <FormField icon={PhoneOutline} name="phoneNumber" type="tel" label="Phone number" />
        </ResolvedFormField>
        <ResolvedFormField fieldName="email" fieldsData={fieldsData}>
          <FormField icon={EmailOutline} name="email" type="email" label="Email address" />
        </ResolvedFormField>
        <ResolvedFormField fieldName="address" fieldsData={fieldsData}>
          <FormField icon={PinOutline} name="address" label="Recipient's address" />
        </ResolvedFormField>
      </Box>
      <Box className="ss-flex ss-gap-6 ss-items-center">
        {!isWithoutAccountInfo && (
          <Button
            onClick={() => handleToggleStep(1)}
            className="ss-flex-1"
            label="Back"
            variant="secondary"
          />
        )}
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
