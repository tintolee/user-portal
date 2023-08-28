import { ExtraInfo } from '@sendsprint/ui-react';
import { ErrorMessage } from 'formik';
import React from 'react';

interface Props {
  name: string;
}

const FormError = ({ name }: Props) => {
  return (
    <ErrorMessage name={name}>
      {(errorMessage) => <ExtraInfo variant="error" extraInfo={errorMessage} />}
    </ErrorMessage>
  );
};

export default FormError;
