/* eslint-disable no-unused-vars */
import ClientApi from '@src/types/client';

export enum ConnectDispatchType {
  SetGiftCategories = 'SetGiftCategories',
  SetSelectedCategory = 'SetSelectedCategory',
  SetSenderSelectedCountry = 'SetSenderSelectedCountry',
  SetSenderCountryList = 'SetSenderCountryList',
  SetRecipientSelectedCountry = 'SetRecipientSelectedCountry',
  SetRecipientCountryList = 'SetRecipientCountryList',
  SetProducts = 'SetProducts',
  SetDisplayedProducts = 'SetDisplayedProducts',
  SetRate = 'SetRate',
  AddToCart = 'AddToCart',
  SetCartItems = 'SetCartItems',
  ResetFilters = 'ResetFilters',
  DeleteCartItem = 'DeleteCartItem',
  UpdateCartItemQuantity = 'UpdateCartItemQuantity',
  SetTotalCartAmount = 'SetTotalCartAmount',
  ClearCart = 'ClearCart'
}

export type ConnectDispatchAction =
  | SetGiftCategoriesAction
  | SetSelectedCategoriesAction
  | SetSenderSelectedCountryAction
  | SetSenderCountryListAction
  | SetRecipientSelectedCountryAction
  | SetRecipientCountryListAction
  | SetProductsAction
  | SetRateAction
  | SetDisplayedProductsAction
  | AddToCartAction
  | SetCartItemsAction
  | ResetFiltersAction
  | DeleteCartItemAction
  | UpdateCartItemQuantityAction
  | SetTotalCartAmountAction
  | ClearCartAction;

interface SetGiftCategoriesAction {
  type: ConnectDispatchType.SetGiftCategories;
  payload: ClientApi.GiftCategories[];
}

interface SetSelectedCategoriesAction {
  type: ConnectDispatchType.SetSelectedCategory;
  payload: ClientApi.GiftCategories | undefined;
}

interface SetSenderSelectedCountryAction {
  type: ConnectDispatchType.SetSenderSelectedCountry;
  payload: ClientApi.SendCountry;
}

interface SetSenderCountryListAction {
  type: ConnectDispatchType.SetSenderCountryList;
  payload: ClientApi.SendCountry[];
}

interface SetRecipientSelectedCountryAction {
  type: ConnectDispatchType.SetRecipientSelectedCountry;
  payload: ClientApi.GiftCountries;
}

interface SetRecipientCountryListAction {
  type: ConnectDispatchType.SetRecipientCountryList;
  payload: ClientApi.GiftCountries[];
}

interface SetProductsAction {
  type: ConnectDispatchType.SetProducts;
  payload: ClientApi.GiftMerchants[];
}

interface SetDisplayedProductsAction {
  type: ConnectDispatchType.SetDisplayedProducts;
  payload: ClientApi.GiftMerchants[];
}

interface SetRateAction {
  type: ConnectDispatchType.SetRate;
  payload: ClientApi.RateType;
}

interface AddToCartAction {
  type: ConnectDispatchType.AddToCart;
  payload: ClientApi.CartI;
}

interface SetCartItemsAction {
  type: ConnectDispatchType.SetCartItems;
  payload: ClientApi.CartI[];
}

interface ResetFiltersAction {
  type: ConnectDispatchType.ResetFilters;
  payload: undefined;
}

interface DeleteCartItemAction {
  type: ConnectDispatchType.DeleteCartItem;
  payload: ClientApi.CartI;
}

export interface UpdateCartItemQuantityPayload {
  // product: ClientApi.CartI;
  variant: 'increase' | 'decrease';
  id: number;
  amount: number;
  quantity: number;
}

interface UpdateCartItemQuantityAction {
  type: ConnectDispatchType.UpdateCartItemQuantity;
  payload: UpdateCartItemQuantityPayload;
}

interface SetTotalCartAmountAction {
  type: ConnectDispatchType.SetTotalCartAmount;
  payload: undefined;
}

interface ClearCartAction {
  type: ConnectDispatchType.ClearCart;
  payload: undefined;
}

export interface ConnectState {
  categories: {
    categoryList: ClientApi.GiftCategories[];
    selectedCategory: ClientApi.GiftCategories | undefined;
  };
  sender: {
    selectedCountry: ClientApi.SendCountry | undefined;
    countryList: ClientApi.SendCountry[];
  };
  recipient: {
    selectedCountry: ClientApi.GiftCountries | undefined;
    countryList: ClientApi.GiftCountries[];
  };
  products: {
    productList: ClientApi.GiftMerchants[];
    displayedProducts: ClientApi.GiftMerchants[];
  };
  rate: ClientApi.RateType | undefined;
  cart: {
    productList: ClientApi.CartI[];
    totalAmount: number;
    totalAmountPlusFee: number;
  };
}
