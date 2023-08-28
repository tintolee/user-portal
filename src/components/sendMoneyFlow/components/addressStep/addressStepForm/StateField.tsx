import FormFieldDropdown from '@sendsprint/ui-react/dist/components/form2/formDropdown/FormDropdown';
import GlobeOutline from '@sendsprint/ui-react/dist/icons/GlobeOutline';
import useGetStates from '@src/hooks/utils/useGetStates';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';

interface Props {
  name: string;
  countryFieldName: string;
}

const StateField = ({ name, countryFieldName }: Props) => {
  const { values, setFieldValue } = useFormikContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countryValue = (values as any)[countryFieldName];
  const { stateData = [] } = useGetStates({ country: countryValue });

  useEffect(() => {
    if (countryValue) {
      setFieldValue(name, '');
    }
  }, [countryValue]);

  return (
    <FormFieldDropdown
      data={stateData}
      icon={GlobeOutline}
      emptyOptionLabel=""
      name={name}
      label="State"
      optionLabel="name"
      optionValue="name"
      searchInputPlaceholder="Please search for your state"
    />
  );
};

export default StateField;
