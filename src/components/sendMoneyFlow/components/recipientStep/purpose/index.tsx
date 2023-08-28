import { Box, Form, FormField, Text } from '@sendsprint/ui-react';
import React from 'react';

const Purpose = () => {
  return (
    <Form initialValues={{ name: '' }} onSubmit={() => undefined}>
      <Box className="ss-bg-white ss-space-y-2 ss-rounded ss-p-3 ss-py-4 md:ss-p-6">
        <Text className="ss-text-neutral-400 ss-mb-6 ss-font-bold">
          What&apos;s this transfer for?
        </Text>
        <FormField name="purpose" label="Purpose of transfer" />
      </Box>
    </Form>
  );
};

export default Purpose;
