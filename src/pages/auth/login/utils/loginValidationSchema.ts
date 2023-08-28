import Api from '@sendsprint/api-types';
import { addressSchema, loginSchema, phoneSchemaFactory, Shape } from '@src/validations';
import * as yup from 'yup';
import { LoginFormI } from '../components/loginForm';

const stringNotRequired = yup.string().notRequired();

interface LoginValidationSchemaOptions {
  currentStep: number;
  stepsForPhoneUpdate: 'initial' | 'generated' | 'verified';
  selectedCountry: Api.Model.CountryInitials | undefined;
}

export const loginValidationSchema = ({
  currentStep,
  stepsForPhoneUpdate,
  selectedCountry
}: LoginValidationSchemaOptions) =>
  yup.object().shape<Shape<LoginFormI>>({
    email: loginSchema.email,
    password: loginSchema.password,
    streetAddress: currentStep === 2 ? addressSchema.streetAddress : stringNotRequired,
    postCode: currentStep === 2 ? addressSchema.postCode : stringNotRequired,
    city: currentStep === 2 ? addressSchema.city : stringNotRequired,
    state: currentStep === 2 ? addressSchema.city : stringNotRequired,
    dateOfBirth: currentStep === 2 ? addressSchema.dateOfBirth : stringNotRequired,
    country: currentStep === 2 ? addressSchema.country : stringNotRequired,
    captcha:
      currentStep === 2 && stepsForPhoneUpdate === 'initial'
        ? yup.string().required('Please verify you are human')
        : stringNotRequired,
    phone:
      currentStep === 2
        ? phoneSchemaFactory({
            countryCodeOrPath: selectedCountry || '',
            required: true,
            numbersOnly: true
          })
        : stringNotRequired,
    otp:
      currentStep !== 2 || stepsForPhoneUpdate === 'initial'
        ? yup.string().notRequired()
        : yup
            .string()
            .required('Please enter the otp sent')
            .numbersOnly('Please enter only digits')
            .length(6, 'Otp should be 6 digits')
  });
