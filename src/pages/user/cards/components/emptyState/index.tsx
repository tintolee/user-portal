import { Box, Button, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import React from 'react';
import { creditCard } from '../../assets';

interface Props {
  handleOpenModal: () => void;
}

const EmptyState = ({ handleOpenModal }: Props) => {
  return (
    <Box>
      <Text variant="h5" className="ss-font-bold ss-mb-14">
        Payment methods
      </Text>
      <Box className="ss-flex ss-flex-col ss-items-center ss-max-w-500 ss-pb-10 ss-mx-auto">
        <Box className="ss-mb-14">
          <Image alt="Empty recipient list" className="ss-max-w-300" src={creditCard} />
        </Box>
        <Text variant="h5" className="ss-font-bold ss-mb-4">
          You have no payment method saved
        </Text>
        <Text className="ss-text-center ss-mb-8">
          Lorem ipsum dolor sit amet consectetur. Morbi lacinia habitant dui ullamcorper eget cras
          quam turpis adipiscing.
        </Text>
        <Box className="ss-w-full">
          <Button onClick={handleOpenModal} label="Add a payment method" isBlock />
        </Box>
      </Box>
    </Box>
  );
};

export default EmptyState;
