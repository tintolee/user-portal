import { ButtonLink } from '@sendsprint/ui-react';
import { EmptyState } from '@src/components';
import { Path } from '@src/navigations/routes';
import React from 'react';

const EmptyScreen = () => {
  return (
    <EmptyState
      header="Transfer Schedules"
      title="Schedule a transfer"
      body="Schedule recurring transfers and automatically send money as regularly as you want. Pause
      at any time."
      footer={
        <>
          <ButtonLink label="Schedule a transfer" to={Path.AddTransferSchedule} isBlock />
        </>
      }
    />
  );
};

export default EmptyScreen;
