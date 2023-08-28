import {
  Box,
  Button,
  ExtraInfo,
  Form,
  FormField,
  FormFieldDropdown,
  Icon,
  Text
} from '@sendsprint/ui-react';
import {
  CloseOutline,
  Globe2Outline,
  KeypadOutline,
  PersonOutline
} from '@sendsprint/ui-react/dist/icons';
import Dialog2 from '@src/components/dialog2';
import { Shape } from '@src/validations';
import React from 'react';
import * as yup from 'yup';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  handleWireFxSubmit: (values: WireFxBankFormI) => void;
}

export interface WireFxBankFormI {
  accountNumber: string;
  accountType: string;
  routingNumber: string;
}

const initialValues: WireFxBankFormI = {
  accountNumber: '',
  accountType: '',
  routingNumber: ''
};

const accountType = [
  { label: 'DEMAND DEPOSIT ACCOUNT', value: 'dda' },
  { label: 'SAVINGS ACCOUNT', value: 'savings' }
];

const ERROR_MGS_FOR_NUMBERS_ONLY = 'Please enter only digits';

const validationSchema = yup.object().shape<Shape<WireFxBankFormI>>({
  accountNumber: yup
    .string()
    .required('Please enter account number')
    .matches(/^[0-9]*$/, {
      message: ERROR_MGS_FOR_NUMBERS_ONLY
    }),
  accountType: yup.string().required('Please select account type'),
  routingNumber: yup
    .string()
    .required('Please enter ABA routing number')
    .length(9, 'ABA routing number must be 9 digits')
    .matches(/^[0-9]*$/, {
      message: ERROR_MGS_FOR_NUMBERS_ONLY
    })
});

const BankDetailsModal = ({ handleClose, isOpen, isLoading, handleWireFxSubmit }: Props) => {
  return (
    <Dialog2 disableOverlayClick handleClose={handleClose} isOpen={isOpen}>
      <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
        <Text className="ss-text-neutral-500" variant="h5">
          Bank details
        </Text>
        <Button
          onClick={handleClose}
          label={<Icon svg={CloseOutline} size={24} />}
          variant="tertiary"
          className="ss-p-0"
        />
      </Box>
      <Form<WireFxBankFormI>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleWireFxSubmit}>
        <Box className="ss-bg-white ss-p-4 ss-rounded-lg ss-space-y-4 ss-mb-6">
          <ExtraInfo
            variant="warning"
            extraInfo="ACH transfers take about one to three business days to complete"
          />
          <FormField
            name="accountNumber"
            type="string"
            icon={KeypadOutline}
            label="Account number"
            extraInfo="Please ensure the name of your sendsprint profile matches the name on the bank account number"
          />
          <FormFieldDropdown
            name="accountType"
            icon={PersonOutline}
            data={accountType}
            emptyOptionLabel=""
            optionLabel="label"
            optionValue="value"
            label="Account type"
          />
          <FormField
            name="routingNumber"
            type="string"
            icon={Globe2Outline}
            extraInfo="Routing numbers (sort codes) are usually nine-digit numbers which identify a bank or financial institution where a customer’s account is being held. This is used when clearing funds for electronic transfers."
            label="ABA routing number"
          />
        </Box>
        <Box>
          <Button
            label="Continue"
            disabled={isLoading}
            showSpinner={isLoading}
            type="submit"
            isBlock
          />
        </Box>
      </Form>
    </Dialog2>
  );
};

export default BankDetailsModal;
