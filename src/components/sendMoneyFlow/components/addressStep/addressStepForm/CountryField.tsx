import Api from '@sendsprint/api-types';
import { FormFieldDropdown } from '@sendsprint/ui-react';
import { GlobeOutline } from '@sendsprint/ui-react/dist/icons';
import ClientApi from '@src/types/client';
import { useField } from 'formik';
import React, { useEffect } from 'react';

interface Props {
  countries: ClientApi.SendCountry[];
  name: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedCountry: (value: React.SetStateAction<Api.Model.CountryInitials | undefined>) => void;
}

const CountryField = ({ countries, name, setSelectedCountry }: Props) => {
  const [{ value }] = useField(name);

  useEffect(() => {
    if (value) {
      setSelectedCountry(value);
    }
  }, [value]);
  return (
    <FormFieldDropdown
      data={countries || []}
      icon={GlobeOutline}
      emptyOptionLabel=""
      name={name}
      label="Country"
      optionLabel="name"
      optionValue="initials"
      optionIcon="initials"
    />
  );
};

export default CountryField;
