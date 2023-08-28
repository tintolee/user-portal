import React from 'react';
import { Listbox } from '@headlessui/react';
import { handleIcon, OptionType } from './SelectFieldGroup';
import cs from 'classnames';
import { Text } from '@sendsprint/ui-react';

type OptionProps = OptionType;

export const Option = ({ value, label, disabled, icon }: OptionProps) => {
  const classes = cs({
    'ss-flex ss-px-4 ss-py-3 ss-rounded-full ss-justify-between ss-items-center': true,
    'ss-cursor-pointer hover:ss-bg-success-100': !disabled,
    'ss-text-neutral-200 hover:ss-bg-neutral-100 ss-bg-neutral-100 ss-cursor-not-allowed': disabled
    // 'ss-text-neutral-60': !selected && !disabled && !active,
    // 'ss-bg-primary-10 ss-text-primary-100': active && !selected,
    // 'ss-bg-success-100': selected
  });
  return (
    <Listbox.Option value={value} disabled={disabled} className="focus:ss-outline-none">
      {/* {({ selected, active }) => {
        const classes = cs({
          'ss-flex ss-px-4 ss-py-3 ss-rounded-full ss-justify-between ss-items-center': true,
          'ss-cursor-pointer hover:ss-bg-success-100': !disabled,
          'ss-text-neutral-200 hover:ss-bg-neutral-100 ss-bg-neutral-100 ss-cursor-not-allowed':
            disabled,
          'ss-text-neutral-60': !selected && !disabled && !active,
          'ss-bg-primary-10 ss-text-primary-100': active && !selected,
          'ss-bg-success-100': selected
        }); */}
      {/* return ( */}
      <div className={classes}>
        <div className="ss-flex ss-items-center ss-gap-4">
          {
            icon &&
              handleIcon({
                icon,
                className: cs('ss-w-6 ss-h-6 ', {
                  // 'ss-text-primary1-500': selected,
                  'ss-text-neutral-200': disabled
                  // 'ss-text-neutral-300': !disabled && !selected
                }),
                size: '100%'
              })
            // <Icon
            //   className={cs("ss-w-6 ss-h-6 ss-text-neutral-300", {
            //     "ss-text-primary1-500": selected,
            //   })}
            //   size="100%"
            //   svg={icon}
            // />
          }
          <Text
            className={cs('', {
              'ss-text-neutral-200': disabled,
              'ss-text-primary1-500': !disabled
            })}>
            {label}
          </Text>
        </div>
        <div
          className={cs('ss-relative ss-w-6 ss-h-6 ss-border-2 ss-rounded-full', {
            'ss-border-neutral-200': disabled,
            'ss-border-primary1-500': !disabled
          })}>
          {/* {selected && (
            <div className="ss-absolute ss-top-1 ss-bottom-1 ss-left-1 ss-right-1 ss-bg-primary1-500 ss-rounded-full" />
          )} */}
        </div>
      </div>
      {/* ); */}
      {/* }} */}
    </Listbox.Option>
  );
};
