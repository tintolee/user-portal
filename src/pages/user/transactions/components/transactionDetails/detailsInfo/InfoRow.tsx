import { Box, Text } from '@sendsprint/ui-react';
import React, { ReactNode } from 'react';

interface Props {
  label: string;
  value: ReactNode;
}

const InfoRow = ({ label, value }: Props) => {
  return (
    <Box className="ss-flex ss-gap-5 ss-items-center ss-justify-between">
      <Text>{label}</Text>
      <Text className="ss-font-bold ss-break-all ss-w-44 ss-text-right md:ss-w-auto">{value}</Text>
    </Box>
  );
};

export default InfoRow;
