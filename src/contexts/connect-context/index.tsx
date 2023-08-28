/* eslint-disable no-unused-vars */
import { CART_STORAGE_KEY } from '@src/constants';
import ClientApi from '@src/types/client';
import { isUndefined } from '@src/utils/type';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { useToasts } from '../toast-context';
import { reducer } from './reducer';
import { ConnectDispatchType, ConnectState, UpdateCartItemQuantityPayload } from './types';

interface ConnectContextI {
  state: ConnectState;
  handleSetGiftCategories: (payload: ClientApi.GiftCategories[]) => void;
  handleSetSenderSelectedCountry: (payload: ClientApi.SendCountry) => void;
  handleSetSenderCountryList: (payload: ClientApi.SendCountry[]) => void;
  handleSetRecipientSelectedCountry: (payload: ClientApi.GiftCountries) => void;
  handleSetRecipientCountryList: (payload: ClientApi.GiftCountries[]) => void;
  handleSetSelectedCategories: (payload: ClientApi.GiftCategories | undefined) => void;
  handleSetProducts: (payload: ClientApi.GiftMerchants[]) => void;
  handleSetDisplayedProducts: (payload: ClientApi.GiftMerchants[]) => void;
  handleSetRate: (payload: ClientApi.RateType) => void;
  handleAddToCart: (payload: ClientApi.CartI) => void;
  handleSetCartItems: (payload: ClientApi.CartI[]) => void;
  handleResetFilters: () => void;
  handleDeleteCartItem: (payload: ClientApi.CartI) => void;
  handleUpdateCartItemQuantity: (payload: UpdateCartItemQuantityPayload) => void;
  handleSetTotalAmount: () => void;
  handleClearCart: () => void;
}

interface ConnectProviderProps {
  children?: ReactNode;
}

const ConnectContext = createContext<ConnectContextI | undefined>(undefined);

const stateFromCartStorage = localStorage.getItem(CART_STORAGE_KEY);
const initialState: ConnectState = stateFromCartStorage
  ? JSON.parse(stateFromCartStorage)
  : {
      categories: {
        categoryList: [],
        selectedCategory: undefined
      },
      recipient: {
        countryList: [],
        selectedCountry: undefined
      },
      sender: {
        countryList: [],
        selectedCountry: undefined
      },
      products: {
        productList: [],
        displayedProducts: []
      },
      rate: undefined,
      cart: {
        productList: [],
        totalAmount: 0,
        totalAmountPlusFee: 0
      }
    };

const ConnectProvider = ({ children }: ConnectProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToasts();

  // effect to update the total amount
  useEffect(() => {
    handleSetTotalAmount();
  }, [state.cart.productList, state.rate?.rate]);

  const handleSetGiftCategories = (payload: ClientApi.GiftCategories[]) => {
    dispatch({
      type: ConnectDispatchType.SetGiftCategories,
      payload
    });
  };

  const handleSetSelectedCategories = (payload: ClientApi.GiftCategories | undefined) => {
    dispatch({
      type: ConnectDispatchType.SetSelectedCategory,
      payload
    });
  };

  const handleSetSenderSelectedCountry = (payload: ClientApi.SendCountry) => {
    dispatch({
      type: ConnectDispatchType.SetSenderSelectedCountry,
      payload
    });
  };

  const handleSetSenderCountryList = (payload: ClientApi.SendCountry[]) => {
    dispatch({
      type: ConnectDispatchType.SetSenderCountryList,
      payload
    });
  };

  const handleSetRecipientSelectedCountry = (payload: ClientApi.GiftCountries) => {
    dispatch({
      type: ConnectDispatchType.SetRecipientSelectedCountry,
      payload
    });
  };

  const handleSetRecipientCountryList = (payload: ClientApi.GiftCountries[]) => {
    dispatch({
      type: ConnectDispatchType.SetRecipientCountryList,
      payload
    });
  };

  const handleSetDisplayedProducts = (payload: ClientApi.GiftMerchants[]) => {
    dispatch({
      type: ConnectDispatchType.SetDisplayedProducts,
      payload
    });
  };

  const handleSetProducts = (payload: ClientApi.GiftMerchants[]) => {
    dispatch({
      type: ConnectDispatchType.SetProducts,
      payload
    });
  };

  const handleSetRate = (payload: ClientApi.RateType) => {
    dispatch({
      type: ConnectDispatchType.SetRate,
      payload
    });
  };

  const handleAddToCart = (payload: ClientApi.CartI) => {
    dispatch({
      type: ConnectDispatchType.AddToCart,
      payload
    });

    toast.addToast({
      title: 'Item Added',
      body: `${payload.Name} added to cart`
    });
  };

  const handleSetCartItems = (payload: ClientApi.CartI[]) => {
    dispatch({
      type: ConnectDispatchType.SetCartItems,
      payload
    });
  };

  const handleResetFilters = () => {
    dispatch({
      type: ConnectDispatchType.ResetFilters,
      payload: undefined
    });
  };

  const handleDeleteCartItem = (payload: ClientApi.CartI) => {
    dispatch({
      type: ConnectDispatchType.DeleteCartItem,
      payload
    });

    toast.addToast({
      title: 'Item Removed',
      body: `${payload.Name} removed to cart`
    });
  };

  const handleUpdateCartItemQuantity = (payload: UpdateCartItemQuantityPayload) => {
    dispatch({
      type: ConnectDispatchType.UpdateCartItemQuantity,
      payload
    });
  };

  const handleSetTotalAmount = () => {
    dispatch({
      type: ConnectDispatchType.SetTotalCartAmount,
      payload: undefined
    });
  };

  const handleClearCart = () => {
    dispatch({
      type: ConnectDispatchType.ClearCart,
      payload: undefined
    });
  };

  const value: ConnectContextI = {
    handleSetGiftCategories,
    state,
    handleSetRecipientCountryList,
    handleSetRecipientSelectedCountry,
    handleSetSenderCountryList,
    handleSetSenderSelectedCountry,
    handleSetSelectedCategories,
    handleSetProducts,
    handleSetDisplayedProducts,
    handleSetRate,
    handleResetFilters,
    handleAddToCart,
    handleSetCartItems,
    handleDeleteCartItem,
    handleUpdateCartItemQuantity,
    handleSetTotalAmount,
    handleClearCart
  };
  return <ConnectContext.Provider value={value}>{children}</ConnectContext.Provider>;
};

export const useConnect = () => {
  const context = useContext(ConnectContext);
  if (isUndefined(context)) {
    throw new Error(`useConnect must be used within a ConnectProvider`);
  }
  return context;
};

export default ConnectProvider;
