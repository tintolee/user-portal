import * as yup from 'yup';

const stringSchema = yup.string().trim();

const amountFieldSchema = yup
  .number()
  .required('Please enter an amount')
  .typeError('Please enter a valid number');

export function amountSchemaFactory({
  type,
  currencyPath,
  minValue,
  maxValue,
  errorType
}: {
  type: 'send' | 'receive';
  currencyPath: string;
  minValue: number;
  maxValue?: number | null;
  errorType?: 'unverified' | 'verified';
}) {
  const minAmountErrorPrefix =
    type === 'send' ? 'The smallest amount you can send is' : 'The smallest amount they can get is';

  const maxAmountErrorPrefix = 'Oops. You can only send up to';

  return amountFieldSchema
    .test({
      name: 'min-amount',
      test: function (value) {
        const { path, createError, parent } = this;
        const currency = parent[currencyPath];
        const numberValue = value || 0;

        return numberValue >= minValue
          ? true
          : createError({
              message: `${minAmountErrorPrefix} ${minValue} ${currency}`.trim(),
              path
            });
      }
    })
    .test({
      name: 'max-amount',
      test: function (value) {
        const { path, createError, parent } = this;
        const currency = parent[currencyPath];
        const numberValue = value || 0;
        const maxAmtFullErrorVerified = `Oops. You can only send up to ${maxValue} ${currency} per transaction`;
        const maxAmtFullErrorUnverified = `Oops. You can only send up to ${maxValue} ${currency}. To increase your limit, please verify your account.`;

        if (maxValue) {
          return numberValue <= maxValue
            ? true
            : createError({
                message:
                  errorType === 'verified'
                    ? maxAmtFullErrorVerified
                    : errorType === 'unverified'
                    ? maxAmtFullErrorUnverified
                    : `${maxAmountErrorPrefix} ${maxValue} ${currency}`.trim(),
                path
              });
        }

        return true;
      }
    });
}

const chooseAmountSchema = {
  currency: stringSchema.required('Please choose a currency'),
  country: stringSchema.required('Please choose a country'),
  recipientType: stringSchema.required('Please select a payment delivery method'),
  rate: yup.object().required('Please wait while we get the new rate')
};

export default chooseAmountSchema;
