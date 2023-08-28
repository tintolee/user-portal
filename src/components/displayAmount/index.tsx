import React, { Fragment, FC } from 'react';
import { NumericFormat } from 'react-number-format';
import { getMonetaryValue } from '@src/utils/currency';

type DisplayAmountProps = {
  as?: keyof JSX.IntrinsicElements;
  value: number;
  currency: string;
  prefix?: string;
  suffix?: string;
  decimalScale?: number;
};

const DisplayAmount: FC<DisplayAmountProps> = ({
  as,
  value,
  currency,
  prefix = '',
  suffix = '',
  decimalScale = 2
}) => {
  const combinedSuffix = [currency, suffix].join(' ').trim();
  const Component = as || Fragment;
  return (
    <NumericFormat
      displayType="text"
      value={getMonetaryValue(value, { fractionDigits: decimalScale })}
      thousandSeparator={true}
      decimalScale={decimalScale}
      fixedDecimalScale={true}
      renderText={(formattedValue) => <Component>{formattedValue}</Component>}
      prefix={prefix && `${prefix} `}
      suffix={` ${combinedSuffix}`}
    />
  );
};

export default DisplayAmount;
