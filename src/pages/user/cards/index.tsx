import { useToggle } from '@src/hooks';
import { DashboardLayout } from '@src/layouts';
import React from 'react';
import { AddPaymentMethod, CardList } from './components';

const Cards = () => {
  const { handleFalse, handleTrue, state: isAddModalOpen } = useToggle();
  return (
    <DashboardLayout pageTitle="Cards">
      {/* <EmptyState handleOpenModal={handleTrue} /> */}
      <CardList handleOpenModal={handleTrue} />
      <AddPaymentMethod handleClose={handleFalse} isOpen={isAddModalOpen} />
    </DashboardLayout>
  );
};

export default Cards;
