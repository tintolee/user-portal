import { Listbox, Transition } from '@headlessui/react';
import React from 'react';
import cs from 'classnames';
import { DropDownPositionI, OptionType } from './SelectFieldGroup';
import { Icon, ExtraInfo } from '@sendsprint/ui-react';
import { Option } from './Option';
import { SearchOutline } from '@sendsprint/ui-react/dist/icons';

interface Props {
  open: boolean;
  dropdownPosition: DropDownPositionI;
  showFilter: boolean;
  setFilter: (value: React.SetStateAction<string>) => void;
  filter: string;
  extraInfo: React.ReactNode;
  filteredOptions: OptionType[];
}

const ListDropdown = ({
  open,
  dropdownPosition,
  showFilter,
  setFilter,
  filter,
  extraInfo,
  filteredOptions
}: Props) => {
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
        'ss-absolute ss-z-20 ss-bg-white ss-rounded ss-shadow ss-inset-x-0 ss-text-neutral ss-w-full':
          true,
        'ss-top-full ss-mt-2': dropdownPosition === 'bottom',
        'ss-bottom-full ss-mb-2': dropdownPosition === 'top'
      })}>
      <div className="ss-p-2 ss-space-y-1">
        {showFilter && (
          <div className="ss-relative">
            <Icon
              svg={SearchOutline}
              size={24}
              className="ss-text-neutral-400 ss-absolute ss-left-4 ss-inset-y-0"
            />
            <input
              className="ss-border ss-text-paragraph-regular ss-px-4 ss-rounded-full ss-block ss-w-full focus:ss-outline-none ss-bg-neutral-100 ss-placeholder-neutral-300 ss-text-neutral-500 ss-border-neutral-300 hover:ss-border-primary1-500 focus:ss-border-primary1-50 ss-py-2 ss-pr-4 ss-pl-12"
              placeholder="Please search for an item"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              onBlur={(e) => {
                if (e.target.value) {
                  e.target.focus();
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        )}
        {extraInfo && (
          <div className="ss-mt-4">
            <ExtraInfo extraInfo={extraInfo} />
          </div>
        )}
        <Listbox.Options
          static={true}
          className="focus:ss-outline-none ss-p-2 ss-space-y-1 ss-max-h-64 ss-overflow-y-auto">
          {filteredOptions.map(({ key, ...props }) => {
            return <Option key={key} {...props} />;
          })}
        </Listbox.Options>
      </div>
    </Transition>
  );
};

export default ListDropdown;
