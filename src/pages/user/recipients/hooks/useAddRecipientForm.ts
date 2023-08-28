import { useToasts } from '@src/contexts';
import { useAddRecipient, useGetReceiveCountries } from '@src/hooks';
import ClientApi from '@src/types/client';
import { getOptionsFromRecipientType } from '@src/utils/recipient-type';
import { FormikContextType, FormikHelpers } from 'formik';
import { useState } from 'react';
import { AddRecipientFormI, FormSteps } from '../components/addRecipientForm';
import { addRecipientValidationSchema } from '../utils';

interface UseAddRecipientFormOptions {
  handleClose: () => void;
  refetchRecipients: () => void;
}

const useAddRecipientForm = (options: UseAddRecipientFormOptions) => {
  const { handleClose, refetchRecipients } = options;

  const [currentStep, setCurrentStep] = useState<FormSteps>(1);
  const [enteredSteps, setEnteredSteps] = useState<FormSteps[]>([1]);
  const { addToast } = useToasts();

  const { data: receiveCountries = [], isLoading: receiveCountriesLoading } =
    useGetReceiveCountries();

  const {
    mutate: addRecipientMutate,
    isLoading: addRecipientLoading,
    data: recipientAdded
  } = useAddRecipient({
    onSuccess: () => {
      setCurrentStep(4);
      refetchRecipients();
      addToast(
        {
          title: 'Recipient details saved',
          body: 'Your recipient has been saved'
        },
        { appearance: 'success' }
      );
    }
  });

  const handleSubmit = (
    values: AddRecipientFormI,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    formikHelpers: FormikHelpers<AddRecipientFormI>
  ) => {
    const payload: AddRecipientFormI = {
      ...values,
      ...getOptionsFromRecipientType(values.paymentType as ClientApi.RecipientType)
    };

    addRecipientMutate(payload);
  };

  const goToStep = (arg: FormSteps) => {
    setCurrentStep(arg);
    setEnteredSteps((prev) => {
      if (prev.includes(arg)) return prev;

      return [...prev, arg];
    });
  };

  const handleStepClick = (arg: FormSteps) => {
    if (!enteredSteps.includes(arg)) return;

    goToStep(arg);
  };

  const handleResetEnteredSteps = () => setEnteredSteps([1]);

  const handleToggleStep = async (arg: FormSteps, formik?: FormikContextType<unknown>) => {
    if (!formik) {
      goToStep(arg);
    } else {
      try {
        const isValid = await validationSchema.isValid(formik?.values);

        if (isValid) {
          formik.setTouched(
            {
              country: false,
              paymentType: false,
              bankCode: false,
              accountName: false,
              accountNumber: false,
              routingNumber: false,
              firstName: false,
              middleName: false,
              lastName: false,
              birthday: false,
              phoneNumber: false,
              email: false,
              address: false,
              branchCode: false,
              paymentOperator: false
            },
            false
          );
          goToStep(arg);
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  };

  const validationSchema = addRecipientValidationSchema(currentStep);

  const handleCloseModal = () => {
    handleClose();
    setCurrentStep(1);
  };

  return {
    receiveCountries,
    receiveCountriesLoading,
    addRecipientLoading,
    recipientAdded,
    handleCloseModal,
    handleResetEnteredSteps,
    handleToggleStep,
    handleStepClick,
    handleSubmit,
    validationSchema,
    currentStep,
    enteredSteps
  };
};

export default useAddRecipientForm;
