import ClientApi from '@src/types/client';
import React, { lazy } from 'react';

const RecipientsLoading = lazy(
  () => import(/*webpackChunkName:'DashboardRecipientsLoading'*/ '../recipientsLoading')
);
const RecipientsList = lazy(
  () => import(/*webpackChunkName:'DashboardRecipientsList'*/ '../recipientsList')
);
const RecipientsEmpty = lazy(
  () => import(/*webpackChunkName:'DashboardRecipientsEmpty'*/ '../recipientEmpty')
);
const ErrorState = lazy(
  () => import(/*webpackChunkName:'ErrorState'*/ '@src/components/errorState')
);

interface Props {
  recipients: ClientApi.Recipient[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const RecipientsContent = ({ isError, isLoading, refetch, recipients }: Props) => {
  return (
    <>
      {!isError && (
        <>
          {isLoading && <RecipientsLoading />}
          {!isLoading && recipients && <RecipientsList recipients={recipients} />}
          {!isLoading && !recipients && <RecipientsEmpty />}
        </>
      )}
      {isError && (
        <ErrorState
          iconSize="small"
          errorText="Error fetching receipients"
          showRetryBtn
          retryFunc={refetch}
        />
      )}
    </>
  );
};

export default RecipientsContent;
