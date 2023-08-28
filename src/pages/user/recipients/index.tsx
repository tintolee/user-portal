import { useGetRecipients } from '@src/hooks';
import { DashboardLayout } from '@src/layouts';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecipientDetails, AddRecipientForm } from './components';
import RecipientsInner from './RecipientsInner';

const Recipients = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRecipientDetails, setShowRecipientDetails] = useState(false);
  const [pageTitle, setPageTitle] = useState('Recipients');

  const [searchParams] = useSearchParams();
  const idQuery = searchParams.get('id');

  const {
    data: recipients = [],
    isError,
    isLoading,
    refetch: refetchRecipients
  } = useGetRecipients();

  useEffect(() => {
    if (showModal) {
      setPageTitle('New Recipient');
    } else if (showRecipientDetails) {
      setPageTitle("Recipient's Details");
    } else {
      setPageTitle('Recipients');
    }
  }, [showModal, showRecipientDetails]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenDetailsModal = () => setShowRecipientDetails(true);
  const handleCloseDetailsModal = () => setShowRecipientDetails(false);

  useEffect(() => {
    if (idQuery) {
      handleOpenDetailsModal();
    }
  }, [idQuery]);
  return (
    <DashboardLayout pageTitle={pageTitle}>
      <RecipientsInner
        handleOpenModal={handleOpenModal}
        isError={isError}
        isLoading={isLoading}
        refetch={refetchRecipients}
        recipients={recipients}
        handleOpenDetailsModal={handleOpenDetailsModal}
      />
      <AddRecipientForm
        isOpen={showModal}
        refetchRecipients={refetchRecipients}
        handleClose={handleCloseModal}
      />
      <RecipientDetails
        refetchRecipients={refetchRecipients}
        handleClose={handleCloseDetailsModal}
        isOpen={showRecipientDetails}
      />
    </DashboardLayout>
  );
};

export default Recipients;
