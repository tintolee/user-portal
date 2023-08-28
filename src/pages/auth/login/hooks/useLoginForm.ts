import Api from '@sendsprint/api-types';
import { useAccount, useToasts } from '@src/contexts';
import { useMixpanel } from '@src/contexts/mixpanel-context';
import { useAddressUpdate } from '@src/hooks';
import { useLogin } from '@src/hooks/queries/account';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import { mixpanelEvents } from '@src/types/mixpanel';
import { resolveQueryLink } from '@src/utils/resolveQueryLink';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { UseGetSendMoneyDetailsFromWebsiteResponse } from '../../register/hooks/useGetSendMoneyDetailsFromWebsite';
import { LoginFormI } from '../components/loginForm';
import { loginValidationSchema } from '../utils/loginValidationSchema';

interface UseLoginFormOptions {
  detailsFromWebsite: UseGetSendMoneyDetailsFromWebsiteResponse;
}

export interface UseLoginFormResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: any;
  handleSubmit: (values: LoginFormI, helpers: FormikHelpers<LoginFormI>) => void;
  isPhoneNumberModalShown: boolean;
  phoneUpdateLoading: boolean;
  verifyStatus: boolean | null;
  handlePhoneNumberClose: () => void;
  currentStep: number;
  isLoading: boolean;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Api.Model.CountryInitials | undefined>>;
  handleChangePhoneNo: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUserDetailsUpdate: (values: any, helpers: any) => Promise<void>;
  stepsForPhoneUpdate: 'initial' | 'generated' | 'verified';
  pendingLoggedInUser: ClientApi.LoggedInData | undefined;
  initialValues: LoginFormI;
}

const useLoginForm = (options: UseLoginFormOptions): UseLoginFormResponse => {
  const {
    detailsFromWebsite: {
      cartFromQuery,
      connectQuery,
      recipientCurrency,
      senderCurrency,
      isCheckoutPage,
      rateFromQuery,
      totalAmountFromQuery,
      totalAmountPlusFeeFromQuery
    }
  } = options;

  const [initialValues, setInitialValues] = useState<LoginFormI>({
    email: '',
    password: '',
    streetAddress: '',
    dateOfBirth: '',
    state: '',
    postCode: '',
    city: '',
    country: Api.Model.CountryInitials.UnitedKingdom,
    phone: '',
    otp: '',
    captcha: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<Api.Model.CountryInitials>();
  const { mixpanelInstance } = useMixpanel();
  const [pendingLoggedInUser, setPendingLoggedInUser] = useState<ClientApi.LoggedInData>();
  const connectUrl = `${Path.Connect}${resolveQueryLink({
    campaignIdQuery: '',
    cartFromQuery,
    connectQuery,
    receiveCountry: '',
    recipientCurrency,
    sendAmount: '',
    sendCountry: '',
    senderCurrency,
    rateFromQuery,
    totalAmountFromQuery,
    totalAmountPlusFeeFromQuery
  })}`;

  const { mutateAsync, isLoading } = useLogin(isCheckoutPage, connectUrl);
  const { handleLoginSuccess } = useAccount();
  const toast = useToasts();

  const handleCurrentStep = (arg: number) => setCurrentStep(arg);

  const {
    handleChangePhoneNo,
    addressResponse,
    handleUserDetailsUpdate,
    isPhoneNumberModalShown,
    phoneUpdateLoading,
    stepsForPhoneUpdate,
    verifyStatus,
    handlePhoneNumberClose
  } = useAddressUpdate({
    type: 'setAddress',
    email: pendingLoggedInUser?.user.email || '',
    hash: pendingLoggedInUser?.hash || ''
  });

  useEffect(() => {
    if (addressResponse && pendingLoggedInUser) {
      handleLoginSuccess(
        { ...pendingLoggedInUser, address: addressResponse },
        { checkout: isCheckoutPage, connectUrl }
      );
    }
  }, [addressResponse, pendingLoggedInUser]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoginSubmit = async (values: LoginFormI, helpers: FormikHelpers<LoginFormI>) => {
    mixpanelInstance.track(mixpanelEvents.LoginStarted, {
      payload: values
    });

    const payload: ClientApi.Account.Login.Request = {
      Email: values.email,
      Password: values.password
    };

    try {
      const res = await mutateAsync(payload);
      if (res) {
        if (res.address?.phone) {
          handleLoginSuccess(res, {
            checkout: isCheckoutPage,
            connectUrl
          });
        } else {
          toast.addToast({ body: 'Please fill in your address', title: 'Successful' });
          setPendingLoggedInUser(res);
          handleCurrentStep(2);
          helpers.setTouched({
            email: false,
            password: false,
            streetAddress: false,
            postCode: false,
            city: false,
            country: false,
            phone: false,
            otp: false,
            captcha: false
          });

          // updating the state here just incase the user has some of the fields earlier
          setInitialValues((prev) => ({
            ...prev,
            city: res?.address?.city || '',
            country: res?.address?.country || Api.Model.CountryInitials.UnitedKingdom,
            state: res?.address?.state || '',
            dateOfBirth: res?.address?.dateOfBirth || '',
            streetAddress: res?.address?.street || '',
            postCode: res?.address?.postCode || ''
          }));
        }
      }
    } catch (error) {
      // console.log(error, 'error');
      // return null;
    }
  };

  const handleSubmit = (values: LoginFormI, helpers: FormikHelpers<LoginFormI>) => {
    if (currentStep === 1) {
      handleLoginSubmit(values, helpers);
    } else if (currentStep === 2) {
      handleUserDetailsUpdate(values, helpers);
    }
  };

  const validationSchema = loginValidationSchema({
    currentStep,
    selectedCountry,
    stepsForPhoneUpdate
  });

  return {
    validationSchema,
    handleSubmit,
    isLoading,
    setSelectedCountry,
    handleChangePhoneNo,
    isPhoneNumberModalShown,
    phoneUpdateLoading,
    verifyStatus,
    handlePhoneNumberClose,
    currentStep,
    handleUserDetailsUpdate,
    stepsForPhoneUpdate,
    pendingLoggedInUser,
    initialValues
  };
};

export default useLoginForm;
