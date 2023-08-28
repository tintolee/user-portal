import React from 'react';
import ErrorFallback, { ErrorFallbackProps } from '@src/components/errorFallback';

type Props = { errorText: string } & ErrorFallbackProps;

const ComponentsErrorFallback = ({ resetError, errorText }: Props) => {
  return (
    <ErrorFallback
      resetError={resetError}
      text={errorText}
      className="ss-bg-white ss-rounded-lg ss-py-14 ss-px-5"
    />
  );
};

export default ComponentsErrorFallback;
