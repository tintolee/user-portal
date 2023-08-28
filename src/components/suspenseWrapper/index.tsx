import React, { ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackRender } from '@sentry/react';
import ErrorFallback, { ErrorFallbackProps } from '../errorFallback';

interface Props {
  suspenseFallback?: ReactNode;
  errorFallback?: FallbackRender;
  returnNullErrorFallback?: boolean;
  children: ReactNode;
}

const SuspenseWrapper = ({
  suspenseFallback = null,
  children,
  errorFallback = DefaultErrorFallback,
  returnNullErrorFallback
}: Props) => {
  const errorFallback2 = returnNullErrorFallback ? NullErrorFallback : errorFallback;
  return (
    <ErrorBoundary fallback={errorFallback2}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

const DefaultErrorFallback = ({ resetError }: ErrorFallbackProps) => {
  return <ErrorFallback resetError={resetError} />;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NullErrorFallback = ({ resetError }: ErrorFallbackProps) => {
  return <></>;
};

/**
 *
 * The aim of this function is to mimic slow connetions to show the fallback;
 *
 * Eg. wait for 2s
 * const ScheduleInner = lazy(() => wait().then(() => import('./ScheduleInner')));
 */
export const wait = (time = 1000) => new Promise((resolve) => setTimeout(resolve, time));

export default SuspenseWrapper;
