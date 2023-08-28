import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import cs from 'classnames';
import { ErrorMessage, useField } from 'formik';
import { Listbox } from '@headlessui/react';
import { Icon, IconProps, Flag, ExtraInfo } from '@sendsprint/ui-react';
import Api from '@sendsprint/api-types';
import ListBtn from './ListBtn';
import ListDropdown from './ListDropdown';
import { OpenStateWatcher } from './OpenStateWatcher';

export type OptionType = {
  /** Unique identifier for each option. It will be used for the `key` prop */
  key: any;
  label: string;
  value: any;
  disabled?: boolean;
  icon?: IconProps['svg'] | Api.Model.CountryInitials;
};

export type DropDownPositionI = 'top' | 'bottom';

type SelectFieldGroupProps = {
  name: string;
  label: string;
  options: OptionType[];
  showFilter?: boolean;
  dropdownPosition?: DropDownPositionI;
  icon?: IconProps['svg'] | Api.Model.CountryInitials;
  extraInfo?: ReactNode;
  disableErrorFromShowing?: boolean;
  // selectFirstByDefault?: boolean;
};

export interface HandleIconOptionsI {
  icon: IconProps['svg'] | Api.Model.CountryInitials;
  className?: string;
  size?: string | number | undefined;
}

export const handleIcon = ({ icon, size, className }: HandleIconOptionsI) => {
  switch (icon) {
    case Api.Model.CountryInitials.Canada:
    case Api.Model.CountryInitials.Ghana:
    case Api.Model.CountryInitials.Kenya:
    case Api.Model.CountryInitials.Nigeria:
    case Api.Model.CountryInitials.NigeriaNig:
    case Api.Model.CountryInitials.SouthAfrica:
    case Api.Model.CountryInitials.UnitedKingdom:
    case Api.Model.CountryInitials.UnitedStates:
      return <Flag countryInitials={icon} />;

    default:
      return <Icon size={size} svg={icon} className={className} />;
  }
};

/**
 * Custom select field with a search/filter input
 * @param props
 */
const SelectFieldGroup = ({
  name,
  label,
  options,
  showFilter = true,
  dropdownPosition = 'bottom',
  icon,
  extraInfo,
  disableErrorFromShowing
}: // selectFirstByDefault: selectFirst,
SelectFieldGroupProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState(false);
  const [isLabelUp, setIsLabelUp] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const [{ value }, { touched, error }, { setValue, setTouched }] = useField(name);

  const [filter, setFilter] = useState('');
  const serializedFilter = filter.toLowerCase().trim();

  const selectedOption = useMemo<OptionType | undefined>(() => {
    return options.find((o) => o.value === value);
  }, [options, value]);

  const filteredOptions = useMemo<OptionType[]>(() => {
    return options.filter((option) => {
      const optionLabel = option.label.toLowerCase().trim();
      return optionLabel.includes(serializedFilter);
    });
  }, [options, serializedFilter]);

  const emptyFilter = () => {
    setFilter('');
  };

  const onValueChange = useCallback((value: any) => {
    emptyFilter();
    setValue(value, true);
  }, []);

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        setTouched(true, true);
        emptyFilter();
      }
    },
    [setTouched]
  );

  useEffect(() => {
    if (value) {
      setIsLabelUp(true);
    } else {
      setIsLabelUp(false);
    }
  }, [value]);

  useEffect(() => {
    if (error && touched) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [error, touched]);

  return (
    <>
      {/* <Listbox value={value} onChange={onValueChange}>
        {({ open }) => (
          <>
            <div className="ss-relative">
              <ListBtn
                isInvalid={isInvalid}
                icon={icon}
                isButtonHover={isButtonHover}
                isLabelUp={isLabelUp}
                label={label}
                selectedOption={selectedOption}
                setIsButtonHover={setIsButtonHover}
                value={value}
                open={open}
              />
              <ListDropdown
                dropdownPosition={dropdownPosition}
                extraInfo={extraInfo}
                filter={filter}
                filteredOptions={filteredOptions}
                open={open}
                setFilter={setFilter}
                showFilter={showFilter}
              />
            </div>
            <OpenStateWatcher isOpen={false} onOpenChange={onOpenChange} />
          </>
        )}
      </Listbox> */}

      {!disableErrorFromShowing && (
        <ErrorMessage name={name}>
          {(errMessage) => (
            <div className="ss--mt-3">
              <ExtraInfo variant="error" extraInfo={errMessage} />
            </div>
          )}
        </ErrorMessage>
      )}
    </>
  );
};

export type { SelectFieldGroupProps };
export default SelectFieldGroup;
