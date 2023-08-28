import React, { FC, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogTitle,
  Text,
  useId
} from '@sendsprint/ui-react';
import { useDashboardContext } from '@src/contexts/dashboard-context';
import { identification } from './assets';
import { useMixpanel } from '@src/contexts';
import { mixpanelEvents } from '@src/types/mixpanel';

interface Props {
  handleClick: () => void;
  state: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stateFunc?: any;
}

const veriffModalData = [
  {
    number: '01',
    body: 'Keep your phone within reach (we’ll send you a verification link via text).'
  },
  {
    number: '02',
    body: 'Share a valid ID (this could be any of: International passport, Driver’s license, Passport, Residence permit).'
  },
  {
    number: '03',
    body: 'Be ready to take a quick selfie.'
  }
];

const VeriffModal: FC<Props> = ({ handleClick, state, stateFunc }) => {
  const titleId = useId();
  const { handleVeriffOpenTab } = useDashboardContext();
  const [loading, setLoading] = useState(false);
  const { mixpanelInstance } = useMixpanel();

  const handleClickVeriff = async () => {
    setLoading(true);
    mixpanelInstance.track(mixpanelEvents.VeriffStarted, {
      from: 'Veriff modal'
    });

    await handleVeriffOpenTab();
    if (stateFunc) {
      stateFunc(false);
    }
    setLoading(false);
  };

  const handleClose = () => {
    handleClick();
  };

  return (
    <>
      <Dialog isOpen={state} onDismiss={handleClose} aria-labelledby={titleId} size="large">
        <div className="ss-text-center ss-flex ss-justify-center ss-bg-primary1-500 ss-py-12">
          <img src={identification} alt="" />
        </div>

        <DialogBody>
          <div className="ss-mb-10 ss-space-y-4">
            <DialogTitle as="h3" className="ss-text-center" id={titleId}>
              Verify your identity
            </DialogTitle>

            <Box>
              {veriffModalData.map((item) => (
                <VeriffList {...item} key={item.number} />
              ))}
            </Box>
          </div>
          <div className="ss-space-y-6"></div>
        </DialogBody>

        <DialogFooter>
          <div className="ss-text-center ss-flex ss-max-w-2xl lg:ss-max-w-xl ss-mx-auto">
            <Button
              onClick={handleClickVeriff}
              showSpinner={loading}
              isBlock
              label="Continue"
              variant="primary"
            />
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

interface VeriffListProps {
  number: string;
  body: string;
}

const VeriffList: React.FC<VeriffListProps> = ({ number, body }) => {
  return (
    <Box className="ss-flex ss-items-center ss-mb-6 ss-bg-neutral-100 ss-p-4 ss-rounded">
      <Text variant="h1" className="ss-text-neutral-20 ss-mr-4">
        {number}
      </Text>
      <Text
        dangerouslySetInnerHTML={{ __html: body }}
        className="ss-text-neutral-40 ss-flex-1"></Text>
    </Box>
  );
};

export default VeriffModal;
