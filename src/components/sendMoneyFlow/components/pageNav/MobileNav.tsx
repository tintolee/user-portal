import { Box, Icon, IconProps, Text } from '@sendsprint/ui-react';
import { ArrowBackOutline, ArrowForwardOutline } from '@sendsprint/ui-react/dist/icons';
import { noop } from '@sendsprint/ui-react/dist/utils';
import React from 'react';
import { PageNavProps } from '.';
import { StepIndex, StepType } from '../../state/types';
import PageNavItem from './PageNavItem';

type MobileNavProps = PageNavProps;
type IconSvg = IconProps['svg'];

const findNextNavigableStepIndex = (
  currentIndex: StepIndex,
  steps: StepType[],
  direction: 'forward' | 'backward' = 'forward'
): StepIndex => {
  const isFwd = direction === 'forward';

  const startIndex = isFwd ? currentIndex + 1 : currentIndex - 1;

  for (let i = startIndex; i < steps.length; isFwd ? i++ : i--) {
    if (steps[i].isVisible) {
      return i;
    }
  }
  return -1;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const MobileNav = ({ currentIndex, goTo, maxActiveIndex, steps, className }: MobileNavProps) => {
  const canGoForward = (): boolean => currentIndex < maxActiveIndex;
  const canGoBackward = (): boolean => currentIndex > 0;
  const goForward = () => {
    const nextIndex = findNextNavigableStepIndex(currentIndex, steps, 'forward');
    goTo(nextIndex);
  };
  const goBackward = () => {
    const prevIndex = findNextNavigableStepIndex(currentIndex, steps, 'backward');
    goTo(prevIndex);
  };
  const currentStep = steps[currentIndex];
  // const progressWidth = (currentIndex / (steps.length || 1)) * 100;

  return (
    <Box className={'md:ss-hidden'}>
      <Box className="ss-flex ss-items-center ss-justify-between">
        <ArrowButton
          svg={ArrowBackOutline}
          onClick={goBackward}
          disabled={!canGoBackward()}
          label="Go backwards"
        />
        <Text variant="h6" className="ss-mb-2">
          {currentStep && currentStep.label ? currentStep.label : null}
        </Text>
        <ArrowButton
          svg={ArrowForwardOutline}
          onClick={goForward}
          disabled={!canGoForward()}
          label="Go forward"
        />
      </Box>
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

const ArrowButton = (buttonProps: {
  svg: IconSvg;
  onClick: () => void;
  disabled: boolean;
  label: string;
}): JSX.Element => {
  const { svg, onClick = noop, disabled = false, label } = buttonProps;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="ss-p-0 focus:ss-focus-ring ss-rounded ss-leading-none">
      <Icon
        svg={svg}
        size={24}
        className={disabled ? 'ss-text-neutral-300' : 'ss-text-primary1-500'}
      />
    </button>
  );
};

export default MobileNav;
