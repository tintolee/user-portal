import React, { FC } from 'react';
import { BaseLink } from '@sendsprint/ui-react/dist/components/Link';
import { ReactComponent as Logo } from '@sendsprint/design-system/brand/logos/logo-full-green.svg';
import { Path } from '@src/navigations/routes';

const ErrorHeader: FC = () => {
  return (
    <div className="ss-container ss-text-center">
      <BaseLink to={Path.Home}>
        <Logo className="ss-mx-auto ss-h-10 ss-w-56 md:ss-h-16" role="presentation" />
      </BaseLink>
    </div>
  );
};

export default ErrorHeader;
