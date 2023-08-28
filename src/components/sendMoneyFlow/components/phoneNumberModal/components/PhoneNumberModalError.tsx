import React from 'react';
import ErrorFallback, { ErrorFallbackProps } from '@src/components/errorFallback';

type Props = ErrorFallbackProps;

const PhoneNumberModalError = ({ resetError }: Props) => {
  return (
    <ErrorFallback
      resetError={resetError}
      text="Error loading phone number components"
      className="ss-bg-white ss-rounded-lg ss-py-14 ss-px-5"
    />
  );
};

export default PhoneNumberModalError;
