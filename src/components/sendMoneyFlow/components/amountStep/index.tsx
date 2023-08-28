import React from 'react';
import ClientApi from '@src/types/client';
import Api from '@sendsprint/api-types';
import { State } from '../../state/types';
import ChooseAmountForm, { ChooseAmountFormProps } from './ChooseAmountForm';
import { useGetCountries } from '../../hooks';
import { useMixpanelLoadEvent } from '@src/hooks';
import { mixpanelEvents } from '@src/types/mixpanel';
import { Box, Skeleton } from '@sendsprint/ui-react';

export type ChooseAmountFormData = {
  sendAmount: number;
  sendCountry: ClientApi.SendCountry['initials'];
  sendCurrency: Api.Model.CurrencyCode;
  receiveAmount: number;
  receiveCountry: ClientApi.ReceiveCountry['initials'];
  receiveCurrency: Api.Model.CurrencyCode;
  recipientType: ClientApi.RecipientType;
  rate: ClientApi.RateType;
  totalAmount: number;
  /**
   * keeps a record of which amount or currency fields was recently changed.
   * Its used for the binding between the values.
   */
  recentlyChangedProp: null | 'sendAmount' | 'sendCurrency' | 'receiveAmount' | 'receiveCurrency';
};

export type AmountStepProps = {
  formData?: ChooseAmountFormData;
  prefillFormData?: State['prefillForm'];
  onStepIsDirty: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmitSuccess: (value: ChooseAmountFormData) => void;
  state: State;
};

const AmountStep = ({
  onStepIsDirty,
  onSubmitSuccess,
  formData,
  prefillFormData,
  state
}: AmountStepProps) => {
  useMixpanelLoadEvent({
    event: mixpanelEvents.ViewingAmountStep
  });

  const { error, isLoading, receiveCountries, sendCountries } = useGetCountries();

  const formSubmitHandler: ChooseAmountFormProps['onSubmit'] = (values) => {
    onSubmitSuccess(values);
  };

  return (
    <>
      {isLoading && (
        <>
          <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
            <Skeleton className="ss-mb-4 ss-max-w-300 ss-h-5 ss-rounded" />
            <Box className="ss-space-y-1">
              <Skeleton className="ss-rounded ss-h-30" />
              <Skeleton className="ss-rounded ss-h-30" />
            </Box>
          </Box>
          <Box className="ss-bg-white ss-p-3 ss-mt-6">
            <Box className="ss-flex ss-flex-col ss-gap-3">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="ss-h-20 ss-rounded-lg" />
              ))}
            </Box>
          </Box>
        </>
      )}
      {!isLoading && sendCountries && receiveCountries && (
        <ChooseAmountForm
          formData={formData}
          prefillFormData={prefillFormData}
          onSubmit={formSubmitHandler}
          onChange={onStepIsDirty}
          sendCountries={sendCountries}
          receiveCountries={receiveCountries}
          areCountriesLoading={isLoading}
          isCountryError={!!error}
          state={state}
        />
      )}
    </>
  );
};

export default AmountStep;
