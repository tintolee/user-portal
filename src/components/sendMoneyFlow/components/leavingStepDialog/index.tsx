import React, { useRef } from 'react';
import { Button, Dialog, DialogTitle, Text, useId, DialogProps } from '@sendsprint/ui-react';
import { noop } from '@sendsprint/ui-react/dist/utils';
import { StepIndex } from '../../state/types';

type LeavingStepDialogProps = {
  nextStep: StepIndex;
  // eslint-disable-next-line no-unused-vars
  handleDestructiveClick: (id: StepIndex) => void;
} & Omit<
  DialogProps,
  'aria-labelledby' | 'initialFocusRef' | 'headerContent' | 'bodyContent' | 'footerContent'
>;

/**
 * Dialog shown when a user attempts to leave a SendMoney step with unsaved changes.
 */
const LeavingStepDialog = ({
  handleDestructiveClick,
  nextStep,
  onDismiss = noop,
  ...props
}: LeavingStepDialogProps) => {
  const titleId = useId();
  const nonDestructiveBtnRef = useRef(null);

  const onDestructiveButtonClick = () => {
    onDismiss();
    handleDestructiveClick(nextStep);
  };
  return (
    <Dialog
      aria-labelledby={titleId}
      initialFocusRef={nonDestructiveBtnRef}
      onDismiss={onDismiss}
      {...props}
      bodyContent={
        <div className="ss-text-center ss-space-y-4 ss-max-w-3xl ss-mx-auto">
          <DialogTitle id={titleId}>Leave step?</DialogTitle>
          <Text className="ss-text-neutral-40">
            You have unsaved changes on the current step. Are you sure you want to leave?
          </Text>
        </div>
      }
      footerContent={
        <div className="ss-space-x-4 ss-flex ss-max-w-3xl ss-mx-auto">
          <Button
            ref={nonDestructiveBtnRef}
            label="Continue"
            variant="secondary"
            className="ss-flex-grow"
            isBlock={true}
            onClick={onDismiss}
          />
          <Button
            label="Leave"
            variant="primary"
            className="ss-flex-grow"
            isBlock={true}
            onClick={onDestructiveButtonClick}
          />
        </div>
      }
    />
  );
};

export default LeavingStepDialog;
