import Api from '@sendsprint/api-types';
import { addressSchema, phoneSchemaFactory, registerSchema, Shape } from '@src/validations';
import * as yup from 'yup';
import { RegisterFormI } from '../components/registerForm';

interface RegisterValidationSchemaOptions {
  currentStep: number;
  stepsForPhoneUpdate: 'initial' | 'generated' | 'verified';
  selectedCountry: Api.Model.CountryInitials | undefined;
}

const stringNotRequired = yup.string().notRequired();

export const registerValidationSchema = ({
  currentStep,
  stepsForPhoneUpdate,
  selectedCountry
}: RegisterValidationSchemaOptions) =>
  yup.object().shape<Shape<RegisterFormI>>({
    email: registerSchema.email,
    password: registerSchema.password,
    firstName: registerSchema.firstName,
    lastName: registerSchema.lastName,
    referralCode: registerSchema.referral,
    signUpSource: registerSchema.signUpSource,
    acceptTerms: registerSchema.acceptTerms,
    streetAddress: currentStep === 2 ? addressSchema.streetAddress : stringNotRequired,
    postCode: currentStep === 2 ? addressSchema.postCode : stringNotRequired,
    city: currentStep === 2 ? addressSchema.city : stringNotRequired,
    state: currentStep === 2 ? addressSchema.state : stringNotRequired,
    country: currentStep === 2 ? addressSchema.country : stringNotRequired,
    captcha:
      currentStep === 2 && stepsForPhoneUpdate === 'initial'
        ? yup.string().required('Please verify you are human')
        : stringNotRequired,
    phone:
      currentStep === 2
        ? phoneSchemaFactory({
            countryCodeOrPath: selectedCountry || 'US',
            required: true,
            numbersOnly: true
          })
        : stringNotRequired,
    dateOfBirth: currentStep === 2 ? addressSchema.dateOfBirth : stringNotRequired,
    otp:
      currentStep !== 2 || stepsForPhoneUpdate === 'initial'
        ? yup.string().notRequired()
        : yup
            .string()
            .required('Please enter the otp sent')
            .numbersOnly('Please enter only digits')
            .length(6, 'Otp should be 6 digits')
  });
