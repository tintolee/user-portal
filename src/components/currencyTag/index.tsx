import React, { FC } from 'react';
import cs from 'classnames';
import Api from '@sendsprint/api-types';
import { Flag, Text } from '@sendsprint/ui-react';
import ResolveCountryProperty from '@src/components/resolveCountryProperty';

type CurrencyTagVariant = 'simple' | 'pill';

type CurrencyTagProps = {
  countryInitials: Api.Model.CountryInitials;
  className?: string;
  isInline?: boolean;
  variant?: CurrencyTagVariant;
};

const CurrencyTag: FC<CurrencyTagProps> = ({ countryInitials, className, isInline, variant }) => {
  const rootClasses = cs(
    {
      'ss-inline-flex': isInline,
      'ss-flex': !isInline,
      'ss-items-center': true,
      'ss-bg-neutral-5 ss-px-2 ss-py-1 ss-rounded-full': variant === 'pill'
    },
    className
  );

  return (
    <div className={rootClasses}>
      <Flag size={16} countryInitials={countryInitials} />
      <Text variant="paragraphSmall" className="ss-text-neutral-40 ss-ml-1">
        <ResolveCountryProperty countryInitials={countryInitials} propertyName="currency" />
      </Text>
    </div>
  );
};

CurrencyTag.defaultProps = {
  className: '',
  isInline: false,
  variant: 'simple'
};

export type { CurrencyTagProps };
export default CurrencyTag;
