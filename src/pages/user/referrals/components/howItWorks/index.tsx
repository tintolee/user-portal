import { Box, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import { useMedia } from '@src/hooks';
import React from 'react';
import { referral, signUp } from '../../assets';

interface WorkDataI {
  id: number;
  image: string;
  text: string;
}

const data: WorkDataI[] = [
  {
    id: 1,
    image: signUp,
    text: 'Register your Sendsprint profile, confirm your account and get your unique referral code.'
  },
  {
    id: 2,
    image: referral,
    text: 'Share this code with as many people as you would like and have them sign up and send money with Sendsprint.'
  }
];

const HowItWorks = () => {
  const { isMobile } = useMedia();
  return (
    <Box className="ss-bg-white ss-py-5 ss-px-5 ss-rounded-lg">
      <Text className="ss-font-semibold ss-text-neutral-400 ss-mb-3">How it works</Text>
      <Box className="ss-space-y-4">
        {data.map((item) => (
          <Box
            key={item.id}
            className="ss-bg-neutral-100 ss-p-4 ss-gap-4 ss-flex ss-justify-center ss-items-center ss-rounded-lg">
            <Image alt="" className="ss-w-12 md:ss-w-20" src={item.image} />
            <Text variant={isMobile ? 'paragraphSmall' : 'paragraphRegular'} className="ss-flex-1">
              {item.text}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HowItWorks;
