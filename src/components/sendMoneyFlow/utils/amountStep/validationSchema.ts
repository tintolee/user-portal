import { amountSchemaFactory, Shape } from '@src/validations';
import { ChooseAmountFormData } from '../../components/amountStep';
import * as yup from 'yup';
import { MAXIMUM_AMOUNT_TO_SEND } from '@src/constants';
import chooseAmountSchema from '@src/validations/schemas/chooseAmount';

const validationSchema = (isUserVerified: boolean) =>
  yup.object().shape<Shape<Omit<ChooseAmountFormData, 'recentlyChangedProp'>>>({
    sendAmount: amountSchemaFactory({
      type: 'send',
      currencyPath: 'sendCurrency',
      minValue: 1,
      maxValue: !isUserVerified ? 50 : MAXIMUM_AMOUNT_TO_SEND,
      errorType: !isUserVerified ? 'unverified' : 'verified'
    }),
    sendCountry: chooseAmountSchema.country,
    sendCurrency: chooseAmountSchema.currency,
    receiveAmount: amountSchemaFactory({
      type: 'receive',
      currencyPath: 'receiveCurrency',
      minValue: 10
    }),
    receiveCountry: chooseAmountSchema.country,
    receiveCurrency: chooseAmountSchema.currency,
    recipientType: chooseAmountSchema.recipientType,
    rate: chooseAmountSchema.rate,
    totalAmount: yup.number()
  });
export default validationSchema;
