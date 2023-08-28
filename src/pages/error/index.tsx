import React, { useEffect } from 'react';
import { ReactComponent as ErrorImage } from '@src/layouts/error/components/ErrorCard/images/error-unplugged.svg';
import Button from '@sendsprint/ui-react/dist/components/Button';
import { ErrorCard, ErrorLayout } from '@src/layouts/error';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

type ErrorProps = {
  resetError: () => void;
};

const Error = ({ resetError }: ErrorProps) => {
  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => history.listen(resetError), [resetError, history.listen]);

  return (
    <ErrorLayout pageTitle="An error occurred">
      <ErrorCard
        imageContent={
          <div className="ss-p-8 ss-bg-neutral-20">
            <ErrorImage className="ss-h-44 ss-w-44 ss-inline-block" role="presentation" />
          </div>
        }
        title="Something went wrong"
        content="An error has occurred. We are trying to fix this, please try again."
        footer={<Button onClick={refreshPage} variant="primary" isBlock={true} label="Try again" />}
      />
    </ErrorLayout>
  );
};

export type { ErrorProps };
export default Error;
