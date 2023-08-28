import { Box, ExtraInfo } from '@sendsprint/ui-react';
import { useEnv } from '@src/contexts';
import { useField } from 'formik';
import React from 'react';
import ReCAPTCHA from 'reaptcha';
// import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  fieldName: string;
}

const Recaptcha = ({ fieldName }: Props) => {
  const { CAPTCHA_SITE_KEY } = useEnv();
  const [, { error, touched }, { setValue, setTouched }] = useField(fieldName);

  function onChange(value: string | null) {
    setTouched(true);

    if (value) {
      setValue(value);
    } else {
      setValue('');
    }
  }

  function onError() {
    setValue('');
  }

  function onExpire() {
    setValue('');
  }

  return (
    <>
      {CAPTCHA_SITE_KEY ? (
        <Box className="ss-max-w-320 ss-w-full ss-space-y-2">
          <ReCAPTCHA
            onExpire={onExpire}
            onError={onError}
            sitekey={CAPTCHA_SITE_KEY}
            onVerify={onChange}
          />
          {touched && error && <ExtraInfo variant="error" extraInfo={error} />}
        </Box>
      ) : null}
    </>
  );
};

export default Recaptcha;
