import { Box, Text } from '@sendsprint/ui-react';
import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  label: string;
}

const FormFieldWithExternalLabel = ({ label, children }: Props) => {
  return (
    <Box>
      <Text className="ss-mb-2 ss-text-neutral-500 ss-font-bold" variant="paragraphSmall">
        {label}
      </Text>
      <Box>{children}</Box>
    </Box>
  );
};

export default FormFieldWithExternalLabel;
