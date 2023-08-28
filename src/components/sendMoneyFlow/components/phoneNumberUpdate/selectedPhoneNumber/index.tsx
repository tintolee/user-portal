import { Box, Button, Text } from '@sendsprint/ui-react';
import React from 'react';
import { UpdatePhoneNumberData } from '..';
import EditButton from '../../editButton';
import ExpandedItem, { ExpandedItemSubTitle } from '../../recipientStep/recipientCard/ExpandedItem';

interface Props {
  formData: UpdatePhoneNumberData;
  onEdit: () => void;
  onContinue: () => void;
}

const SelectedPhoneNumber = ({ formData, onContinue, onEdit }: Props) => {
  return (
    <Box>
      <Text className="ss-text-neutral-400 ss-mb-6 ss-font-bold">Your phone number</Text>
      <Box className="ss-flex ss-items-center ss-mb-2 ss-justify-between">
        <Text variant="paragraphSmall" className="ss-text-neutral-40 ss-font-bold">
          Phone number
        </Text>
        <EditButton onEdit={onEdit} />
      </Box>
      <Box className="ss-relative ss-p-3 ss-py-4 md:ss-p-6 ss-bg-white ss-rounded focus-within:ss-focus-ring focus-within:ss-border-primary1-100">
        <Box className="ss-rounded ss-bg-neutral-100 ss-p-2 ss-mt-4 ss-flex ss-flex-wrap ss-text-neutral-60">
          {formData.phone && (
            <ExpandedItem isSelectable={false} title="Phone Number">
              <ExpandedItemSubTitle>
                <Text>{formData.phone}</Text>
              </ExpandedItemSubTitle>
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

export default SelectedPhoneNumber;
