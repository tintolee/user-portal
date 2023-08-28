import * as yup from 'yup';

const stringSchema = yup.string().trim();

const passwordSchema = stringSchema;

const newPasswordSchema = passwordSchema
  // eslint-disable-next-line no-template-curly-in-string
  .min(8, 'Password must have a minimum of ${min} characters')
  .matches(/[0-9]+/, 'Password must have at least a number')
  .matches(/[a-zA-Z]+/, 'Password must have at least a letter');

export const userSchema = {
  firstName: stringSchema.required('Please enter a first name'),
  lastName: stringSchema.required('Please enter a last name'),
  email: stringSchema.required('Please enter an email').email('Please enter a valid email'),
  password: passwordSchema.required('Please enter a password'),
  registerPassword: newPasswordSchema.required('Please enter a password'),
  oldPassword: passwordSchema.required('Please enter your current password'),
  newPassword: newPasswordSchema.required('Please enter your new password'),
  referral: stringSchema.required('Please enter a referral code'),
  address: stringSchema.required('Please enter your address'),
  city: stringSchema.required('Please enter your city'),
  postalCode: stringSchema,
  country: stringSchema.required('Please select a country'),
  date: stringSchema.required('Please select your date of birth')
};

export const loginSchema = {
  email: userSchema.email,
  password: userSchema.password
};

export const registerSchema = {
  firstName: userSchema.firstName,
  lastName: userSchema.lastName,
  email: userSchema.email,
  password: userSchema.registerPassword,
  referral: yup.string().notRequired(),
  signUpSource: yup.string().notRequired(),
  acceptTerms: yup.boolean().oneOf([true], 'Kindly agree to the terms')
};

export const changePasswordSchema = {
  password: userSchema.registerPassword
};

export const resetPasswordSchema = {
  email: userSchema.email
};

export const addressSchema = {
  streetAddress: stringSchema.required('Please enter your street address'),
  postCode: stringSchema, // not required, because it can be different depending on country
  city: stringSchema.required('Please enter a city'),
  state: stringSchema.required('Please select your state'),
  country: stringSchema.required('Please choose a country'),
  phone: stringSchema.required('Please enter your phone number'),
  dateOfBirth: stringSchema.required('Please add your date of birth')
  // otp: stringSchema
  //   .required("Please enter the otp sent")
  //   .numbersOnly("Please enter only digits")
  //   .length(6, "Otp should be 6 digits"),
};
