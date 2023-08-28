import { Box, Skeleton } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import { useField } from 'formik';
import React from 'react';
import AmountBlockController from './AmountBlockController';

interface AmountBlockProps {
  sendCountries: ClientApi.SendCountry[];
  receiveCountries: ClientApi.ReceiveCountry[];
  areCountriesLoading: boolean;
  isCountryError: boolean;
}

const AmountBlock = ({
  areCountriesLoading,
  isCountryError,
  receiveCountries,
  sendCountries
}: AmountBlockProps) => {
  const [{ value: receiveCountry }] = useField('receiveCountry');
  const isLoading = areCountriesLoading || isCountryError;

  return (
    <>
      {isLoading && (
        <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
          <Skeleton className="ss-mb-4 ss-max-w-300 ss-h-5 ss-rounded" />
          <Box className="ss-space-y-1">
            <Skeleton className="ss-rounded ss-h-30" />
            <Skeleton className="ss-rounded ss-h-30" />
          </Box>
        </Box>
      )}
      {!isLoading && receiveCountries && sendCountries && (
        <AmountBlockController
          receiveCountries={receiveCountries}
          sendCountries={sendCountries}
          receiveCountry={receiveCountry}
        />
      )}
    </>
  );
};

export default AmountBlock;
