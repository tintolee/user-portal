import { Box, Button, Form, Text } from '@sendsprint/ui-react';
import OtpField from '@src/components/sendMoneyFlow/components/addressStep/otpModal/OtpField';
import { Shape } from '@src/validations';
import { FormikHelpers } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Scenario } from '.';

export interface FirstTimeUserFormI {
  code: string;
  confirmCode: string;
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleFirstTimeSubmit?: (values: FirstTimeUserFormI) => void;
  isLoading?: boolean;
  scenario?: Scenario;
}

const initialValues: FirstTimeUserFormI = {
  code: '',
  confirmCode: ''
};

const FirstTimeUser = ({ handleFirstTimeSubmit, scenario, isLoading }: Props) => {
  const [formStep, setFormStep] = useState<'initial' | 're-enter'>('initial');

  const validationSchema = yup.object().shape<Shape<FirstTimeUserFormI>>({
    code:
      formStep === 'initial'
        ? yup
            .string()
            .required('Please enter your code')
            .length(4, 'Code should be four characters')
        : yup.string(),
    confirmCode:
      formStep === 're-enter'
        ? yup
            .string()
            .oneOf([yup.ref('code'), null], 'Codes do not match')
            .required('Code is required')
        : yup.string()
  });

  const handleSubmit = (
    values: FirstTimeUserFormI,
    formikHelpers: FormikHelpers<FirstTimeUserFormI>
  ) => {
    if (formStep === 'initial') {
      setFormStep('re-enter');

      formikHelpers.setTouched({ code: false, confirmCode: false });
    }

    if (formStep === 're-enter') {
      if (handleFirstTimeSubmit) {
        handleFirstTimeSubmit(values);
      }
    }
  };

  const btnLabel =
    formStep === 'initial'
      ? 'Continue'
      : formStep === 're-enter' && scenario === 'payment'
      ? 'Pay'
      : formStep === 're-enter' && scenario === 'profile'
      ? 'Create code'
      : '';

  // const handleSubmit = (
  //   values: FirstTimeUserFormI,
  //   formikHelpers: FormikHelpers<FirstTimeUserFormI>
  // ) => {
  //   if (formStep === 'initial') {
  //     setFormStep('re-enter');

  //     formikHelpers.setTouched({ code: false, confirmCode: false });
  //   }

  //   if (formStep === 're-enter') {
  //     toast.addToast({ body: 'Code updated successfully' });
  //   }
  // };
  return (
    <Form<FirstTimeUserFormI>
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <Box className="ss-bg-white ss-px-4 ss-py-10 ss-rounded-base ss-space-y-4 ss-mb-8">
        <Text className="ss-text-neutral-500 ss-font-bold ss-text-center" variant="paragraphLarge">
          Enter your code
        </Text>
        {formStep === 'initial' && (
          <>
            <Text className="ss-text-neutral-400 ss-text-center ss-mb-10">
              Create a 4 digit code to authorize this transaction and subsequent transactions
            </Text>
            <OtpField type="password" name="code" length={4} />
          </>
        )}
        {formStep === 're-enter' && (
          <>
            <Text className="ss-text-neutral-400 ss-text-center ss-mb-10">
              Confirm your 4-digit code
            </Text>
            <OtpField type="password" name="confirmCode" length={4} />
          </>
        )}
      </Box>
      <Box className="ss-space-y-3">
        <Button
          label={btnLabel}
          disabled={isLoading}
          showSpinner={isLoading}
          type="submit"
          isBlock
        />
      </Box>
    </Form>
  );
};

export default FirstTimeUser;
