import Api from '@sendsprint/api-types';
import { CAMPAIGN_ID_STORE_NAME } from '@src/constants';
import { useAccount } from '@src/contexts/auth-context';
import { useMixpanel } from '@src/contexts/mixpanel-context';
import { useToasts } from '@src/contexts/toast-context';
import { useRegister } from '@src/hooks/queries/account';
import useAddressUpdate from '@src/hooks/utils/useAddressUpdate';
import ClientApi from '@src/types/client';
import { mixpanelEvents } from '@src/types/mixpanel';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RegisterFormI } from '../components/registerForm';
import { registerValidationSchema } from '../utils/registerValidationSchema';
import { UseGetSendMoneyDetailsFromWebsiteResponse } from './useGetSendMoneyDetailsFromWebsite';

interface UseRegisterFormOptions {
  detailsFromWebsite: UseGetSendMoneyDetailsFromWebsiteResponse;
  loginUrl: string;
}

export interface UseRegisterFormResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: any;
  handleSubmit: (values: RegisterFormI, helpers: FormikHelpers<RegisterFormI>) => void;
  handleChangePhoneNo: () => void;
  isLoading: boolean;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Api.Model.CountryInitials | undefined>>;
  initialValues: RegisterFormI;
  isPhoneNumberModalShown: boolean;
  phoneUpdateLoading: boolean;
  verifyStatus: boolean | null;
  handlePhoneNumberClose: () => void;
  currentStep: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUserDetailsUpdate: (values: any, helpers: any) => Promise<void>;
  stepsForPhoneUpdate: 'initial' | 'generated' | 'verified';
  emailQuery: string | null;
  hashQuery: string | null;
}

const useRegisterForm = (options: UseRegisterFormOptions): UseRegisterFormResponse => {
  const {
    loginUrl,
    detailsFromWebsite: {
      cartFromQuery,
      connectQuery,
      receiveCountry,
      recipientCurrency,
      sendAmount,
      sendCountry,
      senderCurrency,
      rateFromQuery,
      totalAmountFromQuery,
      totalAmountPlusFeeFromQuery
    }
  } = options;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<Api.Model.CountryInitials>();
  const [initialValues, setInitialValues] = useState<RegisterFormI>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    referralCode: '',
    signUpSource: '',
    streetAddress: '',
    postCode: '',
    city: '',
    country: Api.Model.CountryInitials.UnitedKingdom || Api.Model.CountryInitials.Canada,
    phone: '',
    dateOfBirth: '',
    state: '',
    otp: '',
    captcha: '',
    acceptTerms: false
  });

  const { mixpanelInstance } = useMixpanel();
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleRegisterTrue } = useAccount();

  const hashQuery = searchParams.get('hash');
  const emailQuery = searchParams.get('email');
  const referralQuery = searchParams.get('referral');

  const { mutateAsync, isLoading } = useRegister({ loginUrl });
  const toast = useToasts();

  const handleCurrentStep = (arg: number) => setCurrentStep(arg);

  const {
    handleChangePhoneNo,
    handleUserDetailsUpdate,
    isPhoneNumberModalShown,
    phoneUpdateLoading,
    stepsForPhoneUpdate,
    verifyStatus,
    handlePhoneNumberClose
  } = useAddressUpdate({
    type: 'setAddress',
    email: emailQuery || '',
    hash: hashQuery || '',
    onSubmitSuccess: handleRegisterTrue
  });

  useEffect(() => {
    if (referralQuery) {
      setInitialValues((prev) => ({
        ...prev,
        referralCode: referralQuery
      }));
    }
  }, [referralQuery]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRegisterSubmit = async (
    values: RegisterFormI,
    helpers: FormikHelpers<RegisterFormI>
  ) => {
    mixpanelInstance.track(mixpanelEvents.SignUpStarted, {
      payload: values
    });

    // setting this info temporarily to be used in the success modal
    sessionStorage.setItem('SprintUser', values.firstName);

    const campaignCode = localStorage.getItem(CAMPAIGN_ID_STORE_NAME);
    const parsedCode = campaignCode ? JSON.parse(campaignCode) : '';

    const payload: ClientApi.Account.Register.Request = {
      Email: values.email,
      Password: values.password,
      FirstName: values.firstName,
      LastName: values.lastName,
      Referrer: values.referralCode,
      /** the code coming from the campaign takes preference over the selected signup source */
      SignUpSourceId: parsedCode || values.signUpSource
    };

    try {
      const res = await mutateAsync(payload);

      if (res) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sendMoneyObj: any = {};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        const connectObj: any = {};

        if (receiveCountry && sendAmount && sendCountry) {
          sendMoneyObj.sendAmount = sendAmount;
          sendMoneyObj.receiveCountry = receiveCountry;
          sendMoneyObj.sendCountry = sendCountry;
        }

        if (senderCurrency && recipientCurrency && cartFromQuery && connectQuery) {
          connectObj.recipientCurrency = recipientCurrency;
          connectObj.senderCurrency = senderCurrency;
          connectObj.cart = cartFromQuery;
          connectObj.connect = connectQuery;
          connectObj.rate = rateFromQuery;
          connectObj.totalAmount = totalAmountFromQuery;
          connectObj.totalAmountPlusFee = totalAmountPlusFeeFromQuery;
        }

        toast.addToast({ body: 'Please fill in your address', title: 'Successful' });
        handleCurrentStep(2);
        setSearchParams({
          hash: res[0].Hash,
          email: res[0].Email,
          ...sendMoneyObj,
          ...connectObj
        });

        helpers.setTouched({
          firstName: false,
          lastName: false,
          email: false,
          password: false,
          referralCode: false,
          signUpSource: false,
          streetAddress: false,
          postCode: false,
          city: false,
          country: false,
          phone: false,
          otp: false,
          captcha: false
        });
      }
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = (values: RegisterFormI, helpers: FormikHelpers<RegisterFormI>) => {
    if (currentStep === 1) {
      handleRegisterSubmit(values, helpers);
    } else if (currentStep === 2) {
      handleUserDetailsUpdate(values, helpers);
    }
  };

  const validationSchema = registerValidationSchema({
    currentStep,
    selectedCountry,
    stepsForPhoneUpdate
  });

  return {
    validationSchema,
    handleSubmit,
    handleChangePhoneNo,
    isLoading,
    setSelectedCountry,
    initialValues,
    isPhoneNumberModalShown,
    phoneUpdateLoading,
    verifyStatus,
    handlePhoneNumberClose,
    currentStep,
    handleUserDetailsUpdate,
    stepsForPhoneUpdate,
    emailQuery,
    hashQuery
  };
};

export default useRegisterForm;
