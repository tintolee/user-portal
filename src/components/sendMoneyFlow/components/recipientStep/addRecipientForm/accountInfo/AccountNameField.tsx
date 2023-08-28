import { FormField } from '@sendsprint/ui-react';
import { PersonOutline } from '@sendsprint/ui-react/dist/icons';
import { AnySchema } from 'yup';

interface AccountNameFieldProps {
  accountNumberSchema: AnySchema;
  resolveBankLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const AccountNameField = ({ accountNumberSchema, resolveBankLoading }: AccountNameFieldProps) => {
  return (
    <FormField
      icon={PersonOutline}
      name="accountName"
      isLoading={resolveBankLoading}
      label="Account name"
    />
  );
};

export default AccountNameField;
