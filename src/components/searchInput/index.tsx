import { Box, Icon } from '@sendsprint/ui-react';
import { SearchOutline } from '@sendsprint/ui-react/dist/icons';
import React from 'react';
import cs from 'classnames';

interface Props {
  value: string;
  containerClasses?: string;
  inputClasses?: string;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  handleChange,
  value,
  placeholder,
  containerClasses,
  inputClasses
}: Props) => {
  return (
    <Box className={cs('ss-relative', containerClasses)}>
      <Icon
        svg={SearchOutline}
        size={24}
        className="ss-absolute ss-left-3 ss-top-2/4 ss-transform ss--translate-y-2/4"
      />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        className={cs(
          'ss-border ss-text-paragraph-regular ss-px-4 ss-rounded-base ss-block focus:ss-focus-ring ss-bg-neutral-100 ss-placeholder-neutral-400 ss-text-neutral-500 ss-border-neutral-300 hover:ss-border-primary1-500 focus:ss-border-primary1-50 ss-py-3 ss-pl-10 ss-w-full',
          inputClasses
        )}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default SearchInput;
