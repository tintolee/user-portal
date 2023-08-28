import React, { useEffect, useState } from 'react';
import { useGetRecipients, useToggle } from '@src/hooks';
import ClientApi from '@src/types/client';
import AddRecipientForm from './addRecipientForm';
import RecipientEmptyState from './emptyScreen';
import LoadingScreen from './loadingScreen';
import RecipientListView from './recipientListView';
import RecipientSelectedView from './recipientSelectedView';
import Api from '@sendsprint/api-types';
import { State } from '../../state';

export type RecipientStepProps = {
  state: State;
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
  onSelectRecipient,
  state
}: RecipientStepProps) => {
  const [giftCardRecipients, setGiftCardRecipients] = useState<ClientApi.Recipient[]>([]);
  const {
    handleFalse: handleFormClose,
    handleTrue: handleFormOpen,
    state: isFormOpen
  } = useToggle();

  const [isEditMode, setIsEditMode] = useState(editMode);
  const { isLoading, refetch, data: recipients } = useGetRecipients();
  const isPropsInvalid =
    !recipientType || (selectedRecipient && selectedRecipient.type !== recipientType);

  useEffect(() => {
    if (isPropsInvalid) {
      onInvalidData();
    }
  }, [isPropsInvalid, onInvalidData]);

  useEffect(() => {
    if (recipients && recipients.length) {
      setGiftCardRecipients(
        recipients.filter((recipient) => recipient.paymentType === Api.Model.PaymentType.GiftCard)
      );
    }
  }, [recipients]);

  // if (!recipientType || isPropsInvalid) {
  //   return null;
  // }

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
      {giftCardRecipients && giftCardRecipients.length === 0 && (
        <RecipientEmptyState handleOpenModal={handleFormOpen} />
      )}

      {giftCardRecipients && giftCardRecipients.length ? (
        <RecipientListView
          onSelectRecipient={onSelectRecipient}
          recipients={giftCardRecipients}
          handleFormOpen={handleFormOpen}
        />
      ) : null}

      <AddRecipientForm
        handleClose={handleFormClose}
        isOpen={isFormOpen}
        refetchRecipients={refetch}
        state={state}
        onSuccess={(recipient) => {
          recipient && onSelectRecipient(recipient, true);
        }}
        showSaveDetailsField={true}
      />
    </>
  );
};

export default RecipientStep;
