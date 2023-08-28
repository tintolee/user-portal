import { Box, Icon, IconProps } from '@sendsprint/ui-react';
import React, { ReactNode } from 'react';

interface Props {
  smallIcon: ReactNode;
  mainIcon: IconProps['svg'];
}

const BoxWithIcon = ({ smallIcon, mainIcon }: Props) => {
  return (
    <Box className="ss-w-12 ss-bg-neutral-200 ss-h-12 ss-rounded-full ss-flex ss-justify-center ss-items-center ss-relative">
      <Icon svg={mainIcon} size={24} />
      <Box className="ss-absolute ss-flex ss-w-4 ss-h-4 ss-bottom-0 ss--right-1">{smallIcon}</Box>
    </Box>
  );
};

export default BoxWithIcon;
