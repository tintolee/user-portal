import React, { ReactNode } from 'react';
import Box from '@sendsprint/ui-react/dist/components/Box';
import { authIllustration } from '@src/assets/images';
import Image from '@src/components/image';
import AsideCarousel from './asideCarousel';

interface Props {
  asideContent?: ReactNode;
}

const Aside = ({ asideContent = <AsideCarousel /> }: Props) => {
  return (
    <Box
      as="aside"
      className="ss-hidden lg:ss-block ss-fixed ss-bg-primary1-500 ss-w-400 xl:ss-w-140 ss-h-screen ss-top-0 ss-right-0">
      <Box className="ss-relative ss-overflow-hidden ss-w-full ss-h-full">
        <Image
          alt=""
          src={authIllustration}
          styles={{
            width: '300%'
          }}
          variant="eager-load"
          className="ss-absolute ss--top-48 ss-h-500 ss-right-0"
        />
        <Box className="ss-py-14 ss-px-10 ss-relative ss-overflow-auto ss-h-full">
          {asideContent}
        </Box>
      </Box>
    </Box>
  );
};

export default Aside;
