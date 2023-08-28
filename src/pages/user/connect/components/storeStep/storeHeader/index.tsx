/* eslint-disable no-unused-vars */
import { Box, Button, Text } from '@sendsprint/ui-react';
import { SearchInput } from '@src/components';
import { ConnectState } from '@src/contexts/connect-context/types';
import ClientApi from '@src/types/client';
import React from 'react';
import { StoreStepData } from '..';
import CartButton from './cartButton';
import Preferences from './preferences';
import StoreFilters from './storeFilters';

interface Props {
  state: ConnectState;
  sendersCountriesLoading: boolean;
  recipientsCountriesLoading: boolean;
  handleSetSelectedCategories: (payload: ClientApi.GiftCategories | undefined) => void;
  handleSetRecipientSelectedCountry: (payload: ClientApi.GiftCountries) => void;
  handleSetSenderSelectedCountry: (payload: ClientApi.SendCountry) => void;
  handleResetFilters: () => void;
  handleClearCart: () => void;
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  storeSuccessHandler: (storeFormData: StoreStepData) => void;
  resetToSendIndexPage: () => void;
  isConnectDataLoading: boolean;
}

const StoreHeader = ({
  state,
  handleSetRecipientSelectedCountry,
  handleSetSenderSelectedCountry,
  recipientsCountriesLoading,
  sendersCountriesLoading,
  handleSetSelectedCategories,
  handleResetFilters,
  handleClearCart,
  search,
  handleChange,
  storeSuccessHandler,
  resetToSendIndexPage,
  isConnectDataLoading
}: Props) => {
  const giftLength = state.products.displayedProducts.length;
  return (
    <Box className="ss-relative">
      {isConnectDataLoading && (
        <Box className="ss-absolute ss-top-0 ss-left-0 ss-right-0 ss-bottom-0 ss-bg-white ss-opacity-70 ss-z-10" />
      )}
      <Box className="ss-space-y-4 md:ss-space-y-10 ss-mb-10">
        <Box className="ss-flex ss-items-center ss-gap-5">
          <Box className="ss-flex-1">
            <SearchInput
              placeholder="What are you looking for?"
              handleChange={handleChange}
              value={search}
            />
          </Box>
          <Box className="ss-hidden md:ss-block">
            <Preferences
              handleSetSenderSelectedCountry={handleSetSenderSelectedCountry}
              handleSetRecipientSelectedCountry={handleSetRecipientSelectedCountry}
              state={state}
              handleClearCart={handleClearCart}
              sendersCountriesLoading={sendersCountriesLoading}
              recipientsCountriesLoading={recipientsCountriesLoading}
              resetToSendIndexPage={resetToSendIndexPage}
            />
          </Box>
          <CartButton storeSuccessHandler={storeSuccessHandler} />
        </Box>
        <Box className="ss-flex lg:ss-items-center ss-gap-3 ss-flex-col lg:ss-flex-row ss-justify-between">
          <Box className="ss-block md:ss-hidden">
            <Preferences
              handleSetSenderSelectedCountry={handleSetSenderSelectedCountry}
              handleSetRecipientSelectedCountry={handleSetRecipientSelectedCountry}
              state={state}
              handleClearCart={handleClearCart}
              sendersCountriesLoading={sendersCountriesLoading}
              recipientsCountriesLoading={recipientsCountriesLoading}
              resetToSendIndexPage={resetToSendIndexPage}
            />
          </Box>
          <StoreFilters handleSetSelectedCategories={handleSetSelectedCategories} state={state} />
          <Box className="ss-flex ss-items-center ss-gap-3">
            <Text>
              {giftLength} Gift{giftLength > 1 && 's'} found
            </Text>
            <Button onClick={handleResetFilters} label="Reset" variant="secondary" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreHeader;
