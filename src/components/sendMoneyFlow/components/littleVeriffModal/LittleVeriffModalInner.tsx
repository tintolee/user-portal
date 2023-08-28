import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import { Dialog, DialogContent, DialogFooter } from '@sendsprint/ui-react/dist/components/Dialog';
import Text from '@sendsprint/ui-react/dist/components/Text';
import Image from '@src/components/image';
import React, { useId } from 'react';
import { goodbye } from './assets';

interface Props {
  isShown: boolean;
  handleClickVeriff: () => Promise<void>;
  loading: boolean;
  handleClose: () => void;
}

const LittleVeriffModalInner = ({ isShown, handleClickVeriff, handleClose, loading }: Props) => {
  const id = useId();

  return (
    <Dialog
      isOpen={isShown}
      showCloseButton={false}
      aria-labelledby={id}
      onDismiss={() => undefined}>
      <DialogContent aria-labelledby={id}>
        <Box className="ss-py-16 ss-mb-10 ss-flex ss-justify-center ss-items-center ss-bg-neutral-5">
          <Image alt="" className="ss-w-26" src={goodbye} />
        </Box>
        <Box className="ss-px-4">
          <Text
            variant="h6"
            className="ss-text-neutral-60 ss-mb-4 ss-w-full ss-text-center ss-max-w-500 ss-mx-auto">
            Almost there!
          </Text>
          <Text className="ss-text-neutral-40 ss-w-full ss-text-center ss-max-w-500 ss-mx-auto">
            We need you to please verify your profile. This takes less than 2 minutes and will
            require you have your chosen ID, physically with you. You can skip this step for later,
            but you’ll need to complete this to use SendSprint.
          </Text>
        </Box>
      </DialogContent>
      <DialogFooter className="">
        <Button
          onClick={handleClickVeriff}
          showSpinner={loading}
          isBlock
          variant="primary"
          label="Verify"
          className="ss-mb-4"
        />
        <Button label="I'll do this later" isBlock onClick={handleClose} variant="tertiary" />
      </DialogFooter>
    </Dialog>
  );
};

export default LittleVeriffModalInner;
