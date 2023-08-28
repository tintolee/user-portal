import React, { FC, ReactNode } from 'react';
import cs from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import Api from '@sendsprint/api-types';
import { Flag, Text } from '@sendsprint/ui-react';

type CountryDropdownListProps = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-right-mobile';
  open: boolean;
  children?: ReactNode;
};

type CountryDropdownItemProps = {
  value: string | number;
  initials: Api.Model.CountryInitials;
  mainText: string;
  otherText: string;
};

const CountryDropdownList: FC<CountryDropdownListProps> = ({
  open,
  children,
  position = 'bottom-left'
}) => {
  return (
    <Transition
      appear={true}
      show={open}
      enter="ss-transition ss-duration-100 ss-ease-out ss-transform-gpu"
      enterFrom="ss-scale-95 ss-opacity-0"
      enterTo="ss-scale-100 ss-opacity-100"
      leave="ss-transition ss-duration-75 ss-ease-out ss-transform-gpu"
      leaveFrom="ss-scale-100 ss-opacity-100"
      leaveTo="ss-scale-95 ss-opacity-0"
      className={cs({
        'ss-absolute ss-z-20 ss-bg-white ss-rounded ss-shadow': true,
        'ss-left-0 ss-bottom-full ss-mb-2': position === 'top-left',
        'ss-right-0 ss-bottom-full ss-mb-2': position === 'top-right',
        'ss-left-0 ss-top-full ss-mt-2': position === 'bottom-left',
        'ss-right-0 ss-top-full ss-mt-2': position === 'bottom-right',
        'ss--right-7 ss-top-full ss-mt-2': position === 'bottom-right-mobile'
      })}>
      <Listbox.Options static={true} className="focus:ss-outline-none ss-p-2 ss-space-y-1 ss-w-80">
        {children}
      </Listbox.Options>
    </Transition>
  );
};

const CountryDropdownItem: FC<CountryDropdownItemProps> = ({
  value,
  initials,
  mainText,
  otherText
}) => {
  return (
    <Listbox.Option value={value} className="focus:ss-outline-none">
      {({ selected, active }) => (
        <div
          className={cs({
            'ss-flex ss-items-center ss-px-4 ss-py-2 ss-rounded ss-cursor-pointer': true,
            'ss-text-neutral-500': !selected,
            'ss-bg-primary1-200 ss-text-white': active,
            'ss-text-white ss-bg-primary1-500': selected
          })}>
          <Flag size={24} countryInitials={initials} />
          <Text className="ss-flex-grow ss-px-4">{mainText}</Text>
          <Text>{otherText}</Text>
        </div>
      )}
    </Listbox.Option>
  );
};

export type { CountryDropdownListProps, CountryDropdownItemProps };
export { CountryDropdownList, CountryDropdownItem };
