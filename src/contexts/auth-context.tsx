/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { isUndefined } from '@src/utils/type';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ClientApi from '@src/types/client';
import { useAppLocation, useSetAddress, useVeriffSessions } from '@src/hooks';
import { useMixpanel } from './mixpanel-context';
import { getLoggedInUserInfo, logoutService, persistLoggedInState } from '@src/services';
import Api from '@sendsprint/api-types';
import { Path } from '@src/navigations/routes';
import { mixpanelEvents } from '@src/types/mixpanel';
import { useQueryClient } from 'react-query';

interface AuthProviderProps {
  children?: ReactNode;
}

interface HandleLoginSuccessOptions {
  checkout?: boolean;
  refreshPage?: boolean;
  connectUrl?: string;
}

export type AuthContextI = {
  isLoggedIn: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logout(saveLocationState?: boolean): Promise<any>;
  handleLoginSuccess: (
    loggedInData: ClientApi.LoggedInData,
    options?: HandleLoginSuccessOptions
  ) => void;
  isRegistered: boolean;
  handleRegisterTrue: () => void;
  handleRegisterFalse: () => void;
  user: ClientApi.UserProfile | null;
  userAddress: ClientApi.UserAddress | null;
  setAddress(form: ClientApi.Account.SetAddress.Request): Promise<ClientApi.UserAddress>;
  veriffSessions: (data: any) => any;
  //   login(form: LoginFormData, checkout?: boolean): Promise<LoggedInData>;
  //   logout(saveLocationState?: boolean): Promise<any>;
  //   register(form: RegisterFormData): Promise<Api.Account.Register.Request>;
  //   // register(form: RegisterFormData): Promise<Api.Account.Register.Request>;
  //   user: LoggedInData['user'] | null;
  //   userAddress: LoggedInData['address'];
  // verifyEmail(id: string): Promise<any>;
};

// Search param names sent by the form on the website
const SEND_FROM_WEBSITE_SEARCH_PARAM_NAMES = {
  RECEIVE_COUNTRY: 'receiveCountry',
  SEND_COUNTRY: 'sendCountry',
  SEND_AMOUNT: 'sendAmount'
};

/** Get the SendFromWebsiteLocationState if possible */
const maybeGetSendFromWebsiteLocationState = (
  search: string
): ClientApi.SendFromWebsiteLocationState | undefined => {
  try {
    const searchParams = new URLSearchParams(search);
    const receiveCountry = searchParams.get(
      SEND_FROM_WEBSITE_SEARCH_PARAM_NAMES.RECEIVE_COUNTRY
    ) as Api.Model.CountryInitials | null;

    const sendCountry = searchParams.get(
      SEND_FROM_WEBSITE_SEARCH_PARAM_NAMES.SEND_COUNTRY
    ) as Api.Model.CountryInitials | null;

    const sendAmount = Number(searchParams.get(SEND_FROM_WEBSITE_SEARCH_PARAM_NAMES.SEND_AMOUNT));

    if (
      receiveCountry &&
      sendCountry &&
      searchParams.has(SEND_FROM_WEBSITE_SEARCH_PARAM_NAMES.SEND_AMOUNT) &&
      !Number.isNaN(sendAmount)
    ) {
      return {
        sendFromWebsite: {
          receiveCountry,
          sendCountry,
          sendAmount: Number(sendAmount)
        }
      };
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return;
};

const AuthContext = createContext<AuthContextI | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const location = useAppLocation();
  const navigate = useNavigate();
  const { mixpanelInstance } = useMixpanel();
  const queryClient = useQueryClient();
  const userInfo = getLoggedInUserInfo();
  const [user, setUser] = useState(userInfo.user);
  const [userAddress, setUserAddress] = useState(userInfo.address);
  const [searchParams] = useSearchParams();

  /** The reason for this is to trigger the success modal on the register page */
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterTrue = () => setIsRegistered(true);
  const handleRegisterFalse = () => setIsRegistered(false);

  const { mutateAsync: setAddressMutate } = useSetAddress();
  const { mutateAsync: veriffSessionsMutate } = useVeriffSessions();

  // function to handle redirect after login
  const handleLoggedInRedirects = useCallback(() => {
    const maybeSendFromWebsiteState = maybeGetSendFromWebsiteLocationState(location.search);

    if (maybeSendFromWebsiteState) {
      /* The user is coming from the form on the website, go to SendMoney page and pass the state */
      navigate(Path.SendMoney, {
        state: maybeSendFromWebsiteState
      });
    } else if (location.state?.from) {
      /* If there was a previous from state, go to that page instead */
      navigate(location.state.from);
    } else {
      /* Otherwise go to the Dashboard */
      navigate(Path.Dashboard);
    }
  }, [history, location.state, location.search]);

  const handleLoginSuccess = useCallback(
    (loggedInData: ClientApi.LoggedInData, options?: HandleLoginSuccessOptions) => {
      const { user, address } = loggedInData;

      setUser(user);
      setUserAddress(address);
      mixpanelInstance.identify(user.email);
      mixpanelInstance.people.set('Email activation status', user.isEmailVerified);
      mixpanelInstance.track(mixpanelEvents.LoginSuccessful);

      persistLoggedInState(loggedInData);

      if (address && !address?.phone) {
        // sets this value if there is no phone in the user details
        sessionStorage.setItem('UPDATE_PHONE', 'true');
      }

      if (options?.checkout && options?.connectUrl) {
        navigate(options.connectUrl);
      } else {
        if (options?.refreshPage) {
          window.location.href = Path.Dashboard;
        } else {
          handleLoggedInRedirects();
        }
      }
    },
    []
  );

  const logout: AuthContextI['logout'] = useCallback(
    (saveLocationState) => {
      let state: ClientApi.NotLoggedInLocationState | undefined;
      if (saveLocationState) {
        state = { from: location };
      }
      queryClient.invalidateQueries();

      return logoutService().then(() => {
        setUser(null);
        queryClient.clear();
        mixpanelInstance.reset();

        if (searchParams.get('checkout')) {
          navigate(`${Path.Login}?checkout=true`, {
            state
          });
        } else {
          navigate(Path.Login, {
            state
          });
        }
      });
    },
    [history, location, queryClient, mixpanelInstance, searchParams]
  );

  const setAddress = useCallback((form: ClientApi.Account.SetAddress.Request) => {
    return setAddressMutate(form).then((address) => {
      setUserAddress(address);

      return address;
    });
  }, []);

  // veriff sessions function
  const veriffSessions = useCallback((payload: any) => {
    return veriffSessionsMutate({ data: payload })
      .then((data) => {
        return data.data;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }, []);

  const value: AuthContextI = {
    isLoggedIn: !!user,
    logout,
    handleLoginSuccess,
    handleRegisterFalse,
    handleRegisterTrue,
    isRegistered,
    user,
    userAddress,
    setAddress,
    veriffSessions
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAccount = () => {
  const context = useContext(AuthContext);
  if (isUndefined(context)) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export default AuthProvider;
