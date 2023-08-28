import React, { useEffect, useState } from 'react';
import { useGetRecipientByType, useToggle } from '@src/hooks';
import ClientApi from '@src/types/client';
import AddRecipientForm from './addRecipientForm';
import RecipientEmptyState from './emptyScreen';
import LoadingScreen from './loadingScreen';
import RecipientListView from './recipientListView';
import RecipientSelectedView from './recipientSelectedView';

export type RecipientStepProps = {
  editMode?: boolean;
  recipientType: undefined | ClientApi.RecipientType;
  selectedRecipient?: ClientApi.Recipient;
  // eslint-disable-next-line no-unused-vars
  onSelectRecipient: (recipient: ClientApi.Recipient, fromForm: boolean) => void;
  onInvalidData: () => void;
};

const RecipientStep = ({
  editMode = false,
  recipientType,
  selectedRecipient,
  onInvalidData,
  onSelectRecipient
}: RecipientStepProps) => {
  const {
    handleFalse: handleFormClose,
    handleTrue: handleFormOpen,
    state: isFormOpen
  } = useToggle();

  const [isEditMode, setIsEditMode] = useState(editMode);
  const {
    data: recipients,
    isLoading,
    refetch
  } = useGetRecipientByType({
    type: recipientType as ClientApi.RecipientType
  });

  const isPropsInvalid =
    !recipientType || (selectedRecipient && selectedRecipient.type !== recipientType);

  useEffect(() => {
    if (isPropsInvalid) {
      onInvalidData();
    }
  }, [isPropsInvalid, onInvalidData]);

  //   useEffect(() => {
  //     mixpanelInstance.track(mixpanelEvents.ViewingRecipientStep);
  //   }, [mixpanelInstance]);

  if (!recipientType || isPropsInvalid) {
    return null;
  }

  if (selectedRecipient && !isEditMode) {
    return (
      <RecipientSelectedView
        selectedRecipient={selectedRecipient}
        onEdit={() => {
          setIsEditMode(true);
        }}
        onContinue={() => {
          onSelectRecipient(selectedRecipient, false);
        }}
      />
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      {recipients && recipients.length === 0 && (
        <RecipientEmptyState handleOpenModal={handleFormOpen} />
      )}
      {/* <Purpose /> */}
      {recipients && recipients.length ? (
        <RecipientListView
          onSelectRecipient={onSelectRecipient}
          recipients={recipients}
          handleFormOpen={handleFormOpen}
        />
      ) : null}

      <AddRecipientForm
        handleClose={handleFormClose}
        isOpen={isFormOpen}
        refetchRecipients={refetch}
        type={recipientType}
        onSuccess={(recipient) => {
          recipient && onSelectRecipient(recipient, true);
        }}
        showSaveDetailsField={true}
      />
    </>
  );
};

export default RecipientStep;
