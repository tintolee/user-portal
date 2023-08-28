import { Box, Button, Icon } from '@sendsprint/ui-react';
import { EmailOutline, Facebook, Linkedin, Twitter } from '@sendsprint/ui-react/dist/icons';
import { useAccount, useEnv } from '@src/contexts';
import { useMedia } from '@src/hooks';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RiWhatsappFill } from 'react-icons/ri';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

const SocialShare = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { APP_DEPLOY_URL } = useEnv();
  const { user } = useAccount();
  const { isMobile } = useMedia();

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  const handleCopy = () => {
    setIsCopied(true);
  };

  const url = `${APP_DEPLOY_URL}/register?referral=${user?.referralCode || ''}`;
  return (
    <Box className="ss-flex ss-items-center ss-justify-between ss-flex-wrap ss-gap-4 ss-mt-5">
      <Box className="ss-flex ss-max-w-400 ss-justify-between md:ss-justify-start ss-w-full md:ss-w-auto ss-items-center ss-gap-3">
        <TwitterShareButton className="focus:ss-focus-ring ss-rounded-full" url={url}>
          <div className="ss-w-10 ss-h-10 ss-rounded-full ss-bg-success-100 ss-flex ss-items-center ss-justify-center focus:ss-focus-ring">
            <Icon svg={Twitter} />
          </div>
        </TwitterShareButton>
        <LinkedinShareButton className="focus:ss-focus-ring ss-rounded-full" url={url}>
          <div className="ss-w-10 ss-h-10 ss-rounded-full ss-bg-success-100 ss-flex ss-items-center ss-justify-center focus:ss-focus-ring">
            <Icon svg={Linkedin} />
          </div>
        </LinkedinShareButton>
        <FacebookShareButton className="focus:ss-focus-ring ss-rounded-full" url={url}>
          <div className="ss-w-10 ss-h-10 ss-rounded-full ss-bg-success-100 ss-flex ss-items-center ss-justify-center focus:ss-focus-ring">
            <Icon svg={Facebook} />
          </div>
        </FacebookShareButton>
        <WhatsappShareButton className="focus:ss-focus-ring ss-rounded-full" url={url}>
          <div className="ss-w-10 ss-h-10 ss-rounded-full ss-bg-success-100 ss-flex ss-items-center ss-justify-center focus:ss-focus-ring">
            <Icon svg={RiWhatsappFill} />
          </div>
        </WhatsappShareButton>
        <EmailShareButton className="focus:ss-focus-ring ss-rounded-full" url={url}>
          <div className="ss-w-10 ss-h-10 ss-rounded-full ss-bg-success-100 ss-flex ss-items-center ss-justify-center focus:ss-focus-ring">
            <Icon svg={EmailOutline} />
          </div>
        </EmailShareButton>
      </Box>
      <CopyToClipboard onCopy={handleCopy} text={url || ''}>
        <Button isBlock={isMobile} label={isCopied ? 'Copied' : 'Copy link'} variant="secondary" />
      </CopyToClipboard>
    </Box>
  );
};

export default SocialShare;
