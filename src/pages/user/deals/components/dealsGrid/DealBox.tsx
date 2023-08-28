import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import ArrowCircleRightOutline from '@sendsprint/ui-react/dist/icons/ArrowCircleRightOutline';
import { Image } from '@src/components';
import React from 'react';
import cs from 'classnames';
import { deals } from '../../assets';
import { Path } from '@src/navigations/routes';
import { useMedia } from '@src/hooks';
import { useNavigate } from 'react-router-dom';

export interface DealI {
  id: string;
  merchantName: string;
  merchantDescription: string;
  dealHeader: string;
  dealInfo: string[];
  redemptionMarket: string[];
  senders: string[];
  discountCode: string;
  redemptionInfo: string[];
}

interface Props {
  item: DealI;
}

const DealBox = ({ item }: Props) => {
  const isAvailable = false;
  const { dealHeader, id } = item;
  const { isMobile } = useMedia();
  const navigate = useNavigate();

  const availabilityLabel = isAvailable ? 'Available' : 'Not available';
  const url = `${Path.DealsAndRewards}?id=${id}`;

  const handleNavigate = () => {
    navigate(url);
    //
  };
  return (
    <Box className="ss-bg-white ss-relative ss-rounded-lg ss-overflow-hidden">
      <Text
        variant="paragraphVerySmall"
        className={cs('ss-absolute ss-top-2 ss-left-2 ss-px-2 ss-py-1 ss-rounded-full', {
          'ss-text-success-500 ss-bg-success-50': isAvailable,
          'ss-text-neutral-400 ss-bg-neutral-200': !isAvailable
        })}>
        {availabilityLabel}
      </Text>
      <Box>
        <Image
          alt=""
          src={deals}
          imgClasses="ss-h-full ss-object-cover"
          className="ss-h-28 md:ss-h-56 lg:ss-h-48 "
        />
      </Box>
      <Box className="ss-p-2 md:ss-p-6">
        <Text
          className="ss-text-primary1-500 ss-font-bold"
          variant={isMobile ? 'paragraphSmall' : 'paragraphLarge'}>
          {dealHeader}
        </Text>
        {/* <Text
          className="ss-text-neutral-400 ss-font-normal ss-mb-2"
          variant={isMobile ? 'paragraphVerySmall' : 'paragraphSmall'}>
          You get 20% off your next shipping to nigeria offered to you in paternership with Apo
        </Text> */}
        <Box className="ss-mt-3">
          <Button
            onClick={handleNavigate}
            label="View now"
            variant="secondary"
            disabled
            size={isMobile ? 'small' : 'normal'}
            iconRight={ArrowCircleRightOutline}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DealBox;
