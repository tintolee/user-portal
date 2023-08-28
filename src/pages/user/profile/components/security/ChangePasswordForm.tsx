import { Box, Button, ExtraInfo, Form, FormField, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline, LockOutline } from '@sendsprint/ui-react/dist/icons';
import { Dialog2, PasswordValidationInfo } from '@src/components';
import { useAccount, useToasts } from '@src/contexts';
import { useChangePasswordFromProfile } from '@src/hooks';
import { Shape, userSchema } from '@src/validations';
import React from 'react';
import * as yup from 'yup';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

interface InitialValuesI {
  currentPassword: string;
  newPassword: string;
}

const initialValues: InitialValuesI = {
  currentPassword: '',
  newPassword: ''
};

const validationSchema = yup.object().shape<Shape<InitialValuesI>>({
  currentPassword: userSchema.oldPassword,
  newPassword: userSchema.newPassword
});

const ChangePasswordForm = ({ handleClose, isOpen }: Props) => {
  const { addToast } = useToasts();
  const { user, logout } = useAccount();
  const { mutate, isLoading } = useChangePasswordFromProfile({
    onSuccess: () => {
      addToast(
        {
          title: 'Password change successful',
          body: 'Please log in with your new credentials'
        },
        { appearance: 'success' }
      );

      logout();
    }
  });

  const handleSubmit = (values: InitialValuesI) => {
    mutate({
      Email: user?.email || '',
      Password: values.currentPassword,
      NewPassword: values.newPassword
    });
  };
  return (
    <>
      <Dialog2 isOpen={isOpen} handleClose={handleClose}>
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
          <Text className="ss-text-neutral-500" variant="h5">
            Change Password
          </Text>
          <Button
            onClick={handleClose}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <Form<InitialValuesI>
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}>
          <Box className="ss-bg-white ss-p-4 ss-rounded-base ss-space-y-4 ss-mb-8">
            <FormField
              name="currentPassword"
              label="Current Password"
              icon={LockOutline}
              type="password"
            />
            <FormField name="newPassword" label="New Password" icon={LockOutline} type="password" />
            <ExtraInfo
              extraInfo={<PasswordValidationInfo passwordFieldName="newPassword" className="" />}
            />
          </Box>
          <Box className="ss-space-y-3">
            <Button disabled={isLoading} label="Update" type="submit" isBlock />
            <Button onClick={handleClose} label="Cancel" variant="tertiary" isBlock />
          </Box>
        </Form>
      </Dialog2>
    </>
  );
};

export default ChangePasswordForm;
