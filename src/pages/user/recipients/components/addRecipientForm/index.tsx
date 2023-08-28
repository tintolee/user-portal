import React, { useState } from 'react';
import { Box, Form, Text } from '@sendsprint/ui-react';
import AddRecipientFormInner from './AddRecipientFormInner';
import { CloseBtn, Dialog2 } from '@src/components';
import Api from '@sendsprint/api-types';
import { useAddRecipientForm } from '../../hooks';

interface Props {
  handleClose: () => void;
  refetchRecipients: () => void;
  isOpen: boolean;
}

export interface AddRecipientFormI {
  country: string;
  paymentType: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  address: string;
  branchCode: string;
  paymentOperator: string;
  saveDetails: boolean;
}

export type FormSteps = 1 | 2 | 3 | 4;

const AddRecipientForm = ({ handleClose, refetchRecipients, isOpen }: Props) => {
  const [initialValues, setInitialValues] = useState<AddRecipientFormI>({
    country: Api.Model.CountryInitials.Nigeria,
    paymentType: '',
    bankCode: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
    phoneNumber: '',
    email: '',
    address: '',
    branchCode: '',
    paymentOperator: '',
    saveDetails: true
  });

  const {
    addRecipientLoading,
    handleCloseModal,
    handleResetEnteredSteps,
    handleStepClick,
    handleSubmit,
    handleToggleStep,
    receiveCountries,
    receiveCountriesLoading,
    recipientAdded,
    validationSchema,
    currentStep,
    enteredSteps
  } = useAddRecipientForm({ handleClose, refetchRecipients });

  return (
    <Dialog2 disableOverlayClick isOpen={isOpen} handleClose={handleCloseModal}>
      <Box
        style={{
          backgroundColor: '#F6F8FA'
        }}
        className="ss-h-max ss-min-h-screen">
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
          <Text className="ss-text-neutral-500" variant="h5">
            {currentStep !== 4 ? 'Add a recipient' : 'All Done'}
          </Text>
          <CloseBtn onClick={handleCloseModal} />
        </Box>
        <Form<AddRecipientFormI>
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}>
          <AddRecipientFormInner
            receiveCountries={receiveCountries}
            receiveCountriesLoading={receiveCountriesLoading}
            handleToggleStep={handleToggleStep}
            currentStep={currentStep}
            handleStepClick={handleStepClick}
            enteredSteps={enteredSteps}
            handleResetEnteredSteps={handleResetEnteredSteps}
            addRecipientLoading={addRecipientLoading}
            handleClose={handleCloseModal}
            recipientAdded={recipientAdded}
          />
        </Form>
      </Box>
    </Dialog2>
  );
};

export default AddRecipientForm;
