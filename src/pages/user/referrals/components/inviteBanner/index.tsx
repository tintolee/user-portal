import { Box, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import { useMedia } from '@src/hooks';
import React from 'react';
import { megaphone } from '../../assets';

const InviteBanner = () => {
  const { isMobile } = useMedia();
  return (
    <Box className="ss-flex ss-flex-col-reverse md:ss-flex-row-reverse lg:ss-flex-row ss-py-10 ss-px-5 md:ss-px-10 ss-rounded-lg ss-gap-5 ss-justify-between md:ss-items-center ss-bg-primary3-500">
      <Box className="ss-max-w-600 ss-flex-1">
        <Text
          variant={isMobile ? 'paragraphLarge' : 'h6'}
          className="ss-mb-1 ss-font-bold ss-text-neutral-500">
          Invite friends to SendSprint, get up to $20!
        </Text>
        <Text variant={isMobile ? 'paragraphSmall' : 'paragraphRegular'}>
          Share your referral code with friends and get up to $20 when they sign up and send money!
        </Text>
      </Box>
      <Box>
        <Image alt="" className="ss-w-20 md:ss-w-48" src={megaphone} />
      </Box>
    </Box>
  );
};

export default InviteBanner;
