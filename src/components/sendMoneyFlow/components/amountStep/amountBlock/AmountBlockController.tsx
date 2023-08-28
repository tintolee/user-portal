import Api from '@sendsprint/api-types';
import { Box, ExtraInfo, Text } from '@sendsprint/ui-react';
import { CountryAmountGroup } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';

interface Props {
  receiveCountries: ClientApi.ReceiveCountry[];
  sendCountries: ClientApi.SendCountry[];
  receiveCountry: Api.Model.CountryInitials;
}

const AmountBlockController = ({ receiveCountries, sendCountries, receiveCountry }: Props) => {
  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Text className="ss-text-neutral-400 ss-mb-4 ss-font-bold">
        How much do you want to send?
      </Text>
      <div className="ss-space-y-1 ss-bg-neutral-100 ss-border ss-border-neutral-300 ss-rounded">
        <CountryAmountGroup
          label="You send"
          amountName="sendAmount"
          countryName="sendCountry"
          currencyName="sendCurrency"
          countries={sendCountries}
        />
        <Box className="ss-h-0.5 ss-w-full ss-bg-neutral-300" />
        <CountryAmountGroup
          label="They get"
          amountName="receiveAmount"
          countryName="receiveCountry"
          currencyName="receiveCurrency"
          countries={receiveCountries}
        />
        {receiveCountry === Api.Model.CountryInitials.Nigeria && (
          <Box className="ss-px-3 ss-pb-3">
            <ExtraInfo extraInfo="Send USD to your recipient in Nigeria" />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default AmountBlockController;
