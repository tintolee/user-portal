import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import FormField from '@sendsprint/ui-react/dist/components/form2/formInput/FormInput';
import Text from '@sendsprint/ui-react/dist/components/Text';
import EmailOutline from '@sendsprint/ui-react/dist/icons/EmailOutline';
import LockOutline from '@sendsprint/ui-react/dist/icons/LockOutline';
import { Path } from '@src/navigations/routes';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  isLoading: boolean;
}

const LoginFormContent = ({ isLoading }: Props) => {
  return (
    <Box>
      <Text className="ss-text-left ss-mb-6" variant="h3">
        Welcome back!
      </Text>
      <Box className="">
        <Box className="ss-space-y-4">
          <FormField
            name="email"
            type="email"
            icon={EmailOutline}
            className="ss-w-full md:ss-w-auto md:ss-flex-1"
            label="Email address"
          />
          <FormField name="password" icon={LockOutline} label="Password" type="password" />
        </Box>
        <Box className="ss-mt-6">
          <Button
            type="submit"
            isBlock
            disabled={isLoading}
            showSpinner={isLoading}
            label="Login"
          />
        </Box>
      </Box>
      <Text variant="paragraphLarge" className="ss-text-neutral-400 ss-mt-6">
        Forgotten your password?{' '}
        <Link className="ss-text-primary1-500 ss-font-semibold" to={Path.ResetPassword}>
          Reset it.
        </Link>
      </Text>
    </Box>
  );
};

export default LoginFormContent;
