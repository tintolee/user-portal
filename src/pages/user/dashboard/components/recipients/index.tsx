import React, { lazy } from 'react';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import Loader from '@src/components/loader';
import ComponentsErrorFallback from '../componentsErrorFallback';

const RecentRecipientsInner = lazy(
  () => import(/*webpackChunkName:'DashboardRecentRecipientsInner'*/ './RecipientsInner')
);

const RecentRecipients = () => {
  return (
    <SuspenseWrapper
      errorFallback={({ resetError }) => (
        <ComponentsErrorFallback resetError={resetError} errorText="Error loading reipients" />
      )}
      suspenseFallback={
        <Loader
          ballSize="small"
          height="content"
          className="ss-bg-white ss-min-h-250 md:ss-min-h-300 ss-rounded-lg"
        />
      }>
      <RecentRecipientsInner />
    </SuspenseWrapper>
  );
};

export default RecentRecipients;
