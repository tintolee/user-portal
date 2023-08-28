import Api from '@sendsprint/api-types';
import { Box, Button, Flag, Text } from '@sendsprint/ui-react';
import { ConnectState } from '@src/contexts/connect-context/types';
import { useToggle } from '@src/hooks';
import ClientApi from '@src/types/client';
import React from 'react';
import PreferencesDialog from './PreferencesDialog';

interface Props {
  state: ConnectState;
  sendersCountriesLoading: boolean;
  recipientsCountriesLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSetRecipientSelectedCountry: (payload: ClientApi.GiftCountries) => void;
  // eslint-disable-next-line no-unused-vars
  handleSetSenderSelectedCountry: (payload: ClientApi.SendCountry) => void;
  handleClearCart: () => void;
  resetToSendIndexPage: () => void;
}

const Preferences = ({
  state,
  handleSetRecipientSelectedCountry,
  handleSetSenderSelectedCountry,
  recipientsCountriesLoading,
  sendersCountriesLoading,
  handleClearCart,
  resetToSendIndexPage
}: Props) => {
  const { handleFalse: handleClose, handleTrue: handleOpen, state: isOpen } = useToggle();

  const shouldShowBtnLoad =
    (!state.recipient.selectedCountry || !state.sender.selectedCountry) &&
    (sendersCountriesLoading || recipientsCountriesLoading);
  return (
    <Box>
      <Button
        variant="secondary"
        onClick={handleOpen}
        disabled={shouldShowBtnLoad}
        label={
          shouldShowBtnLoad ? (
            'Loading...'
          ) : (
            <Box className="ss-flex ss-items-center ss-gap-2">
              <Flag
                countryInitials={
                  state.recipient.selectedCountry?.Initials as Api.Model.CountryInitials
                }
              />
              <Text>
                {state.recipient.selectedCountry?.Name} | {state.sender.selectedCountry?.currency}
              </Text>
            </Box>
          )
        }
      />
      <PreferencesDialog
        handleSetSenderSelectedCountry={handleSetSenderSelectedCountry}
        handleSetRecipientSelectedCountry={handleSetRecipientSelectedCountry}
        state={state}
        handleClose={handleClose}
        isOpen={isOpen}
        handleClearCart={handleClearCart}
        resetToSendIndexPage={resetToSendIndexPage}
      />
    </Box>
  );
};

export default Preferences;
