import React, { ReactNode } from 'react';
import { DialogOverlay, DialogOverlayProps } from '@reach/dialog';
import { Transition } from '@headlessui/react';
import cs from 'classnames';
import './mobileNavbar.css';
import Box from '@sendsprint/ui-react/dist/components/Box';
import { useAppLocation } from '@src/hooks/utils/useAppLocation';
import { useMedia } from '@src/hooks/utils/useMedia';
import { getActiveLink, linkData } from '../../aside';
import LinkItem from '../../aside/LinkItem';
import { IoClose } from 'react-icons/io5';
import { ReactComponent as Logo } from '@sendsprint/design-system/brand/logos/logo-full-green.svg';

type MobileNavbarOverlayProps = DialogOverlayProps & { className?: string; children?: ReactNode };

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const MobileNavbarOverlay = ({ children, ...props }: MobileNavbarOverlayProps) => {
  return <DialogOverlay {...props}>{children}</DialogOverlay>;
};

const MobileNavbarTransition = ({ isOpen, handleClose }: Props) => {
  const { isMobile } = useMedia();
  const location = useAppLocation();

  return (
    <>
      <Transition appear={isOpen} className="" show={isOpen}>
        <MobileNavbarOverlay isOpen={isOpen} onDismiss={handleClose}>
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
              'ss-left-0 ss-top-0 ss-bottom-0 ss-right-0': isMobile
            })}
            enter="ss-duration-300 ss-transform"
            enterFrom={cs('ss-opacity-30 ss--translate-x-500')}
            enterTo="ss-opacity-100 ss-translate-x-0"
            leave="ss-transform-gpu ss-transition-all ss-transition ss-duration-200"
            leaveFrom="ss-opacity-100"
            leaveTo="ss-opacity-0">
            <Box
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#F6F8FA'
              }}
              className="ss-h-full ss-pt-7 ss-overflow-auto ss-mr-auto ss-p-4 md:ss-p-10 ss-w-full ss-max-w-280 md:ss-max-w-400">
              <Box className="ss-mb-10 ss-flex ss-justify-between ss-items-center">
                <Logo
                  className="ss-h-10 ss-w-32 md:ss-w-40 lg:ss-w-56 md:ss-h-10"
                  role="presentation"
                />
                <button
                  onClick={handleClose}
                  className="ss-w-12 ss-h-12 ss-bg-white ss-flex ss-justify-center ss-items-center ss-rounded-full ss-outline-none focus:ss-focus-ring">
                  <IoClose size={24} />
                </button>
              </Box>
              <Box className="ss-space-y-2">
                {linkData.map((item) => (
                  <LinkItem
                    key={item.label}
                    active={getActiveLink(item.to, location.pathname)}
                    {...item}
                  />
                ))}
              </Box>
            </Box>
          </Transition.Child>
        </MobileNavbarOverlay>
      </Transition>
    </>
  );
};

export default MobileNavbarTransition;
