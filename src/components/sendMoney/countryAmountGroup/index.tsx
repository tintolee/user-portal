import ClientApi from '@src/types/client';
import { useField } from 'formik';
import React, { useId } from 'react';
import AmountField, { AmountFieldProps } from '../amountField';
import CountryField, { CountryFieldProps } from '../countryField';
import cs from 'classnames';
import { ExtraInfo } from '@sendsprint/ui-react';

type CountryAmountGroupProps = {
  amountName: AmountFieldProps['name'];
  countryName: CountryFieldProps['countryName'];
  currencyName: CountryFieldProps['currencyName'];
  label: string;
  countries: (ClientApi.SendCountry | ClientApi.ReceiveCountry)[];
};

const CountryAmountGroup = ({
  countries,
  label,
  amountName,
  countryName,
  currencyName
}: CountryAmountGroupProps) => {
  const id = useId();
  const [, { touched, error }] = useField(amountName);
  const canShowError = touched && error;

  const rootClasses = cs('ss-rounded', {
    'ss-border ss-border-error-100': canShowError
  });
  return (
    <div className={rootClasses}>
      <div className="ss-flex ss-p-3">
        <div className="ss-flex-grow ss-relative">
          <label
            htmlFor={id}
            className="ss-absolute ss-inset-x-4 ss-top-4 ss-text-body ss-text-neutral-400">
            {label}
          </label>
          <AmountField id={id} name={amountName} />
        </div>

        <CountryField countries={countries} countryName={countryName} currencyName={currencyName} />
      </div>
      {canShowError && (
        <div className="ss--mt-2">
          <ExtraInfo variant="error" extraInfo={error} />
        </div>
      )}
    </div>
  );
};

export default CountryAmountGroup;
