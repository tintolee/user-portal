import { CART_STORAGE_KEY } from '@src/constants';
import { getMonetaryValue } from '@src/utils/currency';
import { ConnectDispatchAction, ConnectDispatchType, ConnectState } from './types';

// eslint-disable-next-line no-unused-vars
type StateReducer = (s: ConnectState, a: ConnectDispatchAction) => ConnectState;

export const reducer: StateReducer = (state, dispatch) => {
  const { payload, type } = dispatch;
  let newState: ConnectState;

  switch (type) {
    case ConnectDispatchType.SetGiftCategories:
      newState = {
        ...state,
        categories: {
          ...state.categories,
          categoryList: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetSelectedCategory:
      newState = {
        ...state,
        categories: {
          ...state.categories,
          selectedCategory: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetSenderSelectedCountry:
      newState = {
        ...state,
        sender: {
          ...state.sender,
          selectedCountry: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetSenderCountryList:
      newState = {
        ...state,
        sender: {
          ...state.sender,
          countryList: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetRecipientSelectedCountry:
      newState = {
        ...state,
        recipient: {
          ...state.recipient,
          selectedCountry: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetRecipientCountryList:
      newState = {
        ...state,
        recipient: {
          ...state.recipient,
          countryList: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetProducts:
      newState = {
        ...state,
        products: {
          ...state.products,
          productList: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetDisplayedProducts:
      newState = {
        ...state,
        products: {
          ...state.products,
          displayedProducts: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetRate:
      newState = {
        ...state,
        rate: payload
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.AddToCart:
      // eslint-disable-next-line no-case-declarations
      const filteredCart = state.cart.productList.filter(
        (item) => item.Id === payload.Id && item.Amount === payload.Amount
      );

      if (!filteredCart.length) {
        newState = {
          ...state,
          cart: {
            ...state.cart,
            productList: state?.cart?.productList ? [...state.cart.productList, payload] : [payload]
          }
        };
      } else {
        const filteredIndex = state.cart.productList.findIndex(
          (item) => item.Id === payload.Id && item.Amount === payload.Amount
        );

        const copied = [...state.cart.productList];
        copied.splice(filteredIndex, 1, payload);

        newState = {
          ...state,
          cart: {
            ...state.cart,
            productList: copied
          }
        };
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetCartItems:
      newState = {
        ...state,
        cart: {
          ...state.cart,
          productList: payload
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.ResetFilters:
      newState = {
        ...state,
        categories: {
          ...state.categories,
          selectedCategory: {
            Category: 'All'
          }
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.DeleteCartItem:
      // eslint-disable-next-line no-case-declarations
      const filteredIndex = state.cart.productList.findIndex(
        (item) => item.Id === payload.Id && item.Amount === payload.Amount
      );
      // eslint-disable-next-line no-case-declarations
      // const filteredItem = state.cart.productList[filteredIndex];

      // eslint-disable-next-line no-case-declarations
      const copiedCart = [...state.cart.productList];
      if (filteredIndex > -1) {
        copiedCart.splice(filteredIndex, 1);
      }

      newState = {
        ...state,
        cart: {
          ...state.cart,
          productList: copiedCart
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.UpdateCartItemQuantity:
      // eslint-disable-next-line no-case-declarations
      const copiedList = [...state.cart.productList];
      // eslint-disable-next-line no-case-declarations
      const filteredIndex2 = copiedList.findIndex(
        (item) => item.Id === payload.id && item.Amount === payload.amount
      );

      if (filteredIndex2 > -1) {
        const selectedItem = copiedList[filteredIndex2];
        let quantity = payload.quantity;

        // console.log(selectedItem, 'selectedItem');
        if (payload.variant === 'increase') {
          quantity = quantity + 1;
        } else if (payload.variant === 'decrease') {
          quantity = quantity - 1;
        }

        selectedItem.Quantity = quantity;
        copiedList.splice(filteredIndex2, 1, selectedItem);
      }

      newState = {
        ...state,
        cart: {
          ...state.cart,
          productList: copiedList
        }
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.SetTotalCartAmount:
      // eslint-disable-next-line no-case-declarations
      const totalAmount = state.cart.productList.reduce((total, item) => {
        return total + getMonetaryValue(item.Amount / (state.rate?.rate || 1)) * item.Quantity;
      }, 0);

      // eslint-disable-next-line no-case-declarations
      const roundDownTotal = getMonetaryValue(totalAmount);
      // eslint-disable-next-line no-case-declarations
      const totalAmountPlusFee = getMonetaryValue(
        roundDownTotal + getMonetaryValue(state.rate?.fee || 0)
      );

      newState = {
        ...state,
        cart: {
          ...state.cart,
          totalAmount: roundDownTotal,
          totalAmountPlusFee
        }
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    case ConnectDispatchType.ClearCart:
      newState = {
        ...state,
        cart: {
          ...state.cart,
          productList: []
        }
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};
