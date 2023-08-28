import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { RecipientFormData } from '../../components/recipientStep/addRecipientForm';
import { State } from '../../state';

const getRecipientStepInitialFormData = (
  state: State
): ClientApi.InitialFormData<RecipientFormData> => {
  return {
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
    paymentType: Api.Model.PaymentType.GiftCard,
    country: state.storeFormData?.recipient?.Initials || '',
    city: ''
  };
};

export default getRecipientStepInitialFormData;
