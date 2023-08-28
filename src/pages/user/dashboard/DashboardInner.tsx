import Box from '@sendsprint/ui-react/dist/components/Box';
import Text from '@sendsprint/ui-react/dist/components/Text';
import VeriffBanner from '@src/components/veriffBanner';
import useUpdatePhoneNumber from '@src/components/sendMoneyFlow/hooks/useUpdatePhoneNumber';
import { useDashboardContext } from '@src/contexts/dashboard-context';
import React, { lazy } from 'react';
import WelcomeSection from './components/welcomeSection';
import RecentRecipients from './components/recipients';
import RecentTransactions from './components/transactions';
import RecentSchedules from './components/schedule';
import SuspenseWrapper from '@src/components/suspenseWrapper';

const PhoneNumberModal = lazy(
  () =>
    import(
      /*webpackChunkName: 'PhoneNumberModal'*/ '@src/components/sendMoneyFlow/components/phoneNumberModal'
    )
);
const PhoneNumberSuccess = lazy(
  () =>
    import(
      /*webpackChunkName: 'PhoneNumberSuccess'*/ '@src/components/sendMoneyFlow/components/phoneNumberModal/PhoneNumberSuccess'
    )
);
const LittleVeriffModal = lazy(
  () =>
    import(
      /*webpackChunkName: 'LittleVeriffModal'*/ '@src/components/sendMoneyFlow/components/littleVeriffModal'
    )
);

const DashboardInner = () => {
  const { isUserVerified } = useDashboardContext();

  const {
    handleChangePhoneNo,
    handlePhoneNumberSuccessClose,
    handleUserDetailsUpdate,
    isPhoneNumberModalShown,
    isPhoneNumberSuccessModalShown,
    phoneUpdateLoading,
    verifyStatus,
    stepsForPhoneUpdate,
    handlePhoneNumberClose
  } = useUpdatePhoneNumber(isUserVerified);

  return (
    <>
      <Text variant="h5" className="ss-font-bold ss-mb-8">
        Home
      </Text>
      <Box className="ss-space-y-8">
        <WelcomeSection />
        <VeriffBanner />
      </Box>
      <Box className="ss-grid xl:ss-grid-cols-2 ss-gap-8 ss-mt-10">
        <RecentSchedules />
        <RecentRecipients />
        <Box className="ss-col-span-full">
          <RecentTransactions />
        </Box>
      </Box>
      {isPhoneNumberModalShown && (
        <SuspenseWrapper returnNullErrorFallback>
          <PhoneNumberModal
            state={isPhoneNumberModalShown}
            closeFunc={handlePhoneNumberClose}
            handleSubmit={handleUserDetailsUpdate}
            stepsForPhoneUpdate={stepsForPhoneUpdate}
            changePhoneNumber={handleChangePhoneNo}
            phoneUpdateLoading={phoneUpdateLoading}
            verifyStatus={verifyStatus}
          />
        </SuspenseWrapper>
      )}
      {isPhoneNumberSuccessModalShown && (
        <SuspenseWrapper returnNullErrorFallback>
          <PhoneNumberSuccess
            state={isPhoneNumberSuccessModalShown}
            closeFunc={handlePhoneNumberSuccessClose}
            refreshPage
          />
        </SuspenseWrapper>
      )}
      {!isUserVerified && (
        <SuspenseWrapper returnNullErrorFallback>
          <LittleVeriffModal isUserVerified={isUserVerified} />
        </SuspenseWrapper>
      )}
    </>
  );
};

export default DashboardInner;
