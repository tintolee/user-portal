import ClientApi from '@src/types/client';
import React from 'react';
import EmptyScreen from '../emptyScreen';
import TransferList from '../transferList';

interface Props {
  data: ClientApi.RecurringTransactionI[];
  refetch: () => void;
}

const TransferScheduleContent = ({ data, refetch }: Props) => {
  return <>{data.length ? <TransferList data={data} refetch={refetch} /> : <EmptyScreen />}</>;
};

export default TransferScheduleContent;
