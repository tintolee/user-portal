import { Box, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import React from 'react';
import cs from 'classnames';

type CardStatus = 'Active' | 'Expired';

export interface CardItemI {
  image: string;
  expires: string;
  lastDigits: string;
  variant: CardStatus;
}

interface Props {
  item: CardItemI;
}

const CardItem = ({ item }: Props) => {
  const { expires, image, lastDigits, variant } = item;
  return (
    <Box className="ss-flex ss-justify-between ss-items-center">
      <Image alt="" className="ss-w-14 md:ss-w-20" src={image} />
      <Box>
        <Text>
          Ending in <strong>{lastDigits}</strong>
        </Text>
        <Text variant="paragraphSmall">Expires in {expires}</Text>
      </Box>
      <StatusBox variant={variant} />
    </Box>
  );
};

interface StatusBoxProps {
  variant: CardStatus;
}

const StatusBox = ({ variant }: StatusBoxProps) => {
  return (
    <Box
      className={cs('ss-px-3 ss-py-2 ss-flex ss-items-center ss-justify-center ss-rounded-lg', {
        'ss-bg-success-50 ss-text-success-500': variant === 'Active',
        'ss-bg-primary2-50 ss-text-error-500': variant === 'Expired'
      })}>
      <span className="ss-text-paragraph-very-small md:ss-text-paragraph-small">{variant}</span>
    </Box>
  );
};

export default CardItem;
