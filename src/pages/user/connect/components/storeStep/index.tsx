import { Box } from '@sendsprint/ui-react';
import { useAccount, useConnect } from '@src/contexts';
import { useCheckRateSprint, useGetSendCountries } from '@src/hooks';
import {
  useLoadGiftCategoriesByCountry,
  useLoadGiftCountries,
  useLoadGiftMerchants
} from '@src/hooks/queries/connect';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGetConnectFromWebsite from '../../useGetConnectFromWebsite';
import ProductList from './productList';
import StoreHeader from './storeHeader';

export interface StoreStepData {
  cart: ClientApi.CartI[] | undefined;
  totalAmount: number;
  totalAmountPlusFee: number;
  fee: number;
  sender: ClientApi.SendCountry | undefined;
  recipient: ClientApi.GiftCountries | undefined;
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  storeSuccessHandler: (storeFormData: StoreStepData) => void;
  formData: StoreStepData | undefined;
  resetToSendIndexPage: () => void;
  markPageAsClean: () => void;
}

const StoreStep = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  formData,
  storeSuccessHandler,
  resetToSendIndexPage,
  markPageAsClean
}: Props) => {
  const {
    state,
    handleSetSenderSelectedCountry,
    handleSetRecipientSelectedCountry,
    handleSetSenderCountryList,
    handleSetRecipientCountryList,
    handleSetGiftCategories,
    handleSetSelectedCategories,
    handleSetRate,
    handleResetFilters,
    handleClearCart,
    handleSetProducts
  } = useConnect();
  const { isLoggedIn } = useAccount();
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();

  // this comes from the transaction details send a gift btn
  const recipientFromQuery = searchParams.get('recipientData');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (recipientFromQuery && state.recipient.countryList) {
      const parsedRecipient = JSON.parse(recipientFromQuery) as ClientApi.Recipient;
      const filteredRecipientCountry = state.recipient.countryList.find(
        (country) => country.Initials === parsedRecipient.country
      );

      if (filteredRecipientCountry) {
        handleSetRecipientSelectedCountry(filteredRecipientCountry);
      }
    }
  }, [recipientFromQuery, state.recipient.countryList]);

  const { isLoading: rateLoading } = useCheckRateSprint(
    {
      receiveCurrency: state.recipient.selectedCountry?.Currency || '',
      sendCurrency: state.sender.selectedCountry?.currency || ''
    },
    {
      enabled:
        !!state.recipient.selectedCountry?.Currency && !!state.sender.selectedCountry?.currency,
      onSuccess: (data) => {
        if (data) {
          handleSetRate(data);
        }
      },
      staleTime: 0
    }
  );

  const { isLoading: sendersCountriesLoading } = useGetSendCountries({
    onSuccess: (data) => {
      if (data) {
        handleSetSenderCountryList(data);
        if (!state.sender.selectedCountry) {
          handleSetSenderSelectedCountry(data[0]);
        }
      }
    }
  });

  const { isLoading: recipientsCountriesLoading } = useLoadGiftCountries({
    onSuccess: (data) => {
      if (data) {
        handleSetRecipientCountryList(data);
        if (!state.recipient.selectedCountry && !recipientFromQuery) {
          handleSetRecipientSelectedCountry(data[0]);
        }
      }
    }
  });

  const { isLoading: giftCategoriesLoading } = useLoadGiftCategoriesByCountry(
    {
      country: state.recipient.selectedCountry?.Initials || ''
    },
    {
      onSuccess: (data) => {
        const allCategory = {
          Category: 'All'
        };

        if (data) {
          handleSetGiftCategories([allCategory, ...data]);
        } else {
          handleSetGiftCategories([allCategory]);
        }
      },
      staleTime: 0,
      enabled: isLoggedIn && !!state.recipient.selectedCountry?.Initials
    }
  );

  const { isLoading: isMerchantLoading } = useLoadGiftMerchants({
    onSuccess: (data) => {
      if (data) {
        handleSetProducts(data);
      }
    }
  });

  const isConnectDataLoading =
    sendersCountriesLoading ||
    recipientsCountriesLoading ||
    rateLoading ||
    giftCategoriesLoading ||
    isMerchantLoading;

  const { isLoading } = useGetConnectFromWebsite({
    isLoading: isConnectDataLoading,
    storeSuccessHandler
  });

  const isRecipientFromQueryLoading = !!recipientFromQuery && isConnectDataLoading;

  return (
    <Box>
      <StoreHeader
        handleSetSelectedCategories={handleSetSelectedCategories}
        handleSetSenderSelectedCountry={handleSetSenderSelectedCountry}
        handleSetRecipientSelectedCountry={handleSetRecipientSelectedCountry}
        state={state}
        sendersCountriesLoading={sendersCountriesLoading}
        recipientsCountriesLoading={recipientsCountriesLoading}
        handleResetFilters={handleResetFilters}
        handleClearCart={handleClearCart}
        search={search}
        handleChange={handleChange}
        storeSuccessHandler={storeSuccessHandler}
        resetToSendIndexPage={resetToSendIndexPage}
        isConnectDataLoading={isLoading || isRecipientFromQueryLoading}
      />
      <ProductList
        search={search}
        isConnectDataLoading={isLoading || isRecipientFromQueryLoading}
        markPageAsClean={markPageAsClean}
      />
    </Box>
  );
};

export default StoreStep;
