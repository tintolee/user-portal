import React, { FC } from 'react';
import Button from '@sendsprint/ui-react/dist/components/Button';
import { Icon } from '@sendsprint/ui-react/dist/components/Icon';
import Text from '@sendsprint/ui-react/dist/components/Text';
import useId from '@sendsprint/ui-react/dist/hooks/useId';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogTitle
} from '@sendsprint/ui-react/dist/components/Dialog';
import { Confetti } from '../../assets';
import { useAccount } from '@src/contexts/auth-context';
import { useMixpanel } from '@src/contexts/mixpanel-context';
import { useNavigate } from 'react-router-dom';
import { mixpanelEvents } from '@src/types/mixpanel';

interface Props {
  loginUrl: string;
  isRegistered: boolean;
}

const SignupSuccessModal: FC<Props> = ({ loginUrl, isRegistered }) => {
  const titleId = useId();
  const { handleRegisterFalse } = useAccount();
  const { mixpanelInstance } = useMixpanel();

  const signUpUser = sessionStorage.getItem('SprintUser');

  const navigate = useNavigate();

  const handleClose = () => {
    handleRegisterFalse();

    sessionStorage.removeItem('SprintUser');
    mixpanelInstance.track(mixpanelEvents.SignUpSuccessful);

    navigate(loginUrl);
  };

  return (
    <>
      <Dialog isOpen={isRegistered} onDismiss={handleClose} aria-labelledby={titleId} size="large">
        <div className="ss-text-center ss-bg-neutral-80 ss-py-12">
          <Icon size={150} svg={Confetti} />
        </div>

        <DialogBody>
          <div className="ss-mb-10 ss-space-y-4">
            <DialogTitle as="h3" className="ss-text-center" id={titleId}>
              Welcome to Sendsprint, {signUpUser}
            </DialogTitle>

            <Text className="ss-text-neutral-400 ss-text-center">
              Sendsprint is designed to help you send money and gifts home with ease.
            </Text>
            <Text className="ss-text-neutral-400 ss-text-center">
              Click the verification link in your email, verify your account and start sending money
              right away!
            </Text>
          </div>
          <div className="ss-space-y-6"></div>
        </DialogBody>

        <DialogFooter>
          <div className="ss-text-center ss-max-w-2xl lg:ss-max-w-xl ss-mx-auto">
            <Button
              data-testid="cta-button"
              onClick={handleClose}
              label="Okay got it"
              variant="primary"
              isBlock={true}
            />
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SignupSuccessModal;
