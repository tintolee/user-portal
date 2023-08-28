import React, { lazy } from 'react';
import './mobileNavbar.css';
import useToggle from '@src/hooks/utils/useToggle';
import { RiMenu2Line } from 'react-icons/ri';
import SuspenseWrapper from '@src/components/suspenseWrapper';

const MobileNavbarTransition = lazy(
  () => import(/*webpackChunkName: 'MobileNavbarTransition'*/ './MobileNavbarTransition')
);

const MobileNavbar = () => {
  const { handleTrue: handleOpen, handleFalse: handleClose, state: isOpen } = useToggle();
  return (
    <>
      <button
        onClick={handleOpen}
        className="ss-w-12 ss-h-12 ss-bg-white ss-flex lg:ss-hidden ss-justify-center ss-items-center ss-rounded-full ss-outline-none focus:ss-focus-ring">
        <RiMenu2Line size={24} />
      </button>
      {isOpen && (
        <SuspenseWrapper returnNullErrorFallback>
          <MobileNavbarTransition handleClose={handleClose} isOpen={isOpen} />
        </SuspenseWrapper>
      )}
    </>
  );
};

export default MobileNavbar;
