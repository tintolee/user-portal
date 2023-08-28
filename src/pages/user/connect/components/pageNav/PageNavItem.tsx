import { Box, Text } from '@sendsprint/ui-react';
import React from 'react';
import { StepIndex } from '../../state/types';
import cs from 'classnames';

interface PageNavItemProps {
  label: string;
  itemIndex: number;
  currentIndex: number;
  maxActiveIndex: number;
  // eslint-disable-next-line no-unused-vars
  goTo: (id: StepIndex) => void;
}

const PageNavItem = ({
  label,
  goTo,
  currentIndex,
  itemIndex,
  maxActiveIndex
}: PageNavItemProps) => {
  const isCurrent = itemIndex === currentIndex;
  const isCompleted = itemIndex < currentIndex;
  const isActive = itemIndex <= maxActiveIndex;
  const clickHandler = () => goTo(itemIndex);

  return (
    <button
      type="button"
      className={cs('ss-flex-1 ss-rounded focus:ss-focus-ring focus:ss-outline-none', {
        'ss-cursor-pointer': isActive,
        'ss-cursor-not-allowed': !isActive
      })}
      onClick={clickHandler}
      disabled={!isActive}>
      <Text
        variant="paragraphSmall"
        className={cs('ss-text-neutral-300 ss-hidden md:ss-block', {
          'ss-text-neutral-400': isCompleted,
          'ss-text-primary1-500': isCurrent
        })}>
        {label}
      </Text>
      <Box
        className={cs(' ss-w-full ss-h-1 ss-rounded-full', {
          'ss-bg-success-500': isCompleted,
          'ss-bg-primary1-500': isCurrent,
          'ss-bg-neutral-300': currentIndex < itemIndex
        })}
      />
    </button>
  );
};

export default PageNavItem;
