import { Box, Button, Flag, Text } from '@sendsprint/ui-react';
import { formatDate } from '@src/pages/user/profile/components/address';
import { getCountryNameFromInitials, getPostCodeLabel } from '@src/utils/address';
import React from 'react';
import EditButton from '../../editButton';
import ExpandedItem, { ExpandedItemSubTitle } from '../../recipientStep/recipientCard/ExpandedItem';
import { SetAddressFormData } from '../addressStepForm';

interface Props {
  formData: SetAddressFormData;
  onEdit: () => void;
  onContinue: () => void;
}

const SelectedAddress = ({ formData, onContinue, onEdit }: Props) => {
  return (
    <Box>
      <Text className="ss-text-neutral-400 ss-mb-6 ss-font-bold">
        Where are you sending money from?
      </Text>
      <Box className="ss-flex ss-items-center ss-mb-2 ss-justify-between">
        <Text variant="paragraphSmall" className="ss-text-neutral-40 ss-font-bold">
          Address
        </Text>
        <EditButton onEdit={onEdit} />
      </Box>
      <Box className="ss-relative ss-p-3 ss-py-4 md:ss-p-6 ss-bg-white ss-rounded focus-within:ss-focus-ring focus-within:ss-border-primary1-100">
        <Box className="ss-rounded ss-bg-neutral-100 ss-p-2 ss-mt-4 ss-flex ss-flex-wrap ss-text-neutral-60">
          {formData.country && (
            <ExpandedItem isSelectable={false} title="Country">
              <ExpandedItemSubTitle>
                <Box className="ss-flex ss-items-center ss-gap-2">
                  <Flag countryInitials={formData.country} />
                  <Text>{getCountryNameFromInitials(formData.country)}</Text>
                </Box>
              </ExpandedItemSubTitle>
            </ExpandedItem>
          )}
          {formData.city && (
            <ExpandedItem isSelectable={false} title="State">
              <ExpandedItemSubTitle>{formData.state}</ExpandedItemSubTitle>
            </ExpandedItem>
          )}
          {formData.city && (
            <ExpandedItem isSelectable={false} title="City">
              <ExpandedItemSubTitle>{formData.city}</ExpandedItemSubTitle>
            </ExpandedItem>
          )}
          {formData.streetAddress && (
            <ExpandedItem isSelectable={false} title="Street Address">
              <ExpandedItemSubTitle>{formData.streetAddress}</ExpandedItemSubTitle>
            </ExpandedItem>
          )}
          {formData.postCode && (
            <ExpandedItem isSelectable={false} title={getPostCodeLabel(formData.country)}>
              <ExpandedItemSubTitle>{formData.postCode}</ExpandedItemSubTitle>
            </ExpandedItem>
          )}
          {formData.phone && (
            <ExpandedItem isSelectable={false} title="Phone Number">
              <ExpandedItemSubTitle>{formData.phone}</ExpandedItemSubTitle>
            </ExpandedItem>
          )}
          {formData.phone && (
            <ExpandedItem isSelectable={false} title="Date of Birth">
              <ExpandedItemSubTitle>{formatDate(formData.dateOfBirth)}</ExpandedItemSubTitle>
            </ExpandedItem>
          )}
        </Box>
      </Box>
      <div className="ss-mt-8">
        <Button label="Continue" isBlock={true} onClick={onContinue} />
      </div>
    </Box>
  );
};

export default SelectedAddress;
