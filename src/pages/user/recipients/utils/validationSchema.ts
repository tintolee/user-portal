import { recipientSchema, Shape } from '@src/validations';
import * as yup from 'yup';
import { AddRecipientFormI, FormSteps } from '../components/addRecipientForm';

export const addRecipientValidationSchema = (currentStep: FormSteps) =>
  yup.object().shape<Shape<AddRecipientFormI>>({
    firstName: currentStep === 3 ? recipientSchema.firstName : yup.string(),
    middleName: currentStep === 3 ? recipientSchema.middleName : yup.string(),
    lastName: currentStep === 3 ? recipientSchema.lastName : yup.string(),
    bankCode: currentStep > 1 ? recipientSchema.bankCode : yup.string(),
    accountNumber: currentStep > 1 ? recipientSchema.accountNumber : yup.string(),
    accountName: currentStep > 1 ? recipientSchema.accountName : yup.string(),
    routingNumber: currentStep > 1 ? recipientSchema.routingNumber : yup.string(),
    address: currentStep === 3 ? recipientSchema.address : yup.string(),
    email: currentStep === 3 ? recipientSchema.emailRequired : yup.string(),
    phoneNumber: currentStep === 3 ? recipientSchema.phoneNumber : yup.string(),
    birthday: currentStep === 3 ? recipientSchema.birthday : yup.string(),
    branchCode: currentStep > 1 ? recipientSchema.branchCode : yup.string(),
    country: recipientSchema.country,
    paymentOperator: currentStep > 1 ? recipientSchema.paymentOperator : yup.string(),
    paymentType: recipientSchema.paymentType,
    saveDetails: yup.boolean()
  });
