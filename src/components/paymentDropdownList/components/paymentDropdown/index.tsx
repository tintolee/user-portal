import { Box, Icon, Text } from '@sendsprint/ui-react';
import { ChevronDownOutline, ChevronUpOutline } from '@sendsprint/ui-react/dist/icons';
import { Image } from '@src/components';
import React, { ReactNode } from 'react';
import cs from 'classnames';

interface Props {
  children: ReactNode;
  header?: string;
  headerImage?: string;
  isOpen: boolean;
  showMoreText?: boolean;
  handleToggle: () => void;
}

const PaymentDropdown = ({
  children,
  header,
  headerImage,
  handleToggle,
  isOpen,
  showMoreText
}: Props) => {
  return (
    <Box
      className={cs('ss-border ss-border-neutral-100 ss-p-4 ss-rounded', {
        'ss-bg-success-100': isOpen,
        'ss-bg-white': !isOpen
      })}>
      <button
        onClick={handleToggle}
        className="ss-flex ss-w-full ss-outline-none focus:ss-focus-ring ss-rounded ss-cursor-pointer ss-items-center">
        <Box
          className={cs('ss-w-8 ss-h-8 ss-rounded-full ss-flex ss-items-center ss-justify-center', {
            'ss-bg-primary1-500 ss-text-white': isOpen,
            '': !isOpen
          })}>
          <Icon
            className={'ss-text-primary-100'}
            size={30}
            svg={isOpen ? ChevronUpOutline : ChevronDownOutline}
          />
        </Box>
        <Box className="ss-flex-1 ss-flex ss-items-center ss-gap-2">
          {header && (
            <Text
              className="ss-text-neutral-60 ss-font-bold ss-ml-2 ss-mr-4"
              variant="paragraphSmall">
              {header}
            </Text>
          )}
          {headerImage && (
            <Image
              className="ss-h-6 ss-w-max"
              imgClasses="ss-object-contain ss-h-full"
              alt={header || ''}
              src={headerImage}
            />
          )}
          {showMoreText && (
            <Text variant="paragraphVerySmall" className="ss-text-neutral-500 ss-font-semibold">
              + more
            </Text>
          )}
        </Box>
      </button>
      {isOpen && <Box className="ss-pt-4">{children}</Box>}
    </Box>
  );
};

export default PaymentDropdown;
