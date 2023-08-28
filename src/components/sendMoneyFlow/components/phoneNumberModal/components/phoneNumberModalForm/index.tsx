import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import Form from '@sendsprint/ui-react/dist/components/form2/formContainer/FormContainer';
import FormField from '@sendsprint/ui-react/dist/components/form2/formInput/FormInput';
import Text from '@sendsprint/ui-react/dist/components/Text';
import useId from '@sendsprint/ui-react/dist/hooks/useId';
import PhoneOutline from '@sendsprint/ui-react/dist/icons/PhoneOutline';
import { RESEND_OTP_COUNTDOWN_TIME } from '@src/constants';
import { useAccount } from '@src/contexts/auth-context';
import { phoneSchemaFactory } from '@src/validations';
import { FormikHelpers } from 'formik';
import React, { lazy, useState } from 'react';
import * as yup from 'yup';
import { UpdatePhoneNumberData } from '../../../phoneNumberUpdate';

const OtpScreen = lazy(() => import(/*webpackChunkName:'OtpScreen'*/ '../otpScreen'));

interface Props {
  stepsForPhoneUpdate?: 'initial' | 'generated' | 'verified';
  handleSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: UpdatePhoneNumberData,
    // eslint-disable-next-line no-unused-vars
    helpers: FormikHelpers<UpdatePhoneNumberData>
  ) => void;
  changePhoneNumber?: () => void;
  verifyStatus?: boolean | null;
  phoneUpdateLoading?: boolean;
  handleClose: () => void;
}

const PhoneNumberModalForm = ({
  stepsForPhoneUpdate,
  handleSubmit,
  changePhoneNumber,
  verifyStatus,
  phoneUpdateLoading,
  handleClose
}: Props) => {
  const titleId = useId();
  const { userAddress, user } = useAccount();
  const [counter, setCounter] = useState(RESEND_OTP_COUNTDOWN_TIME);

  const validationSchema = yup.object().shape({
    phone: phoneSchemaFactory({
      countryCodeOrPath: userAddress?.country || 'US',
      required: true,
      numbersOnly: true
    }),
    otp:
      stepsForPhoneUpdate === 'initial'
        ? yup.string().notRequired()
        : yup
            .string()
            .required('Please enter the otp sent')
            .numbersOnly('Please enter only digits')
            .length(6, 'Otp should be 6 digits')
  });

  return (
    <Form<UpdatePhoneNumberData>
      initialValues={{
        phone: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <Box className="ss-max-w-4xl ss-mx-auto">
        <div className="ss-mb-10 ss-space-y-4">
          {stepsForPhoneUpdate === 'initial' && (
            <>
              <Text as="h6" className="ss-text-center" id={titleId}>
                We need some additional information from you
              </Text>

              <Text className="ss-text-neutral-40 ss-text-center">
                We&apos;ll need your phone number to improve the quality of service we provide you.
              </Text>

              <FormField label="Phone number" name="phone" type="tel" icon={PhoneOutline} />
            </>
          )}
          {stepsForPhoneUpdate !== 'initial' && (
            <OtpScreen
              changePhoneNumber={changePhoneNumber}
              titleId={titleId}
              counter={counter}
              setCounter={setCounter}
              user={user}
              verifyStatus={verifyStatus}
            />
          )}
        </div>
        <div className="ss-space-y-6"></div>
      </Box>

      <Box className="ss-text-center ss-max-w-4xl ss-mx-auto">
        <div>
          {stepsForPhoneUpdate === 'initial' && (
            <>
              <Button
                className="ss-mb-6"
                label="Save"
                variant="primary"
                type="submit"
                isBlock={true}
                showSpinner={phoneUpdateLoading}
                disabled={phoneUpdateLoading}
              />
              <Button
                onClick={handleClose}
                label="I'll do this later"
                variant="tertiary"
                isBlock={true}
                type="button"
              />
            </>
          )}
          {stepsForPhoneUpdate !== 'initial' && (
            <>
              <Button
                className="ss-mb-6"
                label="Verify phone number"
                variant="primary"
                type="submit"
                isBlock={true}
                showSpinner={phoneUpdateLoading}
                disabled={phoneUpdateLoading}
              />
            </>
          )}
        </div>
      </Box>
    </Form>
  );
};

export default PhoneNumberModalForm;
