import ClientApi from '@src/types/client';
import React, { lazy } from 'react';

const ScheduleLoading = lazy(
  () => import(/*webpackChunkName:'DashboardScheduleLoading'*/ '../scheduleLoading')
);
const ScheduleList = lazy(
  () => import(/*webpackChunkName:'DashboardScheduleList'*/ '../scheduleList')
);
const ScheduleEmpty = lazy(
  () => import(/*webpackChunkName:'DashboardScheduleEmpty'*/ '../scheduleEmpty')
);
const ErrorState = lazy(
  () => import(/*webpackChunkName:'ErrorState'*/ '@src/components/errorState')
);

interface Props {
  schedules: ClientApi.RecurringTransactionI[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const ScheduleContent = ({ isError, isLoading, refetch, schedules }: Props) => {
  return (
    <>
      {!isError && (
        <>
          {isLoading && <ScheduleLoading />}
          {!isLoading && schedules && <ScheduleList schedules={schedules} />}
          {!isLoading && !schedules && <ScheduleEmpty />}
        </>
      )}
      {isError && (
        <ErrorState
          iconSize="small"
          errorText="Error fetching scheduled transfers"
          showRetryBtn
          retryFunc={refetch}
        />
      )}
    </>
  );
};

export default ScheduleContent;
