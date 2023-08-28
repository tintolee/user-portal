import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { ChooseAmountFormData } from '../../components/amountStep';
import returnFirstValidCountryInitial from './returnFirstValidCountryInitial';

interface SendFromWebsite {
  receiveCountry: Api.Model.CountryInitials;
  sendAmount: number;
  sendCountry: Api.Model.CountryInitials;
}

interface GetAmountStepInitialormDataOptions {
  sendCountries: ClientApi.SendCountry[];
  sendFromWebsite: SendFromWebsite | undefined;
  userAddress: ClientApi.UserAddress | null;
  receiveCountries: ClientApi.ReceiveCountry[];
  sendToRecipient: ClientApi.Recipient | undefined;
  isUserVerified: boolean;
  recipientFromQuery: ClientApi.Recipient | undefined;
}

const getAmountStepInitialFormData = (
  options: GetAmountStepInitialormDataOptions
): ClientApi.InitialFormData<ChooseAmountFormData> => {
  const {
    receiveCountries,
    sendCountries,
    sendFromWebsite,
    sendToRecipient,
    userAddress,
    isUserVerified,
    recipientFromQuery
  } = options;
  /* The country to send from. We choose our value in the following order:
           - the sendCountry from "send from website" flow,
           - the user's country otherwise,
           - the first country on the list of sendCountries,
           - empty string
        */
  const sendCountry =
    returnFirstValidCountryInitial(sendCountries, [
      sendFromWebsite?.sendCountry,
      userAddress?.country,
      sendCountries[0]?.initials
    ]) || '';

  /* The country to receive in. We choose our value in the following order:
           - the receiveCountry from "send from website" flow,
           - the recipient country in "send to recipient" flow,
           - Nigeria
           - the first country on the list of receiveCountries
         */
  const receiveCountry =
    returnFirstValidCountryInitial(receiveCountries, [
      recipientFromQuery?.country,
      sendFromWebsite?.receiveCountry,
      sendToRecipient?.country,
      Api.Model.CountryInitials.Nigeria,
      receiveCountries[0]?.initials
    ]) || '';

  const sendCurrency = sendCountries.find((c) => c.initials === sendCountry)?.currency || '';

  const receiveCurrency =
    receiveCountries.find((c) => c.initials === receiveCountry)?.currency || '';

  return {
    sendAmount: sendFromWebsite?.sendAmount || (isUserVerified ? 100 : 50),
    sendCountry,
    sendCurrency,
    receiveAmount: '',
    receiveCountry,
    receiveCurrency,
    recipientType: recipientFromQuery?.type || sendToRecipient?.type || '',
    rate: '',
    totalAmount: '',
    recentlyChangedProp: 'sendAmount' // to trigger the update to receiveAmount field when mounted
  };
};

export default getAmountStepInitialFormData;
