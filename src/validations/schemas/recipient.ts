import Api from '@sendsprint/api-types';
import * as yup from 'yup';
import { StringSchema } from 'yup';
import { ConditionOptions } from 'yup/lib/Condition';
import { AnyObject } from 'yup/lib/types';
import '../methods/numbersOnly';
import '../methods/or';
import { phoneSchemaFactory } from './phone';

const stringSchema = yup.string().trim();
const ERROR_MGS_FOR_NUMBERS_ONLY = 'Please enter only digits';

const paymentTypesWithBankCode = [
  'NG-DOM',
  'NG-CASH',
  'NG-A-DOM',
  'GH-BANK',
  'GH-MOBILE',
  'KE-BANK',
  'ZA-BANK',
  'NEW-NG-BANK'
];

export const paymentTypesWithBranchCode = ['GH-BANK'];
export const paymentTypesWithAccountName = ['NG-DOM', 'NG-A-DOM', 'NEW-NG-BANK'];
const paymentTypesWithRoutingNumber = ['NG-DOM'];
const paymentTypesWithRequiredPhoneNumbers = [
  'GH-BANK',
  'GH-MOBILE',
  'KE-BANK',
  'KE-MOBILE',
  'NG-DOM',
  'NG-CASH',
  'NG-A-DOM',
  'ZA-BANK',
  'NEW-NG-BANK',
  'giftcard'
];
const paymentTypesWithAccountNumber = [
  'GH-BANK',
  'KE-BANK',
  // 'KE-MOBILE',
  'NG-DOM',
  // 'NG-CASH',
  'NG-A-DOM',
  'ZA-BANK',
  'NEW-NG-BANK'
];

const accountNumberSchema = stringSchema
  .required('Please enter an account number')
  .numbersOnly('Please enter only digits');

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const resolveAccNumberCountry = (country: string, schema: StringSchema, paymentType: string) => {
  return country === Api.Model.CountryInitials.Ghana
    ? accountNumberSchema.length(13, `\${length} digits required`)
    : country === Api.Model.CountryInitials.Nigeria ||
      country === Api.Model.CountryInitials.NigeriaNig
    ? accountNumberSchema.length(10, `\${length} digits required`)
    : country === Api.Model.CountryInitials.SouthAfrica
    ? accountNumberSchema.or(
        [
          accountNumberSchema.length(9),
          accountNumberSchema.length(10),
          accountNumberSchema.length(11)
        ],
        'Please enter 9 to 11 digits'
      )
    : country === Api.Model.CountryInitials.Kenya
    ? accountNumberSchema.or(
        [
          accountNumberSchema.length(9),
          accountNumberSchema.length(10),
          accountNumberSchema.length(11)
        ],
        'Please enter 9 to 11 digits'
      )
    : schema.notRequired();
};

const resolveAccountNumber = (country: string, paymentType: string, schema: StringSchema) => {
  return paymentTypesWithAccountNumber.includes(paymentType)
    ? resolveAccNumberCountry(country, schema, paymentType)
    : schema.notRequired();
};

const resolveBankCode = (paymentType: string, schema: StringSchema) => {
  const errorMsg =
    paymentType === 'GH-MOBILE' ? 'Please choose a mobile operator' : 'Please choose a bank';

  return paymentTypesWithBankCode.includes(paymentType)
    ? schema.required(errorMsg)
    : schema.notRequired();
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const resolvePhoneNumber = (country: string, paymentType: string, schema: StringSchema) => {
  const countryCode =
    country === Api.Model.CountryInitials.NigeriaNig ? Api.Model.CountryInitials.Nigeria : country;

  return countryCode === 'GH' && paymentType === 'GH-MOBILE'
    ? yup
        .string()
        .required('Please enter a phone number')
        .matches(/^[0-9]*$/, {
          message: ERROR_MGS_FOR_NUMBERS_ONLY
        })
        .length(10, 'Please enter 10 digits')
    : paymentTypesWithRequiredPhoneNumbers.includes(paymentType)
    ? phoneSchemaFactory({
        countryCodeOrPath: countryCode,
        required: true,
        numbersOnly: true,
        strict: false
      })
    : phoneSchemaFactory('country');
};

export const recipientSchema = {
  firstName: stringSchema.required('Please enter a first name'),
  middleName: stringSchema.optional(),
  lastName: stringSchema.required('Please enter a last name'),
  paymentType: stringSchema.required('Please select a payment type'),
  bankCode: stringSchema.when(
    ['paymentType'],
    resolveBankCode as unknown as ConditionOptions<
      StringSchema<string | undefined, AnyObject, string | undefined>
    >
  ),
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  branchCode: stringSchema.when('paymentType', (paymentType: string, schema: StringSchema) =>
    paymentTypesWithBranchCode.includes(paymentType)
      ? stringSchema.required('Please choose a bank branch')
      : stringSchema.notRequired()
  ),
  accountName: stringSchema.when('paymentType', (paymentType: string, schema: StringSchema) =>
    paymentTypesWithAccountName.includes(paymentType)
      ? stringSchema.required('Please enter account name')
      : schema.notRequired()
  ),
  accountNumber: stringSchema.when(
    ['country', 'paymentType'],
    resolveAccountNumber as unknown as ConditionOptions<
      StringSchema<string | undefined, AnyObject, string | undefined>
    >
  ),
  accountNumberNG: accountNumberSchema.length(10, `\${length} digits required`),
  accountNumberGH: accountNumberSchema.length(13, `\${length} digits required`),
  accountNumberZA: accountNumberSchema.or(
    [accountNumberSchema.length(9), accountNumberSchema.length(10), accountNumberSchema.length(11)],
    'Please enter 9 to 11 digits'
  ),
  accountNameNG: stringSchema.required('Please enter account name'),
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  routingNumber: stringSchema.when('paymentType', (paymentType: string, schema: StringSchema) =>
    paymentTypesWithRoutingNumber.includes(paymentType)
      ? stringSchema
          .required('Please enter a routing number')
          .numbersOnly('Please enter only digits')
          .length(9, 'Please enter 9 digits')
      : stringSchema.notRequired()
  ),
  address: stringSchema.required('Please enter your address'),
  // address: stringSchema.required('Please enter an address'),
  city: stringSchema.required('Please enter a city'),
  emailRequired: stringSchema.required('Please enter an email').email('Please enter a valid email'),
  emailOptional: stringSchema.email('Please enter a valid email'),
  mobileOperator: stringSchema.required('Please choose a mobile operator'),
  birthday: stringSchema,
  country: stringSchema.required('Please choose a country'),
  paymentOperator: stringSchema,
  // phoneNumber: stringSchema.when('paymentType', (paymentType: string, schema: StringSchema) =>
  //   paymentTypesWithRequiredPhoneNumbers.includes(paymentType)
  //     ? phoneSchemaFactory({
  //         countryCodeOrPath: 'country',
  //         required: true,
  //         strict: false
  //       })
  //     : phoneSchemaFactory('country')
  phoneNumber: stringSchema.when(
    ['country', 'paymentType'],
    resolvePhoneNumber as unknown as ConditionOptions<
      StringSchema<string | undefined, AnyObject, string | undefined>
    >
  )
};
