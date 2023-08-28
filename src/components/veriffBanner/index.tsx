import { useDashboardContext } from '@src/contexts/dashboard-context';
import React, { lazy } from 'react';
import SuspenseWrapper from '../suspenseWrapper';

const VeriffBannerInner = lazy(
  () => import(/*webpackChunkName: 'VeriffBannerInner'*/ './VeriffBannerInner')
);

const VeriffBanner = () => {
  const { isUserVerified } = useDashboardContext();

  return (
    <>
      {isUserVerified ? null : (
        <SuspenseWrapper returnNullErrorFallback>
          <VeriffBannerInner />
        </SuspenseWrapper>
      )}
    </>
  );
};

export default VeriffBanner;
