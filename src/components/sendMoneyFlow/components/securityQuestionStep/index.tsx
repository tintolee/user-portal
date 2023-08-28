import { Box, ExtraInfo, Text } from '@sendsprint/ui-react';
import React from 'react';
import SecurityQuestionForm, { SecurityQuestionFormData } from './securityQuestionForm';

export type SecurityQuestionStepProps = {
  formData: SecurityQuestionFormData | undefined;
  // eslint-disable-next-line no-unused-vars
  onSuccess: (values: SecurityQuestionFormData) => void;
};

const SecurityQuestionStep = ({ formData, onSuccess }: SecurityQuestionStepProps) => {
  return (
    <Box>
      <Text className="ss-text-neutral-400 ss-mb-6 ss-font-bold">Create a security question</Text>
      <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-mb-5 ss-rounded ss-space-y-4">
        <ExtraInfo
          extraInfo="When you send money using Sprint, we will ask you to input a security question that you
          recipient must answer correctly before they receive their funds. You can pick any question
          you like. Just ensure that your recipient knows the answer."
        />
        <SecurityQuestionForm
          formData={formData}
          onSubmit={(values, helpers) => {
            onSuccess(values);
            helpers.setSubmitting(false);
          }}
        />
      </Box>
    </Box>
  );
};

export default SecurityQuestionStep;
