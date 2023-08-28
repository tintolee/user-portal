import { Box, Button, FormFieldDropdown, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline, GlobeOutline } from '@sendsprint/ui-react/dist/icons';
import { Dialog2 } from '@src/components';
import { useToggle } from '@src/hooks';
import React from 'react';
import { LocationI } from './DealsFilter';

interface Props {
  locationData: LocationI[];
  redeemedData: LocationI[];
}

const MobileFilter = ({ locationData, redeemedData }: Props) => {
  const { handleFalse, handleTrue, state: isOpen } = useToggle();
  return (
    <>
      <Box className="ss-w-2/4 ss-block md:ss-hidden">
        <Button label="Filter" isBlock variant="secondary" onClick={handleTrue} />
      </Box>
      <Dialog2 handleClose={handleFalse} isOpen={isOpen}>
        <Box>
          <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
            <Text className="ss-text-neutral-500" variant="h5">
              Filter
            </Text>
            <Button
              onClick={handleFalse}
              label={<Icon svg={CloseOutline} size={24} />}
              variant="tertiary"
              className="ss-p-0"
            />
          </Box>
          <Box className="ss-space-y-5">
            <FormFieldDropdown
              label="Location"
              data={locationData}
              emptyOptionLabel=""
              name="location"
              optionLabel="label"
              optionValue="value"
              optionIcon="icon"
              icon={GlobeOutline}
            />
            <FormFieldDropdown
              label="Redeemed in"
              data={redeemedData}
              emptyOptionLabel=""
              name="redeemedIn"
              optionLabel="label"
              optionValue="value"
              optionIcon="icon"
              icon={GlobeOutline}
            />
          </Box>
        </Box>
      </Dialog2>
    </>
  );
};

export default MobileFilter;
