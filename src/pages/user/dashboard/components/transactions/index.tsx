import Loader from '@src/components/loader';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import { lazy } from 'react';
import ComponentsErrorFallback from '../componentsErrorFallback';

const RecentTransactionsInner = lazy(
  () => import(/*webpackChunkName:'DashboardTransactionsInner'*/ './TransactionsInner')
);

const RecentTransactions = () => {
  return (
    <SuspenseWrapper
      errorFallback={({ resetError }) => (
        <ComponentsErrorFallback resetError={resetError} errorText="Error loading transactions" />
      )}
      suspenseFallback={
        <Loader
          ballSize="small"
          height="content"
          className="ss-bg-white ss-min-h-250 md:ss-min-h-300 ss-rounded-lg"
        />
      }>
      <RecentTransactionsInner />
    </SuspenseWrapper>
  );
};

export default RecentTransactions;
