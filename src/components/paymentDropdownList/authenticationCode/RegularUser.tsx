import { Box, Button, Form, Text } from '@sendsprint/ui-react';
import OtpField from '@src/components/sendMoneyFlow/components/addressStep/otpModal/OtpField';
import { Shape } from '@src/validations';
import React from 'react';
import * as yup from 'yup';

export interface RegularUserFormI {
  code: string;
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleRegularSubmit?: (values: RegularUserFormI) => void;
  isLoading?: boolean;
}

const initialValues: RegularUserFormI = {
  code: ''
};

const RegularUser = ({ handleRegularSubmit, isLoading }: Props) => {
  const validationSchema = yup.object().shape<Shape<RegularUserFormI>>({
    code: yup
      .string()
      .required('Please enter your code')
      .length(4, 'Code should be four characters')
  });

  const handleSubmit = (values: RegularUserFormI) => {
    if (handleRegularSubmit) {
      handleRegularSubmit(values);
    }
  };
  return (
    <Form<RegularUserFormI>
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <Box className="ss-bg-white ss-px-4 ss-py-10 ss-rounded-base ss-space-y-4 ss-mb-8">
        <Text className="ss-text-neutral-500 ss-font-bold ss-text-center" variant="paragraphLarge">
          Enter your code
        </Text>
        <Text className="ss-text-neutral-400 ss-text-center ss-mb-10">
          Enter your code to authenticate this transaction
        </Text>
        <OtpField type="password" name="code" length={4} />
      </Box>
      <Box className="ss-space-y-3">
        <Button label="Pay" type="submit" disabled={isLoading} showSpinner={isLoading} isBlock />
      </Box>
    </Form>
  );
};

export default RegularUser;
