import { Box, BoxProps } from '@sendsprint/ui-react';
import React, { PropsWithChildren } from 'react';
import { FC } from 'react';
import './Container.css';

type ContainerProps = PropsWithChildren<{
  className?: string;
}> &
  BoxProps;
const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <Box {...props} className={`ss-container-component ss-container ${className ?? ''}`}>
      {children}
    </Box>
  );
};

export default Container;
