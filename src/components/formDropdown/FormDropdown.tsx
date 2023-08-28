import SelectFieldGroup, { SelectFieldGroupProps } from './components/SelectFieldGroup';
import { Skeleton, IconProps, ExtraInfo } from '@sendsprint/ui-react';
import { useFormikContext } from 'formik';
import React, { ReactNode, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Api from '@sendsprint/api-types';

export type FormDropdownI = {
  /**
   * this refer to any array of objects
   */
  data: any[];
  label?: string;
  name: string;
  emptyOptionLabel: string;
  isLoading?: boolean;
  skeletonText?: string;
  /**
   * this refers to the property in the data objects that that you want to be the label in the dropdown
   */
  optionLabel: string;
  /**
   * this refers to the property in the data objects that that you want to be the icon in the dropdown
   * it is optional
   */
  optionIcon?: string;
  disableErrorFromShowing?: boolean;
  /**
   * this refers to the property in the data objects that that you want to be the value in the dropdown
   */
  optionValue: string;
  // selectFirstByDefault?: boolean;
  icon?: IconProps['svg'] | Api.Model.CountryInitials;
  extraInfo?: ReactNode;
} & Pick<SelectFieldGroupProps, 'dropdownPosition' | 'showFilter'>;

interface sortedDataI {
  value: string;
  label: string;
  icon?: IconProps['svg'] | Api.Model.CountryInitials;
  id: string;
  disabled?: boolean;
}

const FormFieldDropdown = ({
  data = [],
  label = '',
  emptyOptionLabel,
  name,
  isLoading,
  skeletonText,
  optionLabel,
  optionValue,
  optionIcon,
  icon,
  extraInfo,
  ...customComponentProps
}: FormDropdownI) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [sortedData, setSortedData] = useState<sortedDataI[]>([]);

  useEffect(() => {
    const opts = data.length
      ? data.map((item) => {
          const optionData: sortedDataI = {
            value: item[optionValue],
            label: item[optionLabel],
            icon: optionIcon ? item[optionIcon] : undefined,
            disabled: item?.disabled,
            id: v4()
          };

          return optionData;
        })
      : [];

    setSortedData(opts);
  }, [data, optionLabel, optionValue]);

  useEffect(() => {
    setFieldValue('event', '');
    setFieldTouched('event', false);
  }, [setFieldValue, setFieldTouched]);

  if (isLoading) {
    return <Skeleton className="ss-h-14 ss-w-full ss-rounded-base" />;
  }

  const optionsWithEmptyLabel = [
    { label: emptyOptionLabel, value: '', key: 0, icon: undefined },
    ...sortedData.map(({ id, label, value, icon, disabled }) => ({
      key: id,
      label,
      value,
      icon,
      disabled
    }))
  ];

  const optionsWithOutEmptyLabel = [
    ...sortedData.map(({ id, label, value, icon, disabled }) => ({
      key: id,
      label,
      value,
      icon,
      disabled
    }))
  ];

  return (
    <>
      <SelectFieldGroup
        name={name}
        label={label}
        options={emptyOptionLabel ? optionsWithEmptyLabel : optionsWithOutEmptyLabel}
        icon={icon}
        extraInfo={extraInfo}
        showFilter={data.length >= 5}
        {...customComponentProps}
      />
      {extraInfo && <ExtraInfo extraInfo={extraInfo} />}
    </>
  );
};

export default FormFieldDropdown;
