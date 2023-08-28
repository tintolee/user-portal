import ClientApi from '@src/types/client';
import { getMonetaryValue } from '@src/utils/currency';
import { isNumber } from '@src/utils/type';
import { FormikContextType } from 'formik';
import { useEffect } from 'react';
import { ChooseAmountFormData } from '../../components/amountStep';
import { UseRatesAndPaymentTypesReturnObj } from './useRatesAndPaymentTypes';

type RecentlyChangedProp =
  | 'sendCurrency'
  | 'receiveCurrency'
  | 'sendAmount'
  | 'receiveAmount'
  | null;

interface UseAmountStepFormLogicOptions {
  recentlyChangedProp: RecentlyChangedProp;
  onChange: () => void;
  formik: FormikContextType<ChooseAmountFormData>;
  ratesAndPaymentTypesValues: UseRatesAndPaymentTypesReturnObj;
}

const useAmountStepFormLogic = (options: UseAmountStepFormLogicOptions) => {
  const { recentlyChangedProp, onChange, formik, ratesAndPaymentTypesValues } = options;

  const { values, setFieldValue, validateForm } = formik;

  /** Call the onChange event handler for components not properly bound to the React Event system. */
  useEffect(() => {
    if (recentlyChangedProp === 'sendCurrency' || recentlyChangedProp === 'receiveCurrency') {
      onChange();
    }
  }, [recentlyChangedProp, onChange]);

  // this is used to automatically select the recipientType option for kenya and south africa since it is just one option
  useEffect(() => {
    // if (values.receiveCurrency === "KES") {
    //   values.recipientType = RecipientType.KE_MOBILE;
    // }

    if (values.receiveCurrency === 'ZAR') {
      values.recipientType = ClientApi.RecipientType.ZA_BANK;
    }
  }, [values]);

  /** Data-binding between amount & currency fields */
  useEffect(() => {
    if (!recentlyChangedProp || !ratesAndPaymentTypesValues.rateOnlyData) {
      return;
    }

    switch (recentlyChangedProp) {
      case 'sendAmount':
      case 'receiveCurrency':
        // eslint-disable-next-line no-case-declarations
        const newReceiveAmount = values.sendAmount * ratesAndPaymentTypesValues.rateOnlyData.rate;
        setFieldValue(
          'receiveAmount',
          getMonetaryValue(newReceiveAmount, { strategy: 'floor' }),
          true
        );
        break;
      case 'receiveAmount':
      case 'sendCurrency':
        // eslint-disable-next-line no-case-declarations
        const newSendAmount = values.receiveAmount / ratesAndPaymentTypesValues.rateOnlyData.rate;
        setFieldValue('sendAmount', getMonetaryValue(newSendAmount, { strategy: 'ceil' }), true);
        break;
    }

    setFieldValue('recentlyChangedProp', null);

    // We don't need `sendAmount` and `receiveAmount` dependencies here
  }, [recentlyChangedProp, ratesAndPaymentTypesValues.rateOnlyData, setFieldValue]);

  /** Get the value for totalAmount */
  useEffect(() => {
    if (!ratesAndPaymentTypesValues.rateData || !isNumber(values.sendAmount)) {
      return;
    }
    const totalAmount = getMonetaryValue(
      values.sendAmount + ratesAndPaymentTypesValues.rateData.fee
    );
    setFieldValue('totalAmount', totalAmount, true);
  }, [ratesAndPaymentTypesValues.rateData, values.sendAmount, setFieldValue]);

  /**
   * We need to re-set the rate when any of the currency values change.
   * We set it to the cached data (if available) or an empty string (to trigger Skeleton loader & form validation)
   */
  useEffect(() => {
    setFieldValue('rate', ratesAndPaymentTypesValues.rateData || '', true);
  }, [
    values.sendCurrency,
    values.receiveCurrency,
    ratesAndPaymentTypesValues.rateData,
    setFieldValue,
    values.recipientType
  ]);

  /**
   * Clear the recipientType when paymentTypesByCountry doesn't contain recipientType,
   * for eg, when the receiveCountry value changes
   */
  useEffect(() => {
    if (
      values.recipientType &&
      ratesAndPaymentTypesValues.paymentTypesByCountry &&
      !ratesAndPaymentTypesValues.paymentTypesByCountry.find(
        ({ recipientType: r }) => r === values.recipientType
      )
    ) {
      setFieldValue('recipientType', '', true);
    }
  }, [values.recipientType, ratesAndPaymentTypesValues.paymentTypesByCountry, setFieldValue]);

  /**
   * Trigger validate form after API requests are loaded.
   * This helps to fix issue with send to recipient flow where the form isn't fully re-validated after API data & form values resolve
   *
   * This feels more like a hack because `setFieldValue`'s shouldValidate should take care of this.
   */
  useEffect(() => {
    if (
      ratesAndPaymentTypesValues.isRateLoaded &&
      ratesAndPaymentTypesValues.isPaymentTypesLoaded
    ) {
      const timerId = window.setTimeout(async () => {
        await validateForm();
      }, 100);

      return () => {
        window.clearTimeout(timerId);
      };
    }
  }, [
    ratesAndPaymentTypesValues.isRateLoaded,
    ratesAndPaymentTypesValues.isPaymentTypesLoaded,
    validateForm
  ]);
};

export default useAmountStepFormLogic;
