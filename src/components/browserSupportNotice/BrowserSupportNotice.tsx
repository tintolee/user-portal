import React, { useState, useEffect, FC } from 'react';
import { Button, Text, Dialog } from '@sendsprint/ui-react';
// import { Dialog } from '@src/components';
import { isBrowserIE, isBrowserOperaMini, isOldEdge } from '@src/utils/userAgent';
import * as stateStorage from '@src/utils/stateStorage';

const BrowserSupportNotice: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [browser, setBrowser] = useState('');
  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);

  useEffect(() => {
    const storageState = stateStorage.getState();
    if (storageState?.isBrowserSupportNoticeDismissed) {
      return;
    }
    if (isBrowserOperaMini()) {
      setBrowser('Opera Mini');
      show();
    }
    if (isBrowserIE()) {
      setBrowser('Internet Explorer');
      show();
    }
    if (isOldEdge()) {
      setBrowser('Edge');
      show();
    }
  }, []);

  return (
    <Dialog
      isOpen={isOpen}
      showCloseButton={false}
      title="Your browser isn't supported"
      bodyContent={
        <Text as="div" className="ss-flex-grow ss-text-neutral-80" variant="paragraphRegular">
          Your browser {browser} is not supported and some features may be broken. Please use the
          most recent version of
          {/* eslint-disable-next-line react/no-children-prop */}
          <span className="ss-font-bold">Chrome, Safari, Firefox or Edge</span>.
        </Text>
      }
      footerContent={
        <Button
          label="Okay, got it"
          variant="primary"
          isBlock={true}
          onClick={() => {
            hide();
            stateStorage.setState({ isBrowserSupportNoticeDismissed: true });
          }}
        />
      }
    />
  );
};

export default BrowserSupportNotice;
