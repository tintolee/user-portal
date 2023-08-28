import React, { useEffect, useState, FC, FocusEventHandler } from 'react';
import cs from 'classnames';
import { useField } from 'formik';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import './amount-field.css';
import { ChooseAmountFormData } from '@src/components/sendMoneyFlow/components/amountStep';

type AmountFieldProps = {
  name: 'sendAmount' | 'receiveAmount';
  id?: string;
};

type AmountFieldValueType = number;

const AmountField: FC<AmountFieldProps> = ({ name, id }) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField<AmountFieldValueType>(name);
  const [, , { setValue: setRecentlyChangedPropValue }] =
    useField<ChooseAmountFormData['recentlyChangedProp']>('recentlyChangedProp');

  const [displayValue, setDisplayValue] = useState<string | number>(value);
  const [fixedScale, setFixedScale] = useState(true);
  const [isValueUpdateExternal, setIsValueUpdateExternal] = useState(true);

  useEffect(() => {
    if (isValueUpdateExternal) {
      setDisplayValue(value);

      // we set touched to true only if displayValue isn't empty (usually the case on initial page load for receive currency)
      if (displayValue) {
        setTouched(true);
      }
    }
    // We only need to run this effect when value changes
  }, [value]);

  const valueChangeHandler = (values: NumberFormatValues): void => {
    if (isValueUpdateExternal) {
      return;
    }

    setDisplayValue(values.formattedValue);

    if (value !== values.floatValue) {
      setValue(values.floatValue || 0);
      setRecentlyChangedPropValue(name);
    }
  };

  const onFocusEventHandler: FocusEventHandler<HTMLInputElement> = () => {
    setFixedScale(false);
    setIsValueUpdateExternal(false);
  };

  const onBlurEventHandler: FocusEventHandler<HTMLInputElement> = () => {
    setFixedScale(true);
    setIsValueUpdateExternal(true);

    if (displayValue === '') {
      setDisplayValue(0);
    }

    if (!touched) {
      setTouched(true);
    }
  };

  const isInvalid = !!(touched && error);
  const rootClasses = cs({
    'ss-field ss-amount-field ss-text-body-large ss-font-bold': true,
    'ss-field--invalid ss-amount-field--invalid': isInvalid
  });

  return (
    <NumericFormat
      id={id}
      name={name}
      inputMode="decimal"
      value={displayValue}
      className={rootClasses}
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale={fixedScale}
      allowedDecimalSeparators={[',', '.']}
      allowNegative={false}
      onValueChange={valueChangeHandler}
      onFocus={onFocusEventHandler}
      onBlur={onBlurEventHandler}
    />
  );
};

export type { AmountFieldProps, AmountFieldValueType };
export default AmountField;
