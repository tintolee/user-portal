import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import ExtraInfo from '@sendsprint/ui-react/dist/components/ExtraInfo';
import FormField from '@sendsprint/ui-react/dist/components/form2/formInput/FormInput';
import FormFieldCheckbox from '@sendsprint/ui-react/dist/components/form2/formCheckbox/FormCheckbox';
import FormFieldDropdown from '@sendsprint/ui-react/dist/components/form2/formDropdown/FormDropdown';
import Text from '@sendsprint/ui-react/dist/components/Text';
import EmailOutline from '@sendsprint/ui-react/dist/icons/EmailOutline';
import GlobeOutline from '@sendsprint/ui-react/dist/icons/GlobeOutline';
import LockOutline from '@sendsprint/ui-react/dist/icons/LockOutline';
import PersonOutline from '@sendsprint/ui-react/dist/icons/PersonOutline';
import SpeakerphoneOutline from '@sendsprint/ui-react/dist/icons/SpeakerphoneOutline';
import PasswordValidationInfo from '@src/components/passwordValidationInfo/PasswordValidationInfo';
import { useEnv } from '@src/contexts/env-context';
import ClientApi from '@src/types/client';
import React from 'react';

interface Props {
  signUpSourcesLoading: boolean;
  signUpSources: ClientApi.Account.SignUpSource.SignUpSourceData[] | undefined;
  isLoading: boolean;
}

const SignUpForm = ({ signUpSourcesLoading, signUpSources, isLoading }: Props) => {
  const { WEBSITE_URL } = useEnv();
  return (
    <Box>
      <Text className="ss-text-left" variant="h3">
        Sign up for free today
      </Text>
      <Text className="ss-text-neutral-400 ss-mb-6" variant="paragraphLarge">
        Start sending money and gifts by creating an account!
      </Text>
      <Box className="ss-space-y-4">
        <Box className="ss-flex ss-flex-col md:ss-flex-row ss-gap-4 ss-items-start">
          <FormField
            icon={PersonOutline}
            name="firstName"
            className="ss-w-full md:ss-w-auto md:ss-flex-1"
            label="First name"
          />
          <FormField
            icon={PersonOutline}
            name="lastName"
            className="ss-w-full md:ss-w-auto md:ss-flex-1"
            label="Last name"
          />
        </Box>
        <FormField name="email" icon={EmailOutline} label="Email address" type="email" />
        <Box>
          <FormField
            disableErrorFromShowing
            icon={LockOutline}
            name="password"
            label="Password"
            type="password"
          />
          <ExtraInfo
            extraInfo={<PasswordValidationInfo passwordFieldName="password" className="" />}
          />
        </Box>
        <FormFieldDropdown
          icon={GlobeOutline}
          data={signUpSources || []}
          isLoading={signUpSourcesLoading}
          name="signUpSource"
          label="How did you hear about us?"
          optionLabel="Name"
          optionValue="Id"
          optionIcon=""
          emptyOptionLabel=""
        />
        <FormField
          name="referralCode"
          icon={SpeakerphoneOutline}
          label="Referral code (Optional)"
        />
        <FormFieldCheckbox
          name="acceptTerms"
          label={
            <span>
              By continuing, you accept{' '}
              <a
                className="ss-font-bold ss-text-primary1-500 ss-duration-150 ss-underline hover:ss-text-success-500"
                href={`${WEBSITE_URL}/terms-and-conditions`}
                target="_blank"
                rel="noreferrer">
                ours and our partners&apos;
              </a>{' '}
              terms of use
            </span>
          }
        />
        <Box className="ss-mt-6">
          <Button
            type="submit"
            isBlock
            disabled={isLoading}
            showSpinner={isLoading}
            label="Sign up"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
