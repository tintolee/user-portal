import { RequestConfig } from '@src/config/axiosConfig';

/** Time durations in milliseconds */
export const DURATION_2_SEC = 2 * 1000;
export const DURATION_5_SEC = 5 * 1000;
export const DURATION_10_SEC = 10 * 1000;
export const DURATION_1_MIN = 60 * 1000;
export const DURATION_5_MIN = 5 * 60 * 1000;
export const DURATION_10_MIN = 10 * 60 * 1000;
export const DURATION_1_HR = 60 * 60 * 1000;

/** Config to disable API error toasts */
export const CONFIG_NO_ERROR_TOAST: RequestConfig = {
  showToastOnError: false
};

/** countdown timer for OTP */
export const RESEND_OTP_COUNTDOWN_TIME = 120;

/** used for campaigns */
export const CAMPAIGN_ID_STORE_NAME = 'campaign_id';
export const CAMPAIGN_ID_QUERY_KEY = 'c';

/** used to check if checkout is part of query passed down from the other website */
export const CHECKOUT_QUERY = 'checkout';

/**Send money max amount */
export const MAXIMUM_AMOUNT_TO_SEND = 2000;

/**The key used to store connect info in localstorage */
export const CART_STORAGE_KEY = 'connect';
