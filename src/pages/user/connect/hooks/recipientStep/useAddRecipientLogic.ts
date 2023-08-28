import Api from '@sendsprint/api-types';
import { AddRecipientFormI } from '@src/pages/user/recipients/components/addRecipientForm';
import ClientApi from '@src/types/client';
import { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { UseMutateFunction } from 'react-query';
import { RecipientFormData } from '../../components/recipientStep/addRecipientForm';
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
  // setCurrentStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const paymentTypesWithoutAccountInfo = ['KE-MOBILE'];

const useAddRecipientLogic = (options: UseAddRecipientLogicOptions) => {
  const { addRecipientMutate, handleClose } = options;

  const handleSubmit = (
    values: RecipientFormData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    formikHelpers: FormikHelpers<RecipientFormData>
  ) => {
    const payload: RecipientFormData = {
      ...values
    };

    addRecipientMutate(payload);
  };

  const validationSchema = () => recipientStepValidationSchema();

  const handleCloseModal = () => {
    handleClose();
  };

  return {
    handleSubmit,
    handleCloseModal,
    validationSchema
  };
};

export default useAddRecipientLogic;
