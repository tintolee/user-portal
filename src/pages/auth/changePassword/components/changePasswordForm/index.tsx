import React from 'react';
import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import ExtraInfo from '@sendsprint/ui-react/dist/components/ExtraInfo';
import Form from '@sendsprint/ui-react/dist/components/form2/formContainer/FormContainer';
import FormField from '@sendsprint/ui-react/dist/components/form2/formInput/FormInput';
import { FormikHelpers } from 'formik';
import LockOutline from '@sendsprint/ui-react/dist/icons/LockOutline';
import { PasswordValidationInfo } from '@src/components/passwordValidationInfo';
import * as yup from 'yup';
import { changePasswordSchema, Shape } from '@src/validations';

export interface ChangePasswordI {
  password: string;
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: ChangePasswordI, formikHelpers: FormikHelpers<ChangePasswordI>) => void;
  isLoading: boolean;
}

const initialValues: ChangePasswordI = {
  password: ''
};

const validationSchema = yup.object().shape<Shape<ChangePasswordI>>({
  password: changePasswordSchema.password
});

const ChangePasswordForm = ({ handleSubmit, isLoading }: Props) => {
  return (
    <Form<ChangePasswordI>
      className="ss-flex ss-flex-col ss-gap-4"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Box>
        <FormField
          name="password"
          disableErrorFromShowing
          icon={LockOutline}
          label="New password"
          type="password"
        />
        <ExtraInfo
          extraInfo={<PasswordValidationInfo passwordFieldName="password" className="" />}
        />
      </Box>
      <Box className="ss-mt-6">
        <Button
          type="submit"
          isBlock
          disabled={isLoading}
          showSpinner={isLoading}
          label="Continue"
        />
      </Box>
    </Form>
  );
};

export default ChangePasswordForm;
