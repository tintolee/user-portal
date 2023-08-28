import Box from '@sendsprint/ui-react/dist/components/Box';
import React from 'react';
import DealBox, { DealI } from './DealBox';

interface Props {
  data: DealI[];
}

const DealsGrid = ({ data }: Props) => {
  return (
    <>
      {data.length ? (
        <Box className="ss-grid ss-grid-cols-2 xl:ss-grid-cols-3 ss-gap-6 ss-mt-16">
          {data.map((item, index) => (
            <DealBox item={item} key={index} />
          ))}
        </Box>
      ) : null}
    </>
  );
};

export default DealsGrid;
