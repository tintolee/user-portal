import Box from '@sendsprint/ui-react/dist/components/Box';
import { ButtonLink } from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { ReactComponent as MailVerified } from './assets/mail_verified.svg';
import { Path } from '@src/navigations/routes';

const VerifyEmailInner = () => {
  return (
    <Box className="ss-flex ss-justify-center">
      <div className="ss-w-full md:ss-w-100 ">
        <div className="ss-flex ss-bg-neutral-100 ss-items-center ss-justify-center ss-h-60">
          <MailVerified className="ss-w-6/12" />
        </div>
        <div className="ss-bg-white ss-flex ss-flex-col ss-items-center ss-justify-center ss-py-8">
          <Text className="ss-mb-4 ss-font-semibold">Your email address has been verified</Text>
          <div className="ss-flex ss-justify-center ss-w-10/12 md:ss-w-8/12">
            <ButtonLink to={Path.Login} label="Continue" variant="primary" isBlock={true} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default VerifyEmailInner;
