import React, { FC } from 'react';
import Button from '@sendsprint/ui-react/dist/components/Button';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogTitle
} from '@sendsprint/ui-react/dist/components/Dialog';
import Text from '@sendsprint/ui-react/dist/components/Text';
import useId from '@sendsprint/ui-react/dist/hooks/useId';
import check from './assets/check.png';
import { Path } from '@src/navigations/routes';

interface Props {
  closeFunc: () => void;
  state: boolean;
  refreshPage?: boolean;
}

const PhoneNumberSuccess: FC<Props> = ({ closeFunc, state, refreshPage }) => {
  const titleId = useId();

  const handleClose = () => {
    closeFunc();
    sessionStorage.removeItem('UPDATE_PHONE');

    if (refreshPage) {
      window.location.href = Path.Dashboard;
    }
  };

  return (
    <>
      <Dialog isOpen={state} onDismiss={closeFunc} aria-labelledby={titleId} size="large">
        <div className="ss-text-center ss-bg-neutral-5 ss-flex ss-justify-center ss-py-12">
          <img src={check} alt="check" />
        </div>
        <DialogBody className="ss-max-w-4xl ss-mx-auto">
          <div className="ss-mb-10 ss-space-y-4">
            <DialogTitle as="h6" className="ss-text-center" id={titleId}>
              You’re all set!
            </DialogTitle>

            <Text className="ss-text-neutral-40 ss-text-center">
              Your phone number has been saved successfuly.
            </Text>
          </div>
        </DialogBody>

        <DialogFooter className="ss-text-center ss-max-w-4xl ss-mx-auto">
          <div>
            <Button
              onClick={handleClose}
              label="Got it!"
              variant="secondary"
              isBlock={true}
              type="button"
            />
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PhoneNumberSuccess;
