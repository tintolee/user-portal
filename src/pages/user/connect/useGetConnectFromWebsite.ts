import { useConnect } from '@src/contexts';
import ClientApi from '@src/types/client';
import { useEffect } from 'react';
import useGetSendMoneyDetailsFromWebsite from '../../auth/register/hooks/useGetSendMoneyDetailsFromWebsite';
import { StoreStepData } from './components/storeStep';

interface UseGetConnectFromWebsiteOptions {
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  storeSuccessHandler: (storeFormData: StoreStepData) => void;
}

const useGetConnectFromWebsite = ({
  isLoading,
  storeSuccessHandler
}: UseGetConnectFromWebsiteOptions) => {
  const {
    cartFromQuery,
    connectQuery,
    recipientCurrency,
    senderCurrency,
    rateFromQuery,
    totalAmountFromQuery,
    totalAmountPlusFeeFromQuery
  } = useGetSendMoneyDetailsFromWebsite();

  const {
    state,
    handleSetRecipientSelectedCountry,
    handleSetSenderSelectedCountry,
    handleSetCartItems
  } = useConnect();

  // Try to make a loader that shows on the screen when the connect details are empty and loading
  // after that, call the success handler for store step and move it to the next step

  useEffect(() => {
    if (connectQuery) {
      if (!isLoading && cartFromQuery && recipientCurrency && senderCurrency) {
        const filteredRecipient = state.recipient.countryList.find(
          (recipient) => recipient.Currency === recipientCurrency
        );

        const filteredSender = state.sender.countryList.find(
          (sender) => sender.currency === senderCurrency
        );

        const parsedCart = JSON.parse(JSON.parse(cartFromQuery)) as {
          amount: number;
          id: number;
          quantity: number;
        }[];

        const cartItems: ClientApi.CartI[] = [];

        parsedCart.forEach((item) => {
          const filtered = state.products.displayedProducts.find(
            (product) => product.Id === item.id
          );

          if (filtered) {
            const cartItem: ClientApi.CartI = {
              ...filtered,
              Amount: item.amount,
              Quantity: item.quantity
            };

            cartItems.push(cartItem);
          }
        });

        if (cartItems.length) {
          handleSetCartItems(cartItems);
        }

        if (filteredRecipient) {
          handleSetRecipientSelectedCountry(filteredRecipient);
        }

        if (filteredSender) {
          handleSetSenderSelectedCountry(filteredSender);
        }

        const convertedTotalAmount = isNaN(Number(totalAmountFromQuery))
          ? 0
          : Number(totalAmountFromQuery);
        const convertedTotalAmountWithFee = isNaN(Number(totalAmountPlusFeeFromQuery))
          ? 0
          : Number(totalAmountPlusFeeFromQuery);

        const parsedRateFromWebsite = rateFromQuery
          ? (JSON.parse(rateFromQuery) as ClientApi.RateType)
          : null;

        const obj: Partial<StoreStepData> = {
          recipient: filteredRecipient,
          sender: filteredSender,
          fee: state.rate?.fee || parsedRateFromWebsite?.fee,
          totalAmount: state.cart.totalAmount || convertedTotalAmount,
          totalAmountPlusFee: state.cart.totalAmountPlusFee || convertedTotalAmountWithFee,
          cart: cartItems
        };

        if (obj?.cart?.length) {
          storeSuccessHandler(obj as StoreStepData);
        }
      }
    }
  }, [
    isLoading,
    connectQuery,
    state.rate,
    state.products.productList,
    state.recipient.countryList,
    state.sender.countryList
  ]);

  return { isLoading: connectQuery ? isLoading : false };
};

export default useGetConnectFromWebsite;
