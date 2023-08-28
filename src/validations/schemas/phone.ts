import * as yup from 'yup';
import { PhoneMethodOptions } from '../methods/phone';
import '../methods/phone';

type PhoneSchemaFactoryOptions = {
  required?: boolean | string;
  numbersOnly?: boolean;
  length?: number;
} & PhoneMethodOptions;

const ERROR_MGS_FOR_NUMBERS_ONLY = 'Please enter only digits';
const phoneBaseSchema = yup.string().trim();
// .numbersOnly(ERROR_MGS_FOR_NUMBERS_ONLY);

export function phoneSchemaFactory(
  options: PhoneSchemaFactoryOptions | PhoneMethodOptions['countryCodeOrPath']
) {
  const settings: PhoneSchemaFactoryOptions =
    typeof options === 'string' ? { countryCodeOrPath: options } : options;
  const { required = false, numbersOnly = false, length, ...otherOptions } = settings;
  if (required) {
    const errorMsg = typeof required === 'string' ? required : 'Please enter a phone number';
    if (numbersOnly && length) {
      return (
        phoneBaseSchema
          .required(errorMsg)
          .length(length)
          .matches(/^[0-9]*$/, {
            message: ERROR_MGS_FOR_NUMBERS_ONLY
          })
          // .numbersOnly(ERROR_MGS_FOR_NUMBERS_ONLY)
          .phone(otherOptions)
      );
    } else if (numbersOnly) {
      return (
        phoneBaseSchema
          .required(errorMsg)
          .matches(/^[0-9]*$/, {
            message: ERROR_MGS_FOR_NUMBERS_ONLY
          })
          // .numbersOnly(ERROR_MGS_FOR_NUMBERS_ONLY)
          .phone(otherOptions)
      );
    } else if (length) {
      return (
        phoneBaseSchema
          .required(errorMsg)
          .length(length)
          // .numbersOnly(ERROR_MGS_FOR_NUMBERS_ONLY)
          .phone(otherOptions)
      );
    } else {
      return phoneBaseSchema.required(errorMsg).phone(otherOptions);
    }
  }
  return phoneBaseSchema.phone(otherOptions);
}
