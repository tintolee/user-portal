import { useLoadUserRecurringTransactions } from '@src/hooks';
import { DashboardLayout } from '@src/layouts';
import React from 'react';
import TransferScheduleInner from './TransferScheduleInner';

const TransferSchedule = () => {
  const { data = [], isLoading, refetch, isError } = useLoadUserRecurringTransactions();

  return (
    <DashboardLayout pageTitle="Scheduled Transfer">
      <TransferScheduleInner
        data={data}
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
      />
    </DashboardLayout>
  );
};

export default TransferSchedule;
