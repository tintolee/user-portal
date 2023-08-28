import React, { FC } from 'react';
import { Box, BoxProps } from '@sendsprint/ui-react';
import cs from 'classnames';

type SkeletonProps = BoxProps;

export const Skeleton: FC<SkeletonProps> = ({
  as = 'div',
  className = '',
  /* Default value for children makes sure that the Skeleton is always properly filled */
  children = 'dummy text',
  ...props
}) => {
  const rootClasses = cs(
    {
      'ss-animate-pulse ss-bg-primary1-50 ss-text-transparent ss-border-transparent': true,
      'hover:ss-border-transparent focus:ss-border-transparent': true,
      'ss-shadow-none focus:ss-shadow-none ss-ring-0 focus:ss-ring-0 ss-cursor-default': true
    },
    className
  );
  return (
    <Box as={as} aria-hidden={true} className={rootClasses} {...props}>
      {children}
    </Box>
  );
};
