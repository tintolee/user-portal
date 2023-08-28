import Api from '@sendsprint/api-types';
import { Box, Flag, Text } from '@sendsprint/ui-react';
import React from 'react';
import EditButton from '../../editButton';
import { SecurityQuestionFormData } from '../../securityQuestionStep/securityQuestionForm';

interface Props {
  securityQuestionState: SecurityQuestionFormData | undefined;
  handleEdit: () => void;
}

const SecurityQuestionSummary = ({ securityQuestionState, handleEdit }: Props) => {
  if (!securityQuestionState) return null;

  const { answer, question } = securityQuestionState;
  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-justify-between ss-mb-4">
        <Text className="ss-text-neutral-400 ss-font-bold">Security Question</Text>
        <EditButton label="Edit" onEdit={handleEdit} />
      </Box>
      <Box className="ss-space-y-3">
        {question && <InfoBlock label="Question" value={question} />}
        {question && <InfoBlock label="Answer" value={answer} />}
      </Box>
    </Box>
  );
};

interface InfoBlockProps {
  label: string;
  value: string;
  country?: Api.Model.CountryInitials;
}

const InfoBlock = ({ label, value, country }: InfoBlockProps) => {
  return (
    <Box className="ss-bg-neutral-100 ss-py-2 ss-px-4 ss-rounded ss-flex ss-items-center ss-gap-3">
      {country && (
        <Box>
          <Flag countryInitials={country} />
        </Box>
      )}
      <Box>
        <Text variant="paragraphVerySmall" className="ss-text-neutral-400">
          {label}
        </Text>
        <Text>{value}</Text>
      </Box>
    </Box>
  );
};

export default SecurityQuestionSummary;
