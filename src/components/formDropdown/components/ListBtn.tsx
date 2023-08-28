import { Listbox } from '@headlessui/react';
import React from 'react';
import cs from 'classnames';
import { Text, Icon } from '@sendsprint/ui-react';
import Api from '@sendsprint/api-types';
import { handleIcon, OptionType } from './SelectFieldGroup';
import { ArrowIosDownwardOutline } from '@sendsprint/ui-react/dist/icons';

interface Props {
  setIsButtonHover: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonHover: boolean;
  icon: React.FC<React.SVGProps<SVGSVGElement>> | Api.Model.CountryInitials | undefined;
  selectedOption: OptionType | undefined;
  isLabelUp: boolean;
  value: any;
  //   handleIcon: ({ icon, size, className }: HandleIconOptionsI) => JSX.Element;
  label: string;
  open: boolean;
  isInvalid: boolean;
}

const ListBtn = ({
  setIsButtonHover,
  isButtonHover,
  icon,
  selectedOption,
  isLabelUp,
  value,
  //   handleIcon,
  label,
  open,
  isInvalid
}: Props) => {
  return (
    <Listbox.Button
      onMouseEnter={() => setIsButtonHover(true)}
      onMouseLeave={() => setIsButtonHover(false)}
      className={cs(
        'ss-h-14 ss-relative ss-p-4 ss-flex ss-overflow-hidden ss-items-center ss-justify-between ss-border ss-text-paragraph-regular ss-rounded-base ss-w-full focus:ss-focus-ring ss-bg-neutral-100 ss-placeholder-neutral-400 ss-text-neutral-500 ss-border-neutral-300 hover:ss-border-primary1-500 focus:ss-border-primary1-50',
        {
          'ss-border-primary1-500': open,
          'ss-pl-14': icon,
          'ss-border-error-500': isInvalid
        }
      )}>
      <Text
        className="ss-text-left ss-pt-3 ss-text-neutral-40 ss-flex-grow ss-min-w-20 ss-truncate"
        variant="paragraphRegular">
        {selectedOption && selectedOption.label}
      </Text>
      <div
        className={cs(
          'ss-bg-neutral-200 ss-duration-150 ss-px-4 ss-absolute ss-top-0 ss-right-0 ss-bottom-0 ss-border-l ss-border-neutral-300 ss-flex ss-justify-center ss-items-center',
          {
            'ss-bg-success-200 ss-border-primary1-500': open,
            'ss-border-primary1-500': isButtonHover
          }
        )}>
        <Icon
          svg={ArrowIosDownwardOutline}
          size={24}
          className={cs('ss-text-primary-100', {
            'ss-transform ss-rotate-180': open
          })}
        />
      </div>
      <Listbox.Label
        as="label"
        className={cs('ss-absolute ss-duration-150 ss-transform ss-left-4', {
          'ss-text-paragraph-very-small ss-top-1': isLabelUp || value,
          'text-text-sm ss-top-4': !isLabelUp,
          'ss-left-14': icon
        })}>
        <span>{label}</span>
      </Listbox.Label>
      {icon &&
        !selectedOption?.icon &&
        handleIcon({
          icon,
          className: cs(
            'ss-absolute ss-w-6 ss-h-6 ss-top-2/4 ss-left-4 ss-transform ss--translate-y-2/4',
            {
              'ss-text-neutral-500': isLabelUp,
              'ss-text-neutral-300': !isLabelUp
            }
          ),
          size: '100%'
        })}
      {selectedOption &&
        selectedOption.icon &&
        handleIcon({
          icon: selectedOption?.icon,
          className: cs(
            'ss-absolute ss-w-6 ss-h-6 ss-top-2/4 ss-left-4 ss-transform ss--translate-y-2/4',
            {
              'ss-text-neutral-500': isLabelUp,
              'ss-text-neutral-300': !isLabelUp
            }
          ),
          size: '100%'
        })}
    </Listbox.Button>
  );
};

export default ListBtn;
