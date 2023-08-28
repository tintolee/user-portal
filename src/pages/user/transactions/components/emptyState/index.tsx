import { ButtonLink } from '@sendsprint/ui-react';
import { EmptyState as Empty } from '@src/components';
import { Path } from '@src/navigations/routes';
import React from 'react';

const EmptyState = () => {
  return (
    <Empty
      header="Transactions"
      title="Add a Transaction"
      body="This is where your transactions will appear when you start sending money and gifts."
      footer={
        <>
          <ButtonLink label="Make your first transfer" to={Path.SendMoney} isBlock />
          <ButtonLink label="Send a gift" variant="secondary" to={Path.Connect} isBlock />
        </>
      }
    />
  );
};

export default EmptyState;
