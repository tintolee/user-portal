import ClientApi from '@src/types/client';
import React, { lazy } from 'react';

const ScheduleEmpty = lazy(
  () => import(/*webpackChunkName:'DashboardScheduleEmpty'*/ '../scheduleEmpty')
);
const ScheduleListInner = lazy(
  () => import(/*webpackChunkName:'DashboardScheduleListInner'*/ './ScheduleListInner')
);

interface Props {
  schedules: ClientApi.RecurringTransactionI[];
}

const ScheduleList = ({ schedules }: Props) => {
  return <>{schedules.length ? <ScheduleListInner schedules={schedules} /> : <ScheduleEmpty />}</>;
};

export default ScheduleList;
