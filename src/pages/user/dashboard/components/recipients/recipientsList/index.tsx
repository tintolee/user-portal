import ClientApi from '@src/types/client';
import React, { lazy } from 'react';

const RecipientsListInner = lazy(
  () => import(/*webpackChunkName:'DashboardRecipientsListInner'*/ './RecipientsListInner')
);
const RecipientsEmpty = lazy(
  () => import(/*webpackChunkName:'DashboardRecipientsEmpty'*/ '../recipientEmpty')
);

interface Props {
  recipients: ClientApi.Recipient[];
}

const RecipientsList = ({ recipients }: Props) => {
  return (
    <>{recipients.length ? <RecipientsListInner recipients={recipients} /> : <RecipientsEmpty />}</>
  );
};

export default RecipientsList;
