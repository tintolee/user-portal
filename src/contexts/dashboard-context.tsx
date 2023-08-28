/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { isUndefined } from '@src/utils/type';
import { useAccount } from '@src/contexts/auth-context';
import { useEnv } from './env-context';
import { useLocation } from 'react-router-dom';
import { DURATION_1_HR, DURATION_5_SEC } from '@src/constants';
import { useVeriffStatus } from '@src/hooks/queries/account';
import { getDeviceUuid, getNavigator } from '@src/utils/browserNavigator';

export type DashboardContext = {
  isSendBtnClicked: boolean;
  handleClickTrue: () => void;
  handleClickFalse: () => void;
  isUserVerified: boolean;
  veriffData: any;
  veriffUrl: string;
  handleVeriff: () => Promise<any>;
  handleVeriffOpenTab: () => Promise<void>;
  handleVeriffSameTab: () => Promise<void>;
};

// this is a context created to trigger some functions across the dashboard
const Context = createContext<DashboardContext | undefined>(undefined);

interface DashboardProviderProps {
  children?: ReactNode;
}

const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [isSendBtnClicked, setIsSendBtnClicked] = useState(false);
  const location = useLocation();
  const handleClickTrue = useCallback(() => {
    setIsSendBtnClicked(true);
  }, []);
  const handleClickFalse = useCallback(() => {
    setIsSendBtnClicked(false);
  }, []);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const envData = useEnv();
  const { user, veriffSessions, isLoggedIn } = useAccount();
  const [veriffData, setVeriffData] = useState<any>({});
  const [veriffUrl, setVeriffUrl] = useState('');

  // used to check if the user is verified by veriff
  const veriff = useVeriffStatus(
    { email: user?.email || '' },
    {
      enabled: isLoggedIn,
      staleTime: isUserVerified || !isLoggedIn ? DURATION_1_HR : DURATION_5_SEC,
      refetchInterval: isUserVerified || !isLoggedIn ? undefined : DURATION_5_SEC
    }
  );

  const navigatorDetail = getNavigator();
  // payload for the veriff session
  const payload = useMemo(() => {
    const data = {
      callbackUrl: `${envData.APP_DEPLOY_URL}/veriff`,
      person: {
        firstName: `${user?.firstName}`,
        lastName: `${user?.lastName}`,
        email: `${user?.email}`,
        phoneNumber: ''
      },
      // document: {
      //   type: "intl-passport",
      //   number: "B50045471",
      //   country: "NG",
      // },
      platform: 'mobile',
      device: {
        uuId: `${getDeviceUuid()}`,
        name: `${navigatorDetail.browserName}`,
        osName: `${navigatorDetail.osName}`,
        osVersion: `${navigatorDetail.osVersion}`
      }
    };
    return data;
  }, [
    envData.APP_DEPLOY_URL,
    navigatorDetail.browserName,
    navigatorDetail.osName,
    navigatorDetail.osVersion,
    user?.email,
    user?.firstName,
    user?.lastName
  ]);
  // function to handle the veriff session
  const handleVeriff = useCallback(async () => {
    const ver = await veriffSessions(payload);
    setVeriffData(ver);
    if (ver.success) {
      setVeriffUrl(ver?.data?.session?.url);
    }
    return ver;
  }, [payload, veriffSessions]);

  const handleVeriffOpenTab = useCallback(async () => {
    const newWindow = window.open('');
    newWindow?.document.write('Loading...'); // to let the user know that an action is in process
    const veriff = await handleVeriff();
    if (veriff) {
      const url = veriff?.data?.session?.url;
      if (newWindow) {
        newWindow.location.href = url;
      }
    }
  }, [handleVeriff]);
  const handleVeriffSameTab = useCallback(async () => {
    const veriff = await handleVeriff();
    if (veriff) {
      const url = veriff?.data?.session?.url;
      window.location.href = url;
    }
  }, [handleVeriff]);
  // effect to update the verification status and url
  useEffect(() => {
    if (veriff.data === null) {
      setIsUserVerified(false);
      // if (user) {
      //   handleVeriff();
      // }
    } else {
      setIsUserVerified(true);
    }
  }, [veriff.data]);
  // effect to trigger the veriff request
  // useEffect(() => {
  //   if (user) {
  //     handleVeriff();
  //   }
  // }, [user, handleVeriff]);
  // this is used to clean up the localstorage just incase the user didnt click the button in the veriff page in the other tab.
  useEffect(() => {
    // used to detect if the page is on focus
    if (document.visibilityState === 'visible') {
      setTimeout(() => {
        localStorage.removeItem('SprintData');
      }, 60 * 1000 * 60 * 24); // one day
    }
  }, [location.pathname]);
  const value = useMemo<DashboardContext>(
    () => ({
      isSendBtnClicked,
      handleClickTrue,
      handleClickFalse,
      isUserVerified,
      veriffData,
      veriffUrl,
      handleVeriff,
      handleVeriffOpenTab,
      handleVeriffSameTab
    }),
    [
      isSendBtnClicked,
      handleClickTrue,
      handleClickFalse,
      isUserVerified,
      veriffData,
      veriffUrl,
      handleVeriff,
      handleVeriffOpenTab,
      handleVeriffSameTab
    ]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useDashboardContext = () => {
  const context = useContext(Context);

  if (isUndefined(context)) {
    throw new Error(`useDashboardContext must be used within a DashboardProvider`);
  }
  return context;
};

export { DashboardProvider, useDashboardContext };
