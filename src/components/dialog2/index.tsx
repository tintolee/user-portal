import React, { ReactNode } from 'react';
import { DialogOverlay, DialogOverlayProps } from '@reach/dialog';
import { Transition } from '@headlessui/react';
import cs from 'classnames';
// import './dialog2.css';
import { Box } from '@sendsprint/ui-react';
import { useMedia } from '@src/hooks';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  disableOverlayClick?: boolean;
  children?: ReactNode;
  position?: 'bottom' | 'side';
  size?: 'normal' | 'content';
}

type Dialog2OverlayProps = DialogOverlayProps & { className?: string; children?: ReactNode };

const Dialog2Overlay = ({ children, ...props }: Dialog2OverlayProps) => {
  return <DialogOverlay {...props}>{children}</DialogOverlay>;
};

const Dialog2 = ({
  handleClose,
  isOpen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  position = 'side',
  children,
  disableOverlayClick,
  size = 'normal'
}: Props) => {
  const { isMobile } = useMedia();
  return (
    <Transition appear={isOpen} className="" show={isOpen}>
      <Dialog2Overlay
        isOpen={isOpen}
        onDismiss={disableOverlayClick ? () => undefined : handleClose}>
        <Transition.Child
          className="ss-fixed ss-top-0 ss-right-0 ss-bottom-0 ss-left-0 ss-overflow-hidden ss-bg-neutral-500 ss-bg-opacity-50 ss-z-40"
          enter="ss-transition-opacity ss-duration-300"
          enterFrom="ss-opacity-0"
          enterTo="ss-opacity-100"
          leave="ss-transition-opacity ss-duration-200"
          leaveFrom="ss-opacity-100"
          leaveTo="ss-opacity-0"
        />
        <Transition.Child
          className={cs('ss-bg-transparent ss-fixed ss-z-40 ', {
            'ss-top-0 ss-left-0 ss-bottom-0 ss-right-0': !isMobile,
            'ss-top-10% ss-left-0 ss-bottom-0 ss-right-0': isMobile
          })}
          enter="ss-duration-300 ss-transform"
          enterFrom={cs('ss-opacity-30 ', {
            'ss-translate-x-500': !isMobile,
            'ss-translate-y-500': isMobile
          })}
          enterTo="ss-opacity-100 ss-translate-x-0"
          leave="ss-transform-gpu ss-transition-all ss-transition ss-duration-200"
          leaveFrom="ss-opacity-100"
          leaveTo="ss-opacity-0">
          <Box
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#F6F8FA'
            }}
            className={cs('ss-h-full ss-overflow-auto ss-ml-auto ss-w-full', {
              'md:ss-w-600 ss-p-4 md:ss-p-10': size === 'normal',
              'md:ss-w-max ss-p-0': size === 'content'
            })}>
            {children}
          </Box>
        </Transition.Child>
      </Dialog2Overlay>
    </Transition>
  );
};

export default Dialog2;
