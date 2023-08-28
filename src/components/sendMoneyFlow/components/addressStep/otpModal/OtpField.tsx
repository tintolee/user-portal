import { ErrorMessage, useField } from 'formik';
import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import Box from '@sendsprint/ui-react/dist/components/Box';
import ExtraInfo from '@sendsprint/ui-react/dist/components/ExtraInfo';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { useMixpanel } from '@src/contexts/mixpanel-context';
import { mixpanelEvents } from '@src/types/mixpanel';

interface Props {
  name: string;
  length?: number;
  verifyStatus?: boolean | null;
  type?: React.HTMLInputTypeAttribute;
}

const OtpField: React.FC<Props> = ({ name, length = 6, verifyStatus, type = 'number' }) => {
  const [otpState, setOtpState] = useState(new Array(length).fill(''));
  const [otpString, setOtpString] = useState('');
  const { mixpanelInstance } = useMixpanel();

  const field = useField(name);

  // effect to change state to string
  useEffect(() => {
    if (otpState) {
      setOtpString(otpState.join(''));
    }
  }, [otpState, mixpanelInstance]);

  useEffect(() => {
    if (otpState) {
      if (otpString) {
        return;
      }

      mixpanelInstance.track(mixpanelEvents.OTPFieldFilling);
    }
  }, [otpState, otpString, mixpanelInstance]);

  // effect to save to formik state
  useEffect(() => {
    field[2].setValue(otpString);
  }, [otpString]);

  useEffect(() => {
    if (field[0].value) {
      setOtpState((field[0].value as string).split(''));
    }
  }, []);

  //   change function for otp inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(e.target.value)) || e.target.value.length > 1) {
      return false;
    }

    setOtpState([...otpState.map((item, i) => (i === index ? e.target.value : item))]);

    // focus next input
    if (e.target.nextSibling) {
      (e.target.nextSibling as HTMLElement).focus();
    } else {
      e.target.blur();
    }
  };

  const classes = cs(
    'ss-border ss-text-paragraph-regular ss-px-4 ss-rounded-base ss-block focus:ss-focus-ring ss-bg-neutral-100 ss-placeholder-neutral-400 ss-text-neutral-500 ss-border-neutral-300 hover:ss-border-primary1-500 focus:ss-border-primary1-50 ss-field ss-w-12 md:ss-px-5 md:ss-w-14 ss-h-12 ss-mx-1',
    {
      'focus:shadow-focused-red ss-border-error-500 focus:border-error-hover':
        (field[1].touched && field[1].error) || verifyStatus === false
    }
  );

  return (
    <>
      <div className="ss-flex ss-max-w-500 ss-justify-center ss-item-center">
        {otpState.map((item, index) => (
          <input
            className={classes}
            value={item}
            key={index}
            type={type}
            name="otp-field-input"
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      {field[1].touched && field[1].error && (
        <Box className="ss-flex ss-justify-center ss-mt-2">
          <ErrorMessage name={name}>
            {(errMessage) => (
              <div className="ss--mt-3">
                <ExtraInfo variant="error" extraInfo={errMessage} />
              </div>
            )}
          </ErrorMessage>
        </Box>
      )}
      {verifyStatus === false && (
        <Box className="ss-flex ss-justify-center ss-item-center">
          <Text className="ss-text-negative-100">The code you&apos;ve entered is wrong</Text>
        </Box>
      )}
    </>
  );
};

export default OtpField;
