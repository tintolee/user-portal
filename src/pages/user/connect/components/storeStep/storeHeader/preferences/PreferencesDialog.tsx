import { Box, Button, ExtraInfo, Form, FormFieldDropdown, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline, Globe2Outline } from '@sendsprint/ui-react/dist/icons';
import { Dialog2 } from '@src/components';
import { ConnectState } from '@src/contexts/connect-context/types';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  state: ConnectState;
  // eslint-disable-next-line no-unused-vars
  handleSetRecipientSelectedCountry: (payload: ClientApi.GiftCountries) => void;
  // eslint-disable-next-line no-unused-vars
  handleSetSenderSelectedCountry: (payload: ClientApi.SendCountry) => void;
  handleClearCart: () => void;
  resetToSendIndexPage: () => void;
}

interface InitialValuesI {
  recipient: string;
  sender: string;
}

const PreferencesDialog = ({
  handleClose,
  isOpen,
  state,
  handleSetRecipientSelectedCountry,
  handleSetSenderSelectedCountry,
  handleClearCart,
  resetToSendIndexPage
}: Props) => {
  const [initialValues, setInitialValues] = useState<InitialValuesI>({
    recipient: '',
    sender: ''
  });

  useEffect(() => {
    if (state.sender.selectedCountry) {
      setInitialValues((prev) => ({
        ...prev,
        sender: state.sender.selectedCountry?.initials || ''
      }));
    }
  }, [state.sender.selectedCountry]);

  useEffect(() => {
    if (state.recipient.selectedCountry) {
      setInitialValues((prev) => ({
        ...prev,
        recipient: state.recipient.selectedCountry?.Initials || ''
      }));
    }
  }, [state.recipient.selectedCountry]);

  const handleSubmit = (values: InitialValuesI) => {
    const filteredRecipientCountry = state.recipient.countryList.find(
      (country) => country.Initials === values.recipient
    );
    const filteredSenderCountry = state.sender.countryList.find(
      (country) => country.initials === values.sender
    );

    if (
      filteredRecipientCountry &&
      filteredRecipientCountry.Initials !== state.recipient.selectedCountry?.Initials
    ) {
      handleClearCart();
      handleSetRecipientSelectedCountry(filteredRecipientCountry);
      resetToSendIndexPage();
    }

    if (filteredSenderCountry) {
      handleSetSenderSelectedCountry(filteredSenderCountry);
    }

    handleClose();
  };

  return (
    <Dialog2 handleClose={handleClose} isOpen={isOpen}>
      <Box className="ss-h-full ss-flex ss-flex-col">
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
          <Text className="ss-text-neutral-500" variant="h5">
            Preferences
          </Text>
          <Button
            onClick={handleClose}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <Box className="ss-flex-1">
          <Form<InitialValuesI>
            enableReinitialize
            onSubmit={handleSubmit}
            initialValues={initialValues}>
            <Box className="ss-space-y-5 ss-bg-white ss-p-4 ss-rounded-lg ss-mb-10">
              <Box>
                <FormFieldDropdown
                  data={state.recipient.countryList}
                  optionLabel="Name"
                  icon={Globe2Outline}
                  emptyOptionLabel=""
                  name="recipient"
                  optionValue="Initials"
                  label="Recipient's country"
                  optionIcon="Initials"
                />
                <ExtraInfo
                  variant="warning"
                  extraInfo="Changing the recipient’s country will clear the gifts you currently have in your cart."
                />
              </Box>
              <FormFieldDropdown
                data={state.sender.countryList}
                optionLabel="name"
                icon={Globe2Outline}
                emptyOptionLabel=""
                name="sender"
                optionValue="initials"
                label="Your currency"
                optionIcon="initials"
              />
            </Box>
            <Box className="ss-space-y-5">
              <Button label="Save" type="submit" isBlock />
              <Button onClick={handleClose} label="Cancel" variant="secondary" isBlock />
            </Box>
          </Form>
        </Box>
      </Box>
    </Dialog2>
  );
};

export default PreferencesDialog;
