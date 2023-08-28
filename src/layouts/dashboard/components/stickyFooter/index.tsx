import { Box, Icon, Text } from '@sendsprint/ui-react';
import { HomeOutline } from '@sendsprint/ui-react/dist/icons';
import { Container } from '@src/components';
import React from 'react';

const StickyFooter = () => {
  return (
    <Box as="footer" className="ss-fixed ss-w-full ss-bottom-2">
      <Container>
        <Box className="ss-bg-primary1-500 ss-rounded-lg ss-flex ss-items-center ss-gap-2">
          <Box className="ss-flex ss-flex-1 ss-flex-col ss-items-center ss-gap-1">
            <Icon className="ss-text-primary1-100" size={24} svg={HomeOutline} />
            <Text className="ss-text-primary1-100">Home</Text>
          </Box>
          <Box className="ss-flex ss-flex-1 ss-flex-col ss-items-center ss-gap-1">
            <Icon svg={HomeOutline} />
            <Text>Home</Text>
          </Box>
          <Box className="ss-flex ss-flex-1 ss-flex-col ss-items-center ss-gap-1">
            <Icon svg={HomeOutline} />
            <Text>Home</Text>
          </Box>
          <Box className="ss-flex ss-flex-1 ss-flex-col ss-items-center ss-gap-1">
            <Icon svg={HomeOutline} />
            <Text>Home</Text>
          </Box>
          <Box className="ss-flex ss-flex-1 ss-flex-col ss-items-center ss-gap-1">
            <Icon svg={HomeOutline} />
            <Text>Home</Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StickyFooter;
