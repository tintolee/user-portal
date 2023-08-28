import React, { useCallback, useEffect, useMemo, FC } from 'react';
import { useFormikContext } from 'formik';
import { Listbox } from '@headlessui/react';
import Api from '@sendsprint/api-types';
import { Flag, Icon, Text } from '@sendsprint/ui-react';
import { ArrowIosDownwardOutline } from '@sendsprint/ui-react/dist/icons';
import ClientApi from '@src/types/client';
import { CountryDropdownItem, CountryDropdownList } from './CountryDropdown';
import { useMedia } from '@src/hooks';
import { ChooseAmountFormData } from '@src/components/sendMoneyFlow/components/amountStep';

type CountryFieldProps = {
  countryName: 'sendCountry' | 'receiveCountry';
  currencyName: 'sendCurrency' | 'receiveCurrency';
  countries: (ClientApi.SendCountry | ClientApi.ReceiveCountry)[];
};

const CountryField: FC<CountryFieldProps> = ({ countries, countryName, currencyName }) => {
  const { values, setFieldValue } = useFormikContext<ChooseAmountFormData>();
  const { isMobile } = useMedia();

  const countryValue = values[countryName];

  const selectedCountry = useMemo<
    ClientApi.SendCountry | ClientApi.ReceiveCountry | undefined
  >(() => {
    return countries.find(({ initials }) => initials === countryValue);
  }, [countries, countryValue]);

  // Component value is invalid if there is no country value or we can't find a selectedCountry for that value?
  const isValueInvalid = !countryValue || !selectedCountry;

  const onChange = useCallback(
    function (value: Api.Model.CountryInitials, setRecentlyChangedProp = true) {
      const currency = countries.find(({ initials }) => initials === value)?.currency;
      if (currency) {
        setFieldValue(countryName, value);
        setFieldValue(currencyName, currency);
      }

      if (setRecentlyChangedProp) {
        setFieldValue('recentlyChangedProp', currencyName);
      }
    },
    [countries, countryName, currencyName, setFieldValue]
  );

  // Is the value invalid? Then we will set the field value to the first country (which will trigger a re-render)
  useEffect(() => {
    if (!isValueInvalid) {
      return;
    }

    onChange(countries[0].initials, false);
  }, [countries, isValueInvalid, onChange]);

  // Is the value invalid? Then render nothing while the component re-renders.
  // We added the extra !selectedCountry check to satisfy TS
  if (isValueInvalid || !selectedCountry) {
    return null;
  }

  return (
    <Listbox value={countryValue} onChange={onChange}>
      {({ open }) => (
        <div className="ss-relative ss-flex ss-items-center">
          <Listbox.Button className="ss-p-2 ss-h-max ss-rounded ss-border ss-bg-neutral-100 ss-border-neutral-300 focus:ss-focus-ring ss-flex ss-items-center ss-text-left ss-space-x-3 md:ss-space-x-2">
            <Flag
              size={'100%'}
              countryInitials={selectedCountry.initials}
              className="ss-w-6 md:ss-w-10"
            />
            <Text
              variant="paragraphLarge"
              className="ss-text-neutral-500 ss-font-bold ss-flex-grow ss-w-auto">
              {selectedCountry && selectedCountry.currency}
            </Text>
            <Icon svg={ArrowIosDownwardOutline} size={24} className="ss-text-primary-100" />
          </Listbox.Button>
          <CountryDropdownList
            open={open}
            position={isMobile ? 'bottom-right-mobile' : 'bottom-right'}>
            {countries.map(({ currency, initials, name }) => (
              <CountryDropdownItem
                key={initials}
                value={initials}
                initials={initials}
                mainText={name}
                otherText={currency}
              />
            ))}
          </CountryDropdownList>
        </div>
      )}
    </Listbox>
  );
};

export type { CountryFieldProps };
export default CountryField;
