import React, { FC, ReactNode } from 'react';
import ErrorHeader from '@src/layouts/error/components/ErrorHeader';
import Meta from '@src/components/meta';

type ErrorLayoutProps = { pageTitle: string; children?: ReactNode };

/**
 * Layout for Error pages: like NotFound & Error
 */
const ErrorLayout: FC<ErrorLayoutProps> = ({ pageTitle, children }) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />

      <div className="ss-h-screen ss-overflow-y-auto ss-flex ss-flex-col ss-py-10 ss-space-y-6">
        <ErrorHeader />
        <div className="ss-container ss-flex-grow ss-flex ss-items-center">
          <div className="ss-grid-layout md:ss-grid-cols-8 lg:ss-grid-cols-12 ss-flex-grow">
            <div className="ss-col-span-full md:ss-col-span-6 md:ss-col-start-2 lg:ss-col-start-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorLayout;
