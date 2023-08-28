import { recipientSchema, Shape } from '@src/validations';
import * as yup from 'yup';
import { RecipientFormData } from '../../components/recipientStep/addRecipientForm';

const notRequired = yup.string().notRequired();

const validationSchema = () =>
  yup.object().shape<Shape<RecipientFormData>>({
    firstName: recipientSchema.firstName,
    middleName: recipientSchema.middleName,
    lastName: recipientSchema.lastName,
    bankCode: notRequired,
    accountNumber: notRequired,
    accountName: notRequired,
    routingNumber: notRequired,
    address: recipientSchema.address,
    email: recipientSchema.emailRequired,
    // phoneNumber: phoneSchemaFactory({
    //   countryCodeOrPath: 'country',
    //   required: true,
    //   strict: false
    // }),
    phoneNumber: recipientSchema.phoneNumber,
    birthday: recipientSchema.birthday,
    branchCode: recipientSchema.branchCode,
    country: recipientSchema.country,
    city: recipientSchema.city,
    paymentOperator: recipientSchema.paymentOperator,
    paymentType: yup.string(),
    saveDetails: yup.boolean()
  });

export default validationSchema;
