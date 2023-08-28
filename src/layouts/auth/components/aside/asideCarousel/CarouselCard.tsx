import Box from '@sendsprint/ui-react/dist/components/Box';
import Text from '@sendsprint/ui-react/dist/components/Text';
import Image from '@src/components/image';
import React from 'react';

export interface CarouselDataI {
  image: string;
  header: string;
  paragraph: string;
}

interface Props {
  item: CarouselDataI;
}

const CarouselCard = ({ item: { header, image, paragraph } }: Props) => {
  return (
    <Box>
      <Image
        className="ss-w-full ss-max-w-350 ss-mx-auto ss-h-400 ss-rounded-lg ss-overflow-hidden ss-bg-primary1-400 ss-mb-5"
        imgClasses="ss-h-full object-cover"
        alt=""
        src={image}
        variant="eager-load"
      />
      <Text variant="h4" className="ss-text-white">
        {header}
      </Text>
      <Text variant="paragraphLarge" className="ss-text-white">
        {paragraph}
      </Text>
    </Box>
  );
};

export default CarouselCard;
