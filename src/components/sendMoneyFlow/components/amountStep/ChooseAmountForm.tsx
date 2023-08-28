import { Form, FormProps } from '@sendsprint/ui-react';
import { useAccount, useDashboardContext } from '@src/contexts';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import { ChooseAmountFormData } from '.';
import { State } from '../../state/types';
import ChooseAmountFormInner from './ChooseAmountFormInner';
import { amountStepValidationSchema, getAmountStepInitialFormData } from '../../utils';
import { TrackTyping } from '@src/components';
import { mixpanelEvents } from '@src/types/mixpanel';
import { useSearchParams } from 'react-router-dom';

export type ChooseAmountFormProps = {
  formData?: ChooseAmountFormData;
  prefillFormData?: State['prefillForm'];
  sendCountries: ClientApi.SendCountry[];
  receiveCountries: ClientApi.ReceiveCountry[];
  onSubmit: FormProps<ChooseAmountFormData>['onSubmit'];
  /**
   * When we want to notify parent components of a form value change but can't use React Events. Think custom field components
   */
  onChange: () => void;
  areCountriesLoading: boolean;
  isCountryError: boolean;
  state: State;
};

const ChooseAmountForm = ({
  formData,
  prefillFormData = {},
  onSubmit,
  onChange,
  sendCountries = [],
  receiveCountries = [],
  areCountriesLoading,
  isCountryError,
  state
}: ChooseAmountFormProps) => {
  const [recipientFromQuery, setRecipientFromQuery] = useState<ClientApi.Recipient>();

  const [searchParams] = useSearchParams();
  const { userAddress } = useAccount();
  const { sendToRecipient, sendFromWebsite } = prefillFormData;
  const { isUserVerified } = useDashboardContext();

  useEffect(() => {
    let recipientFromQuery: ClientApi.Recipient | string = searchParams.get('recipientData') || '';

    if (recipientFromQuery) {
      recipientFromQuery = JSON.parse(recipientFromQuery) as ClientApi.Recipient;
      setRecipientFromQuery(recipientFromQuery);
    }
  }, []);

  const validationSchema = amountStepValidationSchema(isUserVerified);

  const getInitialFormData = () =>
    getAmountStepInitialFormData({
      receiveCountries,
      sendCountries,
      sendFromWebsite,
      sendToRecipient,
      userAddress,
      isUserVerified,
      recipientFromQuery
    });

  return (
    <Form
      initialValues={formData || (getInitialFormData() as ChooseAmountFormData)}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={validationSchema}>
      <TrackTyping event={mixpanelEvents.AmountFormFilling} />
      <ChooseAmountFormInner
        onChange={onChange}
        areCountriesLoading={areCountriesLoading}
        isCountryError={isCountryError}
        receiveCountries={receiveCountries}
        sendCountries={sendCountries}
        state={state}
      />
    </Form>
  );
};

export default ChooseAmountForm;
