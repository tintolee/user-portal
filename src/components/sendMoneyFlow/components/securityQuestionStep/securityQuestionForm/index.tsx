import { Box, Button, Form, FormField, FormFieldTextarea, FormProps } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import { securityQuestionSchema, Shape } from '@src/validations';
import React from 'react';
import * as yup from 'yup';

export type SecurityQuestionFormData = {
  question: string;
  answer: string;
};

const validationSchema = yup.object().shape<Shape<SecurityQuestionFormData>>({
  question: securityQuestionSchema.question,
  answer: securityQuestionSchema.answer
});

const initialValues: ClientApi.InitialFormData<SecurityQuestionFormData> = {
  question: '',
  answer: ''
};

type SecurityQuestionFormProps = {
  formData?: SecurityQuestionFormData;
  onSubmit: FormProps<SecurityQuestionFormData>['onSubmit'];
};

const SecurityQuestionForm = ({ onSubmit, formData }: SecurityQuestionFormProps) => {
  return (
    <Form<SecurityQuestionFormData>
      initialValues={formData || initialValues}
      validationSchema={validationSchema}
      className="ss-space-y-4"
      onSubmit={onSubmit}>
      <FormField name="question" label="Security Question" extraInfo="Enter a security question" />
      <FormFieldTextarea
        name="answer"
        label="Answer"
        extraInfo="Enter the answer to the security question"
      />
      <Box>
        <Button label="Add & Continue" type="submit" isBlock={true} />
      </Box>
    </Form>
  );
};

export default SecurityQuestionForm;
