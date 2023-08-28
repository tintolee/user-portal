import Api from '@sendsprint/api-types';
import { Box, Flag, Text } from '@sendsprint/ui-react';
import { ReactNode } from 'react';

interface InfoRowProps {
  label: string;
  value: ReactNode;
  countryInitial?: Api.Model.CountryInitials;
}

const InfoRow = ({ label, value, countryInitial }: InfoRowProps) => {
  return (
    <Box
      style={{ minHeight: 64 }}
      className="ss-bg-neutral-100 ss-flex ss-items-center ss-gap-4 ss-w-full ss-rounded-base ss-px-4 ss-py-3">
      {countryInitial && (
        <Box>
          <Flag size={30} countryInitials={countryInitial} />
        </Box>
      )}
      <Box>
        <Text variant="paragraphVerySmall" className="ss-text-neutral-400">
          {label}
        </Text>
        <Text className="ss-text-neutral-500">{value}</Text>
      </Box>
    </Box>
  );
};

export default InfoRow;
