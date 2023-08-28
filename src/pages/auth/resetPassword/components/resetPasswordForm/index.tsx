import React from 'react';
import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import Form from '@sendsprint/ui-react/dist/components/form2/formContainer/FormContainer';
import FormField from '@sendsprint/ui-react/dist/components/form2/formInput/FormInput';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { resetPasswordSchema, Shape } from '@src/validations';

export interface ResetPasswordI {
  email: string;
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: ResetPasswordI, formikHelpers: FormikHelpers<ResetPasswordI>) => void;
  isLoading: boolean;
}

const initialValues: ResetPasswordI = {
  email: ''
};

const validationSchema = yup.object().shape<Shape<ResetPasswordI>>({
  email: resetPasswordSchema.email
});

const ResetPasswordForm = ({ handleSubmit, isLoading }: Props) => {
  return (
    <Form<ResetPasswordI>
      className="ss-flex ss-flex-col ss-gap-4"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <FormField name="email" label="Email address" type="email" />
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

export default ResetPasswordForm;
