import Api from '@sendsprint/api-types';
import { addressSchema, phoneSchemaFactory } from '@src/validations';
import * as yup from 'yup';

const validationSchema = (
  selectedCountry: Api.Model.CountryInitials,
  stepsForPhoneUpdate: 'initial' | 'generated' | 'verified'
) =>
  yup.object().shape({
    streetAddress: addressSchema.streetAddress,
    postCode: addressSchema.postCode,
    city: addressSchema.city,
    country: addressSchema.country,
    state: addressSchema.state,
    dateOfBirth: addressSchema.dateOfBirth,
    phone: phoneSchemaFactory({
      countryCodeOrPath: selectedCountry || 'US',
      required: true,
      numbersOnly: true
    }),
    // phone: yup.string(),
    captcha:
      stepsForPhoneUpdate === 'initial'
        ? yup.string().required('Please verify you are human')
        : yup.string().notRequired(),
    otp:
      stepsForPhoneUpdate === 'initial'
        ? yup.string().notRequired()
        : yup
            .string()
            .required('Please enter the otp sent')
            .numbersOnly('Please enter only digits')
            .length(6, 'Otp should be 6 digits')
  });

export default validationSchema;
