import ClientApi from '@src/types/client';

export const sortScheduleData = (data: ClientApi.RecurringTransactionI[]) => {
  const sortedData = data.sort((a, b) => {
    const aMilliSecs = new Date(a.DateCreated).getTime();
    const bMilliSecs = new Date(b.DateCreated).getTime();

    return bMilliSecs - aMilliSecs;
  });
  return sortedData;
};
