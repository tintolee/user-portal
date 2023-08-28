import ErrorFallback, { ErrorFallbackProps } from '@src/components/errorFallback';
import React from 'react';

type Props = ErrorFallbackProps;

const DashboardErrorFallback = ({ resetError }: Props) => {
  return (
    <ErrorFallback
      resetError={resetError}
      text="Error loading dashboard"
      className="ss-bg-white ss-rounded-lg ss-py-40 ss-px-5"
    />
  );
};

export default DashboardErrorFallback;
