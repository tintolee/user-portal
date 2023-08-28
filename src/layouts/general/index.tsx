import { BaseLink } from '@sendsprint/ui-react/dist/components/Link';
import { Path } from '@src/navigations/routes';
import { ReactComponent as Logo } from '@sendsprint/design-system/brand/logos/logo-full-green.svg';
import React, { ReactNode } from 'react';
import Meta from '@src/components/meta';

interface Props {
  pageTitle: string;
  children?: ReactNode;
}

const GeneralLayout = ({ children, pageTitle }: Props) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />
      <div>
        <div className="ss-container ss-pt-8 ss-pb-4 ss-text-center">
          <BaseLink to={Path.Home}>
            <Logo className="ss-mx-auto ss-h-10 ss-w-56 md:ss-h-16" role="presentation" />
          </BaseLink>
        </div>
        <div className="ss-container ss-my-10">{children}</div>
      </div>
    </>
  );
};

export default GeneralLayout;
