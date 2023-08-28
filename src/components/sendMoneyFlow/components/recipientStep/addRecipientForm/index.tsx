import { Box, Button, Form, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';
import { useGetReceiveCountries } from '@src/hooks';
import { useAddRecipient } from '@src/hooks/queries/recipient';
import ClientApi from '@src/types/client';
import React, { useMemo } from 'react';
import AddRecipientFormInner from './AddRecipientFormInner';
import { Dialog2 } from '@src/components';
import { getRecipientStepInitialFormData } from '../../../utils/recipientStep';
import { useAddRecipientLogic } from '../../../hooks/recipientStep';

type AddRecipientFormProps = {
  // eslint-disable-next-line no-unused-vars
  onSuccess: (recipientData: ClientApi.Recipient | null) => void;
  type: ClientApi.RecipientType;
  handleClose: () => void;
  refetchRecipients: () => void;
  isOpen: boolean;
} & Pick<ClientApi.RecipientFormProps, 'showSaveDetailsField' | 'ctaContent'>;

export interface RecipientFormData {
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

export type FormSteps = 1 | 2;

const AddRecipientForm = ({
  handleClose,
  refetchRecipients,
  isOpen,
  onSuccess,
  type
}: AddRecipientFormProps) => {
  // const [currentStep, setCurrentStep] = useState<FormSteps>(1);
  const initialFormData = useMemo(() => getRecipientStepInitialFormData(type), [type]);

  const { data: receiveCountries = [], isLoading: receiveCountriesLoading } =
    useGetReceiveCountries();

  const { mutate: addRecipientMutate, isLoading: addRecipientLoading } = useAddRecipient({
    onSuccess: (data) => {
      handleCloseModal();
      refetchRecipients();
      onSuccess(data);
    }
  });

  // const validationSchema = () => recipientStepValidationSchema(currentStep);

  const {
    currentStep,
    handleCloseModal,
    handleResetEnteredSteps,
    handleStepClick,
    handleSubmit,
    handleToggleStep,
    enteredSteps,
    validationSchema,
    isWithoutAccountInfo
  } = useAddRecipientLogic({ addRecipientMutate, handleClose, type });

  return (
    <Dialog2 disableOverlayClick isOpen={isOpen} handleClose={handleCloseModal}>
      <Box
        style={{
          backgroundColor: '#F6F8FA'
        }}
        className="ss-h-max ss-pb-10 ss-min-h-screen">
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
          <Text className="ss-text-neutral-500" variant="h5">
            Add a recipient
          </Text>
          <Button
            onClick={handleCloseModal}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <Form<RecipientFormData>
          validationSchema={validationSchema()}
          initialValues={initialFormData as RecipientFormData}
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
            type={type}
            isWithoutAccountInfo={isWithoutAccountInfo}
          />
        </Form>
      </Box>
    </Dialog2>
  );
};

export default AddRecipientForm;
