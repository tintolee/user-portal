import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogTitle, useId } from '@sendsprint/ui-react';

interface Props {
  handleCancel: () => void;
  isLoading: boolean;
}

const CancelDialog = ({ handleCancel, isLoading }: Props) => {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Button className="ss-py-2" label={<span>Cancel</span>} variant="secondary" onClick={open} />

      <Dialog isOpen={isOpen} onDismiss={close} aria-labelledby={titleId} size="normal">
        <DialogBody>
          <div className="ss-mb-10 ss-space-y-4">
            <DialogTitle as="h3" className="ss-text-center" id={titleId}>
              Are you sure you want to cancel this transfer schedule?
            </DialogTitle>
          </div>
          <div className="ss-text-center ss-flex ss-flex-col md:ss-flex-row ss-w-full ss-gap-6 ss-items-center ss-justify-center  ss-mx-auto">
            <Button
              onClick={handleCancel}
              label="Yes, I want to cancel"
              disabled={isLoading}
              variant="secondary"
              className="ss-bg-negative-100 ss-w-full hover:ss-text-white md:ss-w-auto ss-flex-1 ss-text-white hover:ss-bg-negative-100"
            />
            <Button
              onClick={close}
              label="No, I don't want to cancel"
              variant="secondary"
              className="ss-flex-1 ss-w-full md:ss-w-auto"
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default CancelDialog;
