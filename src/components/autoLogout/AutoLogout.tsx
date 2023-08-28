import React, { useEffect, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Text } from '@sendsprint/ui-react';
import { useAccount } from '@src/contexts';
import throttle from '@src/utils/throttle';
import ImageDialog, { ImageDialogProps } from '@src/components/imageDialog';
import { ReactComponent as InactivityIcon } from './inactivity.svg';

type EventName = keyof DocumentEventMap;

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
type AttachListeners = (events: EventName[], listener: EventListener) => () => void;

// this adds the restart function to the events in the events array
const attachEventListeners: AttachListeners = (events, listener) => {
  events.forEach((event) => {
    document.addEventListener(event, listener);
  });

  return function detachEventListeners() {
    events.forEach((event) => {
      document.removeEventListener(event, listener);
    });
  };
};

type AutoLogoutProps = {
  /**
   * Period of inactivity (in milliseconds) before logging a user out.
   * @default 10 minutes ie 10 * 60 * 1000
   */
  inactivityDuration?: number;
};

/**
 * Log out a signed in user after a period of inactivity.
 * We listen to activity by watching for route changes & some event listeners on document.
 */
const AutoLogout: FC<AutoLogoutProps> = ({ inactivityDuration = 10 * 60 * 1000 }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAccount();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  // make sure the dialog is always closed when logged out
  useEffect(() => {
    if (!isLoggedIn && isDialogOpen) {
      closeDialog();
    }
  }, [isDialogOpen, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn || isDialogOpen || inactivityDuration <= 0) {
      return;
    }

    let timerId: null | number = null;

    // this function opens the dialog after inactivityDuration time elapses.
    const startTimer = () => {
      timerId = window.setTimeout(openDialog, inactivityDuration);
    };

    // this clears the timer id
    const stopTimer = () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }
      timerId = null;
    };

    // this restarts the timer
    const restartTimer = throttle(() => {
      stopTimer();
      startTimer();
    }, 1000);

    // these are the events to watch out for
    const events: EventName[] = ['keyup', 'click', 'scroll', 'mousemove'];

    startTimer();
    // const unListen = history.listen(restartTimer);
    const detachEventListeners = attachEventListeners(events, restartTimer);

    return () => {
      stopTimer();
      // unListen();
      detachEventListeners();
    };
  }, [isLoggedIn, navigate, isDialogOpen, inactivityDuration]);

  if (!isLoggedIn) {
    return null;
  }

  return <AutoLogoutDialog isOpen={isDialogOpen} onDismiss={closeDialog} />;
};

function secondsToMinutesAndSeconds(secs: number) {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

type AutoLogoutDialogProps = { countdownTimeSecs?: number } & Omit<
  ImageDialogProps,
  'imageContent' | 'title' | 'bodyContent' | 'footerContent'
>;

const AutoLogoutDialog: FC<AutoLogoutDialogProps> = ({ countdownTimeSecs = 60, ...props }) => {
  const { logout } = useAccount();
  const [timeLeft, setTimeLeft] = useState(countdownTimeSecs);

  // Reset time left when the dialog is closed
  useEffect(() => {
    if (!props.isOpen) {
      setTimeLeft(countdownTimeSecs);
    }
  }, [countdownTimeSecs, props.isOpen]);

  // Auto decrement the timer when dialog is open
  useEffect(() => {
    if (!props.isOpen) {
      return;
    }
    let secsLeft: number = countdownTimeSecs;
    const interval = window.setInterval(() => {
      setTimeLeft(--secsLeft);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [countdownTimeSecs, props.isOpen]);

  // log out when there is no time left
  useEffect(() => {
    if (timeLeft > 0) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logout().finally(() => {});
  }, [logout, timeLeft]);

  return (
    <ImageDialog
      {...props}
      imageContent={
        <div className="ss-py-8 ss-px-4 ss-bg-neutral-5">
          <Icon svg={InactivityIcon} size={180} />
        </div>
      }
      title="Are you still here?"
      bodyContent={
        <div>
          <Text className="ss-text-neutral-40">
            {/* todo text might need to be dynamic */}
            We’ll be logging you out in 1 minute because you’ve not been active on this page for the
            last 10 minutes.
          </Text>
          <Text variant="h6" className="ss-text-neutral-60 ss-mt-6">
            {secondsToMinutesAndSeconds(timeLeft)}
          </Text>
        </div>
      }
      footerContent={
        <Button label="I’m still here" isBlock={true} variant="primary" onClick={props.onDismiss} />
      }
    />
  );
};

export type { AutoLogoutProps };
export default AutoLogout;
