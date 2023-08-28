import { Box, Text } from '@sendsprint/ui-react';
import { ReactNode } from 'react';

interface Props {
  label: string;
  value: ReactNode;
}

const InfoRow = ({ label, value }: Props) => {
  return (
    <Box className="ss-mb-4 ss-flex ss-gap-2 ss-justify-between ss-items-center">
      <Text variant="paragraphSmall" className="ss-text-neutral-400">
        {label}
      </Text>
      <Text variant="paragraphSmall" className="ss-text-neutral-500 ss-text-right ss-font-bold">
        {value}
      </Text>
    </Box>
  );
};

export default InfoRow;
