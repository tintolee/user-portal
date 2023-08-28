import { Box, Button, ExtraInfo, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import React from 'react';
import { mastercard } from '../../../assets';

const CardItem = () => {
  return (
    <Box className="ss-bg-white ss-p-6 ss-rounded-lg ss-space-y-4">
      <ExtraInfo extraInfo="This is an extra info" />
      <Box className="ss-flex ss-items-center ss-gap-3">
        <Image alt="" className="ss-w-14 md:ss-w-20" src={mastercard} />
        <Box>
          <Text>
            Ending in <strong>{1234}</strong>
          </Text>
          <Text variant="paragraphSmall">Expires in {'12/2023'}</Text>
        </Box>
      </Box>
      <Box className="ss-flex ss-gap-3 ss-justify-end ss-items-center">
        <Button className="ss-text-paragraph-small" label="Set as default" variant="secondary" />
        <Button className="ss-text-paragraph-small" label="Remove" variant="tertiary" />
      </Box>
    </Box>
  );
};

export default CardItem;
