import { Box } from '@sendsprint/ui-react';
import React from 'react';
import { PageNavProps } from '.';
import PageNavItem from './PageNavItem';

type DesktopNavProps = PageNavProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const DesktopNav = ({ currentIndex, goTo, maxActiveIndex, steps, className }: DesktopNavProps) => {
  return (
    <Box className="ss-hidden md:ss-block">
      <Box className="ss-flex ss-gap-5 ss-justify-between ss-bg-white md:ss-bg-transparent ss-p-4 md:ss-p-0 ss-rounded-full md:ss-rounded-none ss-items-center">
        {steps.map((step, index) => {
          const { id, isVisible, label } = step;

          if (!isVisible) return null;

          return (
            <PageNavItem
              key={id}
              maxActiveIndex={maxActiveIndex}
              currentIndex={currentIndex}
              itemIndex={index}
              label={label}
              goTo={goTo}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default DesktopNav;
