import { Box, Text } from '@sendsprint/ui-react';
import { Path } from '@src/navigations/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import { mastercard, stripe, visa } from '../../assets';
import CardItem, { CardItemI } from './CardItem';
// import EmptyState from './EmptyState';

const cardList: CardItemI[] = [
  {
    expires: '12/2023',
    image: visa,
    lastDigits: '1234',
    variant: 'Active'
  },
  {
    expires: '12/2023',
    image: stripe,
    lastDigits: '1234',
    variant: 'Active'
  },
  {
    expires: '12/2023',
    image: mastercard,
    lastDigits: '1234',
    variant: 'Expired'
  }
];

const CardsSection = () => {
  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-mb-3 ss-justify-between">
        <Text className="ss-font-semibold" variant="paragraphLarge">
          Cards
        </Text>
        <Link to={Path.Cards} className="ss-text-primary1-500 ss-text-paragraph-small ss-underline">
          See all
        </Link>
      </Box>
      {/* <EmptyState /> */}
      <Box className="ss-space-y-6">
        {cardList.map((item, index) => (
          <CardItem item={item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default CardsSection;
