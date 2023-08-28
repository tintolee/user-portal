import { recipientSchema, Shape } from '@src/validations';
import * as yup from 'yup';
import { FormSteps, RecipientFormData } from '../../components/recipientStep/addRecipientForm';

const validationSchema = (currentStep: FormSteps) =>
  yup.object().shape<Shape<RecipientFormData>>({
    firstName: currentStep === 2 ? recipientSchema.firstName : yup.string(),
    middleName: currentStep === 2 ? recipientSchema.middleName : yup.string(),
    lastName: currentStep === 2 ? recipientSchema.lastName : yup.string(),
    bankCode: recipientSchema.bankCode,
    accountNumber: recipientSchema.accountNumber,
    accountName: recipientSchema.accountName,
    routingNumber: recipientSchema.routingNumber,
    address: currentStep === 2 ? recipientSchema.address : yup.string(),
    email: currentStep === 2 ? recipientSchema.emailRequired : yup.string(),
    phoneNumber: currentStep === 2 ? recipientSchema.phoneNumber : yup.string(),
    birthday: currentStep === 2 ? recipientSchema.birthday : yup.string(),
    branchCode: recipientSchema.branchCode,
    country: recipientSchema.country,
    paymentOperator: recipientSchema.paymentOperator,
    paymentType: yup.string(),
    saveDetails: yup.boolean()
  });

export default validationSchema;
