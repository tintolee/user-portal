import * as yup from 'yup';

declare module 'yup' {
  export interface StringSchema {
    // eslint-disable-next-line no-unused-vars
    numbersOnly(errorMessage?: string): StringSchema;
  }
}

const METHOD_NAME = 'numbersOnly';

yup.addMethod(yup.string, METHOD_NAME, function (errorMessage?: string) {
  const errorMsg = errorMessage || `Only numbers allowed for \${path}`;
  return this.test(METHOD_NAME, errorMsg, function (value) {
    if (!value) {
      return true;
    }
    return /^[0-9]*$/.test(value);
  });
});
