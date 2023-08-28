import Api from '@sendsprint/api-types';
import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { DialogTitle } from '@sendsprint/ui-react/dist/components/Dialog';
import { RESEND_OTP_COUNTDOWN_TIME } from '@src/constants';
import { useMixpanel } from '@src/contexts/mixpanel-context';
import { generateOtpService } from '@src/services/account-service';
import ClientApi from '@src/types/client';
import { mixpanelEvents } from '@src/types/mixpanel';
import { convertToTime } from '@src/utils';
import { getCountryTelCode } from '@src/utils/getCountryTelCode';
import { getState } from '@src/utils/stateStorage';
import { useField } from 'formik';
import { useState } from 'react';
import OtpField from '../../../addressStep/otpModal/OtpField';

interface OtpScreenProps {
  titleId: string;
  changePhoneNumber?: () => void;
  counter: number;
  user?: ClientApi.UserProfile | null;
  verifyStatus?: boolean | null;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const OtpScreen: React.FC<OtpScreenProps> = ({
  titleId,
  changePhoneNumber,
  counter,
  user,
  setCounter,
  verifyStatus
}) => {
  const field = useField('phone');
  const otpField = useField('otp');
  const phoneValue: string = field[0].value;
  const [resendLoading, setResendLoading] = useState(false);
  const { mixpanelInstance } = useMixpanel();

  const resendFunc = async () => {
    const state = getState();
    const hash = (state && state.hash) || '';

    setResendLoading(true);

    const payload: Omit<ClientApi.GenerateOtpI, 'otp'> = {
      email: user?.email || '',
      hash: hash,
      phone: `${getCountryTelCode(
        state?.address?.country || Api.Model.CountryInitials.UnitedKingdom
      )}${field[0].value}`
    };
    try {
      const res = await generateOtpService(payload);

      if (res?.data?.ResponseCode === Api.Endpoint.Response.Code.Successful) {
        setCounter(RESEND_OTP_COUNTDOWN_TIME);

        mixpanelInstance.track(mixpanelEvents.ResendOTP);
      }

      setResendLoading(false);
    } catch (error) {
      setResendLoading(false);
    }
  };

  const handleChangePhone = () => {
    if (changePhoneNumber) {
      changePhoneNumber();
    }

    setCounter(RESEND_OTP_COUNTDOWN_TIME);
    otpField[2].setValue('');
  };

  return (
    <>
      <DialogTitle as="h6" className="ss-text-center" id={titleId}>
        We sent you a code
      </DialogTitle>

      <Text className="ss-text-neutral-40 ss-text-center">
        Please enter the code we sent to ( .. ) ...... {phoneValue.slice(-3)}.
      </Text>

      <Box className="ss-text-center">
        <Button
          type="button"
          variant="tertiary"
          isBlock
          onClick={handleChangePhone}
          label="Change your phone number"
        />
      </Box>
      <OtpField verifyStatus={verifyStatus} name="otp" />
      <Box className="ss-text-center">
        {counter ? (
          <Text className="ss-text-neutral-60 ss-font-bold ss-my-2">
            Resend code in {convertToTime(counter)}
          </Text>
        ) : (
          ''
        )}
        {counter <= 0 && (
          <Button
            type="button"
            disabled={resendLoading}
            variant="tertiary"
            isBlock
            onClick={resendFunc}
            label={resendLoading ? 'Loading' : 'Resend Code'}
          />
        )}
      </Box>
    </>
  );
};

export default OtpScreen;
