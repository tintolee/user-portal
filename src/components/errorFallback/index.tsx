import React from 'react';
import Box from '@sendsprint/ui-react/dist/components/Box';
import Text from '@sendsprint/ui-react/dist/components/Text';
import Button from '@sendsprint/ui-react/dist/components/Button';
import { ReactComponent as ErrorImage } from '@src/layouts/error/components/ErrorCard/images/error-unplugged.svg';
import cs from 'classnames';

export interface ErrorFallbackOptions {
  error?: Error;
  componentStack?: string | null;
  eventId?: string | null;
  resetError(): void;
}

export interface ErrorFallbackProps extends ErrorFallbackOptions {
  className?: string;
  text?: string;
  otherFunc?: () => void;
}

const ErrorFallback = ({ resetError, className, text, otherFunc }: ErrorFallbackProps) => {
  const handleReset = () => {
    resetError();

    if (otherFunc) {
      otherFunc();
    }
  };
  return (
    <Box className={cs('ss-flex ss-flex-col ss-justify-center ss-items-center', className)}>
      <ErrorImage className="ss-h-20 ss-w-20 ss-inline-block" role="presentation" />
      <Text className="ss-mt-7 ss-mb-3 ss-text-center ss-font-semibold">{text}</Text>
      <Button label="Try again" onClick={handleReset} variant="secondary" size="small" />
    </Box>
  );
};

export default ErrorFallback;
