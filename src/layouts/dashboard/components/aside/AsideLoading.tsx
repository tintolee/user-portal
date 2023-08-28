import Box from '@sendsprint/ui-react/dist/components/Box';
import Loader from '@src/components/loader';
import React from 'react';

const AsideLoading = () => {
  return (
    <Box
      as="aside"
      className="ss-w-max ss-h-400 ss-hidden lg:ss-block lg:ss-w-250 xl:ss-w-300 ss-sticky ss-top-34 ss-bg-white ss-py-8 ss-px-5 ss-rounded-lg">
      <Loader className="ss-h-full" height="content" ballSize="small" />
    </Box>
  );
};

export default AsideLoading;
