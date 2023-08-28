import { isNumber } from '@src/utils/type';

type GetAmountDisplayValueOptions = {
  /** the amount to display */
  value: number;
  /** the number of decimal points to show */
  fractionDigits?: number;
  /** the decimal separator */
  decimalSeparator?: '.' | ',';
};

interface GetAmountDisplayValueFn {
  // eslint-disable-next-line no-unused-vars
  (value: number): string;
  // eslint-disable-next-line no-unused-vars
  (options: GetAmountDisplayValueOptions): string;
}

/**
 * Get the string value of an amount to shown in the UI. It is used for display purposes only.
 */
export const getAmountDisplayValue: GetAmountDisplayValueFn = (
  options: number | GetAmountDisplayValueOptions
) => {
  const settings = isNumber(options) ? { value: options } : options;
  const { value, fractionDigits = 2, decimalSeparator = '.' } = settings;

  const zeroSuffixes = '00000000000000000000';
  const [integerStr, decimalStr] = value.toString(10).split('.');
  const decimalStr2 = `${decimalStr || ''}${zeroSuffixes}`.substr(0, fractionDigits);

  return `${integerStr}${decimalSeparator}${decimalStr2}`;
};

/**
 * Get the value for a currency amount to the specified no of digits or less.
 */
type GetMonetaryValueOptions = {
  fractionDigits?: number;
  strategy?: 'ceil' | 'floor';
};

interface GetMonetaryValueFn {
  // eslint-disable-next-line no-unused-vars
  (amount: number, options?: GetMonetaryValueOptions): number;
}

export const getMonetaryValue: GetMonetaryValueFn = (amount, options = {}) => {
  const { fractionDigits = 2, strategy = 'floor' } = options;
  const [integerStr, decimalStr] = amount.toString(10).split('.');
  // make sure there's always a decimalStr
  let decimalStr2 = decimalStr || '';

  const PADDING_ZEROS = '0000000000000000000000000000000000000000';
  const truncatedDecimalStr = `${decimalStr2}${PADDING_ZEROS}`.substr(0, fractionDigits);

  if (strategy === 'floor') {
    decimalStr2 = truncatedDecimalStr;
  }

  if (strategy === 'ceil') {
    // there's more digits after the no of fraction digits it means we should probably raise the value up
    if (decimalStr?.length > fractionDigits) {
      decimalStr2 = String(Number(truncatedDecimalStr) + 1);
    } else {
      decimalStr2 = truncatedDecimalStr;
    }
  }
  return Number(`${integerStr}.${decimalStr2}`);
};
