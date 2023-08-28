import * as yup from 'yup';

const stringSchema = yup.string().trim();

export const securityQuestionSchema = {
  question: stringSchema
    .required('Please enter a question')
    // eslint-disable-next-line no-template-curly-in-string
    .max(200, 'Please enter a maximum of ${max} characters'),
  answer: stringSchema
    .required('Please enter an answer')
    // eslint-disable-next-line no-template-curly-in-string
    .max(100, 'Please enter a maximum of ${max} characters')
};
