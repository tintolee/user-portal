import * as yup from 'yup';
import parsePhoneNumber, {
  isSupportedCountry as isc,
  CountryCode,
  PhoneNumber
} from 'libphonenumber-js/mobile';
import { getEnvData } from '@src/utils/env';

const { IS_DEV } = getEnvData();

export type PhoneMethodOptions = {
  /**
   * The CountryCode or country path to check against
   */
  countryCodeOrPath: CountryCode | string;
  /**
   * How strictly should it check.
   */
  strict?: boolean;
  /**
   * The error message if the validation fails. It also supports variables for ${value} and ${countryCode}.
   */
  errorMessage?: string;
};

declare module 'yup' {
  export interface StringSchema {
    // eslint-disable-next-line no-unused-vars
    phone(options: PhoneMethodOptions): StringSchema;
  }
}

const PHONE_METHOD_NAME = 'phone';

const isSupportedCountry = (value: string): value is CountryCode => {
  return isc(value as CountryCode);
};

yup.addMethod(
  yup.string,
  PHONE_METHOD_NAME,
  function ({ countryCodeOrPath = '', strict = true, errorMessage = '' }: PhoneMethodOptions) {
    const errMsg = errorMessage
      ? errorMessage
      : isSupportedCountry(countryCodeOrPath)
      ? `Please enter a valid mobile phone number in country ${countryCodeOrPath}`
      : 'Please enter a valid mobile phone number';

    return this.test(PHONE_METHOD_NAME, function (value) {
      // Bail early if there is no value
      if (!value) {
        return true;
      }

      const { path, createError, parent } = this;
      const getError = () => {
        return createError({
          message: errMsg
            .replace(`\${value}`, value)
            .replace(`\${countryCode}`, countryCode || '')
            .trim(),
          path
        });
      };

      let countryCode: CountryCode | undefined;
      if (isSupportedCountry(countryCodeOrPath)) {
        countryCode = countryCodeOrPath;
      } else if (isSupportedCountry(parent[countryCodeOrPath])) {
        countryCode = parent[countryCodeOrPath];
      }

      if (!countryCode && IS_DEV) {
        console.warn(
          '[Phone validation] no countryCode was found. Please specify a countryCode/path or make sure your value is in international format'
        );
      }

      let phoneNumber: PhoneNumber | undefined;
      try {
        phoneNumber = parsePhoneNumber(value, {
          defaultCountry: countryCode,
          extract: false
        });
      } catch (e) {
        // Couldn't parse phone number, return error message
        return getError();
      }

      // phoneNumber is undefined
      if (!phoneNumber) {
        return getError();
      }

      const isValidMethod = strict
        ? phoneNumber.isValid.bind(phoneNumber)
        : phoneNumber.isPossible.bind(phoneNumber);

      return isValidMethod() ? true : getError();
    });
  }
);

export {};
