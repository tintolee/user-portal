import React from 'react';
import { StepIndex, StepType } from '../../state/types';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export type PageNavProps = {
  className?: string;
  steps: StepType[];
  currentIndex: StepIndex;
  maxActiveIndex: StepIndex;
  // eslint-disable-next-line no-unused-vars
  goTo: (id: StepIndex) => void;
};

const PageNav = ({ currentIndex, goTo, maxActiveIndex, steps, className }: PageNavProps) => {
  return (
    <>
      <MobileNav
        currentIndex={currentIndex}
        goTo={goTo}
        className={className}
        steps={steps}
        maxActiveIndex={maxActiveIndex}
      />
      <DesktopNav
        currentIndex={currentIndex}
        goTo={goTo}
        className={className}
        steps={steps}
        maxActiveIndex={maxActiveIndex}
      />
    </>
  );
};

export default PageNav;
