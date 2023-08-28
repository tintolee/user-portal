import { Box, Button, Dialog, DialogBody, DialogTitle } from '@sendsprint/ui-react';
import { useToggle } from '@src/hooks';
import React from 'react';

interface Props {
  isDeleteLoading: boolean;
  handleDeleteRecipient: () => void;
}

const ConfirmDeleteModal = ({ handleDeleteRecipient, isDeleteLoading }: Props) => {
  const { handleFalse, handleTrue, state } = useToggle();
  return (
    <>
      <Button
        isBlock
        variant="tertiary"
        className="ss-text-error-500"
        onClick={handleTrue}
        label="Delete recipient"
      />
      <Dialog isOpen={state} onDismiss={handleFalse}>
        <DialogBody>
          <DialogTitle className="ss-text-center">Are you sure?</DialogTitle>
          <Box className="ss-flex ss-items-center ss-gap-5 ss-mt-5">
            <Button
              className="ss-flex-1"
              label="No, go back"
              onClick={handleFalse}
              variant="secondary"
            />
            <Button
              disabled={isDeleteLoading}
              label="Yes, delete"
              className="ss-flex-1"
              onClick={handleDeleteRecipient}
            />
          </Box>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteModal;
