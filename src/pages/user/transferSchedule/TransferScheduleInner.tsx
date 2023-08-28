import { Button } from '@sendsprint/ui-react';
import { ErrorState } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';
import { EmptyScreen, LoadingScreen, TransferScheduleContent } from './components';

interface Props {
  data: ClientApi.RecurringTransactionI[];
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
}

const TransferScheduleInner = ({ data, isError, isLoading, refetch }: Props) => {
  return (
    <>
      {!isError && (
        <>
          {isLoading && <LoadingScreen />}
          {!isLoading && data ? <TransferScheduleContent data={data} refetch={refetch} /> : null}
          {!isLoading && !data ? <EmptyScreen /> : null}
        </>
      )}
      {isError && (
        <ErrorState
          title="Error fetching recurring transactions"
          content="An error has occurred while fetching recurring transactions. Please try again."
          footer={<Button onClick={refetch} variant="primary" isBlock={true} label="Try again" />}
        />
      )}
    </>
  );
};

export default TransferScheduleInner;
