import { useState } from 'react';
import Api from '@sendsprint/api-types';
import { AddRecipientFormI } from '@src/pages/user/recipients/components/addRecipientForm';
import ClientApi from '@src/types/client';
import { getOptionsFromRecipientType } from '@src/utils/recipient-type';
import { AxiosError } from 'axios';
import { FormikContextType, FormikHelpers } from 'formik';
import { UseMutateFunction } from 'react-query';
import { FormSteps, RecipientFormData } from '../../components/recipientStep/addRecipientForm';
import { recipientStepValidationSchema } from '../../utils/recipientStep';

interface UseAddRecipientLogicOptions {
  addRecipientMutate: UseMutateFunction<
    ClientApi.Recipient | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosError<Api.Endpoint.Response.ErrorResponse, any>,
    AddRecipientFormI,
    unknown
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // validationSchema: any;
  handleClose: () => void;
  type: ClientApi.RecipientType;
  variant?: 'connect';
  // setCurrentStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

const paymentTypesWithoutAccountInfo = ['KE-MOBILE'];

const useAddRecipientLogic = (options: UseAddRecipientLogicOptions) => {
  const { addRecipientMutate, handleClose, type } = options;

  const isWithoutAccountInfo = paymentTypesWithoutAccountInfo.includes(type);

  const [currentStep, setCurrentStep] = useState<FormSteps>(isWithoutAccountInfo ? 2 : 1);
  const [enteredSteps, setEnteredSteps] = useState<FormSteps[]>(isWithoutAccountInfo ? [2] : [1]);

  const handleSubmit = (
    values: RecipientFormData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    formikHelpers: FormikHelpers<RecipientFormData>
  ) => {
    const payload: RecipientFormData = {
      ...values,
      ...getOptionsFromRecipientType(values.paymentType as ClientApi.RecipientType)
    };

    addRecipientMutate(payload);
  };

  const handleSubmitConnect = (
    values: RecipientFormData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    formikHelpers: FormikHelpers<RecipientFormData>
  ) => {
    const payload: RecipientFormData = {
      ...values,
      paymentType: Api.Model.PaymentType.GiftCard
      // ...getOptionsFromRecipientType(values.paymentType as ClientApi.RecipientType)
    };

    addRecipientMutate(payload);
  };

  const validationSchema = () => recipientStepValidationSchema(currentStep);

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
        const isValid = await validationSchema().isValid(formik?.values);

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

  const handleCloseModal = () => {
    handleClose();
    setCurrentStep(1);
  };

  return {
    currentStep,
    handleSubmit,
    handleStepClick,
    handleResetEnteredSteps,
    handleToggleStep,
    handleCloseModal,
    enteredSteps,
    validationSchema,
    isWithoutAccountInfo,
    handleSubmitConnect
  };
};

export default useAddRecipientLogic;
