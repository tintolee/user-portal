import { Box, Button, Text } from '@sendsprint/ui-react';
import { useMedia } from '@src/hooks';
import React from 'react';
import CardItem from './cardItem';

interface Props {
  handleOpenModal: () => void;
}

const CardList = ({ handleOpenModal }: Props) => {
  const { isMobile } = useMedia();
  return (
    <Box>
      <Box className="ss-mb-6 md:ss-mb-14">
        <Box className="ss-flex ss-gap-3 ss-items-center ss-justify-between">
          <Box className="ss-flex ss-items-center ss-gap-3">
            <Text variant="h5" className="ss-font-bold">
              Payment methods
            </Text>
          </Box>
          <Box className="">
            <Button onClick={handleOpenModal} label={isMobile ? 'Add' : 'Add a payment method'} />
          </Box>
        </Box>
      </Box>
      <Box className="ss-grid ss-grid-cols-1 md:ss-grid-cols-2 ss-gap-8">
        <CardItem />
        <CardItem />
        <CardItem />
      </Box>
    </Box>
  );
};

export default CardList;
