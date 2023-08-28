import { Location } from 'history';
import React, { useEffect, useRef, useState, FC, ReactNode } from 'react';
import { Button, Dialog, DialogTitle, Text, useId } from '@sendsprint/ui-react';
import { useNavigate } from 'react-router-dom';
import { useDashboardContext } from '@src/contexts';
import { useUnsavedChangesWarning } from '@src/hooks';

type RouteLeavingGuardProps = {
  /**
   * When shouldBlockNavigation should be invoked
   */
  when?: boolean | undefined;
  /**
   * Go to path when a user confirms navigation
   * @param {string} path
   */
  // eslint-disable-next-line no-unused-vars
  navigate?: (path: string) => void;
  /**
   * Block navigation based on where the user wants to go to. Return true if navigation should be blocked
   * @param {Location} location - where the user wants to go to
   */
  // eslint-disable-next-line no-unused-vars
  shouldBlockNavigation?: (location: Location) => boolean;
  dialogTitle?: ReactNode;
  dialogContent?: ReactNode;
  destructiveBtnLabel?: string;
  nonDestructiveBtnLabel?: string;
  resetToSendIndexPage: () => void;
  isSendIndexPage: boolean;
  markPageAsClean: () => void;
};

const functionReturnsTrue = () => true;

const RouteLeavingGuard: FC<RouteLeavingGuardProps> = ({
  when,
  navigate,
  shouldBlockNavigation = functionReturnsTrue,
  dialogTitle,
  dialogContent,
  destructiveBtnLabel,
  nonDestructiveBtnLabel,
  resetToSendIndexPage,
  isSendIndexPage,
  markPageAsClean
}) => {
  const history = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const titleId = useId();
  const nonDestructiveBtnRef = useRef(null);

  const { handleClickFalse, isSendBtnClicked } = useDashboardContext();

  const closeModal = () => {
    setModalVisible(false);
    handleClickFalse(); // when the modal is closed, the isSendBtnClicked is set to false
  };

  const handleBlockedNavigation = (nextLocation: Location): boolean => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setModalVisible(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };

  useUnsavedChangesWarning(when, handleBlockedNavigation);

  const handleConfirmNavigationClick = () => {
    setConfirmedNavigation(true);
    setModalVisible(false);
    markPageAsClean();
  };

  const navigateFn = navigate || history;

  // used to show the modal when isSendBtnClicked is true
  // also triggers the resetToSendIndexPage function when the user clicks leave btn
  useEffect(() => {
    // if (isSendIndexPage && when && isSendBtnClicked) {
    //   return setModalVisible(false);
    // }

    if (isSendBtnClicked && !isSendIndexPage) {
      setModalVisible(true);
    }

    if (isSendBtnClicked && confirmedNavigation) {
      resetToSendIndexPage();
    }
  }, [isSendBtnClicked, confirmedNavigation, resetToSendIndexPage, isSendIndexPage, when]);

  // this is used to set confirmedNavigation to false when modal is not shown
  useEffect(() => {
    if (!modalVisible) {
      setConfirmedNavigation(false);
    }
  }, [modalVisible]);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location
      // console.log(window.location.origin, 'window.location.href');
      // const origin = window.location.href.slice(0, window.location.href.lastIndexOf('/'));

      window.location.href = `${window.location.origin}${lastLocation.pathname}`;
      // navigateFn(location.pathname);
    }
  }, [confirmedNavigation, navigateFn, lastLocation]);

  return (
    <>
      {/* <Prompt when={when} message={handleBlockedNavigation} /> */}
      <Dialog
        aria-labelledby={titleId}
        isOpen={modalVisible}
        onDismiss={closeModal}
        initialFocusRef={nonDestructiveBtnRef}
        bodyContent={
          <div className="ss-text-center ss-space-y-4 ss-max-w-3xl ss-mx-auto">
            <DialogTitle id={titleId}>{dialogTitle}</DialogTitle>
            <Text className="ss-text-neutral-40">{dialogContent}</Text>
          </div>
        }
        footerContent={
          <div className="ss-space-x-4 ss-flex ss-max-w-3xl ss-mx-auto">
            <Button
              ref={nonDestructiveBtnRef}
              label={nonDestructiveBtnLabel as string}
              variant="secondary"
              className="ss-flex-grow"
              isBlock={true}
              onClick={closeModal}
            />
            <Button
              label={destructiveBtnLabel as string}
              variant="primary"
              className="ss-flex-grow"
              isBlock={true}
              onClick={handleConfirmNavigationClick}
            />
          </div>
        }
      />
    </>
  );
};

RouteLeavingGuard.defaultProps = {
  dialogTitle: 'Leave page?',
  dialogContent:
    'You are about to leave this page and may lose unsaved changes. Are you sure you want to leave?',
  destructiveBtnLabel: 'Leave this page',
  nonDestructiveBtnLabel: 'Remain on page'
};

export type { RouteLeavingGuardProps };
export default RouteLeavingGuard;
