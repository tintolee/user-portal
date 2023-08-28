import React from 'react';
import { ButtonLink } from '@sendsprint/ui-react';
import { ReactComponent as NotFoundImage } from '@src/layouts/error/components/ErrorCard/images/error-astronaut-fishing.svg';
import { ErrorCard, ErrorLayout } from '@src/layouts/error';
import { Path } from '@src/navigations/routes';

const NotFound = () => {
  return (
    <ErrorLayout pageTitle="Page not found">
      <ErrorCard
        imageContent={
          <div className="ss-p-8 ss-bg-neutral-80">
            <NotFoundImage className="ss-h-44 ss-w-44 ss-inline-block" role="presentation" />
          </div>
        }
        title="Oops, lost your way?"
        content="We can’t find the page you’re looking for. Try going back home."
        footer={
          <ButtonLink to={Path.Home} variant="primary" isBlock={true} label="Back to homepage" />
        }
      />
    </ErrorLayout>
  );
};

export default NotFound;
