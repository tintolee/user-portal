import { Box, Text } from '@sendsprint/ui-react';
import { Image } from '@src/components';
import React, { ReactNode } from 'react';
import { emptyRecipient } from './assets';

interface Props {
  title: string;
  body: string;
  header?: string;
  footer?: ReactNode;
}

const EmptyState = ({ body, title, footer, header }: Props) => {
  return (
    <Box>
      {header && (
        <Text variant="h5" className="ss-font-bold ss-mb-14">
          {header}
        </Text>
      )}
      <Box className="ss-flex ss-flex-col ss-items-center ss-max-w-500 ss-pb-10 ss-mx-auto">
        <Box className="ss-mb-8 ss-px-5 md:ss-px-0 md:ss-mb-14">
          <Image alt="Empty recipient list" className="ss-h-40 md:ss-h-250" src={emptyRecipient} />
        </Box>
        <Text variant="h5" className="ss-font-bold ss-mb-4">
          {title}
        </Text>
        <Text className="ss-text-center ss-mb-8">{body}</Text>
        <Box className="ss-w-full ss-space-y-5">{footer}</Box>
      </Box>
    </Box>
  );
};

export default EmptyState;
