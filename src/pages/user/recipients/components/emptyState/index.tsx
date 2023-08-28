import { Button } from '@sendsprint/ui-react';
import { EmptyState as Empty } from '@src/components';
import React from 'react';

interface Props {
  handleOpenModal: () => void;
}

const EmptyState = ({ handleOpenModal }: Props) => {
  return (
    <Empty
      header="Recipients"
      title="Add a Recipient"
      body="Who would you like to send money to? Add them as a recipient to get started."
      footer={<Button label="Add A Recipient" onClick={handleOpenModal} isBlock />}
    />
  );
};

export default EmptyState;
