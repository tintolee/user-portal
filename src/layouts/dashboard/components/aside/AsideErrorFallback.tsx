import Box from '@sendsprint/ui-react/dist/components/Box';
import ErrorFallback, { ErrorFallbackProps } from '@src/components/errorFallback';
import React from 'react';

type Props = ErrorFallbackProps;

const AsideErrorFallback = ({ resetError }: Props) => {
  return (
    <Box
      as="aside"
      className="ss-w-max ss-h-400 ss-hidden lg:ss-block lg:ss-w-250 xl:ss-w-300 ss-sticky ss-top-34 ss-bg-white ss-py-8 ss-px-5 ss-rounded-lg">
      <ErrorFallback
        resetError={resetError}
        text="Error loading navigations"
        className="ss-bg-white ss-rounded-lg ss-py-14 ss-px-5"
      />
    </Box>
  );
};

export default AsideErrorFallback;
