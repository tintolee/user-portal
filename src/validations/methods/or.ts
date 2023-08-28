import * as yup from 'yup';
import { AnySchema } from 'yup';

declare module 'yup' {
  export interface MixedSchema {
    // eslint-disable-next-line no-unused-vars
    or(schemas: AnySchema[], errorMsg: string): MixedSchema;
  }
  export interface StringSchema {
    // eslint-disable-next-line no-unused-vars
    or(schemas: AnySchema[], errorMsg: string): StringSchema;
  }
}

const METHOD_NAME = 'or';

yup.addMethod(yup.mixed, METHOD_NAME, function (schemas: AnySchema[], errorMsg: string) {
  return this.test(METHOD_NAME, errorMsg, (value) => {
    if (Array.isArray(schemas) && schemas.length > 1) {
      const validateSchemas = schemas.map((schema) => schema.isValidSync(value));
      return validateSchemas.some((res) => res);
    } else {
      throw new TypeError('Schemas is not correct array schema');
    }
  });
});
