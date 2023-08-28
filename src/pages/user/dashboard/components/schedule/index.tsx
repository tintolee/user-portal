import Loader from '@src/components/loader';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import React, { lazy } from 'react';
import ComponentsErrorFallback from '../componentsErrorFallback';

const ScheduleInner = lazy(
  () => import(/*webpackChunkName:'DashboardScheduleInner'*/ './ScheduleInner')
);

const Schedule = () => {
  return (
    <SuspenseWrapper
      errorFallback={({ resetError }) => (
        <ComponentsErrorFallback
          resetError={resetError}
          errorText="Error loading scheduled transactions"
        />
      )}
      suspenseFallback={
        <Loader
          ballSize="small"
          height="content"
          className="ss-bg-white ss-min-h-250 md:ss-min-h-300 ss-rounded-lg"
        />
      }>
      <ScheduleInner />
    </SuspenseWrapper>
  );
};

export default Schedule;
