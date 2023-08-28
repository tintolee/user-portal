import ClientApi from '@src/types/client';
import { getOptionsFromRecipientType } from '@src/utils/recipient-type';
import { RecipientFormData } from '../../components/recipientStep/addRecipientForm';

const getRecipientStepInitialFormData = (
  type: ClientApi.RecipientType
): ClientApi.InitialFormData<RecipientFormData> => {
  return {
    ...getOptionsFromRecipientType(type),
    firstName: '',
    middleName: '',
    lastName: '',
    bankCode: '',
    branchCode: '',
    accountNumber: '',
    accountName: '',
    routingNumber: '',
    address: '',
    email: '',
    phoneNumber: '',
    paymentOperator: '',
    // this should always be true esp for the new recipient page as we want to save details there
    saveDetails: true,
    birthday: '',
    paymentType: type
  };
};

export default getRecipientStepInitialFormData;
