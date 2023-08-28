import { Loader } from '@src/components';
import { useAccount } from '@src/contexts';
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { Path } from './routes';

/**User pages */
const Register = lazy(() => import(/*webpackChunkName:'Register'*/ '@src/pages/auth/register'));
const Login = lazy(() => import(/*webpackChunkName:'Login'*/ '@src/pages/auth/login'));
const ResetPassword = lazy(
  () => import(/*webpackChunkName:'ResetPassword'*/ '@src/pages/auth/resetPassword')
);
const ChangePassword = lazy(
  () => import(/*webpackChunkName:'ChangePassword'*/ '@src/pages/auth/changePassword')
);
const Dashboard = lazy(() => import(/*webpackChunkName:'Dashboard'*/ '@src/pages/user/dashboard'));
const SendMoney = lazy(() => import(/*webpackChunkName:'SendMoney'*/ '@src/pages/user/sendMoney'));
const Recipients = lazy(
  () => import(/*webpackChunkName:'Recipients'*/ '@src/pages/user/recipients')
);
const Transactions = lazy(
  () => import(/*webpackChunkName:'Transactions'*/ '@src/pages/user/transactions')
);
const TransferSchedule = lazy(
  () => import(/*webpackChunkName:'TransferSchedule'*/ '@src/pages/user/transferSchedule')
);
const AddTransferSchedule = lazy(
  () => import(/*webpackChunkName:'AddTransferSchedule'*/ '@src/pages/user/addTransferSchedule')
);
const Connect = lazy(() => import(/*webpackChunkName:'Connect'*/ '@src/pages/user/connect'));
const Cards = lazy(() => import(/*webpackChunkName:'Cards'*/ '@src/pages/user/cards'));
const Referrals = lazy(() => import(/*webpackChunkName:'Referrals'*/ '@src/pages/user/referrals'));
const Profile = lazy(() => import(/*webpackChunkName:'Profile'*/ '@src/pages/user/profile'));
const ModulrCallback = lazy(
  () => import(/*webpackChunkName:'ModulrCallback'*/ '@src/pages/callbacks/modulrCallbackPage')
);
const Veriff = lazy(() => import(/*webpackChunkName:'Veriff'*/ '@src/pages/callbacks/veriff'));
const VerifyEmail = lazy(
  () => import(/*webpackChunkName:'VerifyEmail'*/ '@src/pages/auth/verifyEmail')
);
const VolumeCallback = lazy(
  () => import(/*webpackChunkName:'VolumeCallback'*/ '@src/pages/callbacks/volumeCallbackPage')
);
const PaymentSuccess = lazy(
  () => import(/*webpackChunkName:'PaymentSuccess'*/ '@src/pages/callbacks/paymentSuccess')
);
const Deals = lazy(() => import(/*webpackChunkName:'Deals'*/ '@src/pages/user/deals'));

const NotFound = lazy(() => import(/*webpackChunkName:'NotFound'*/ '@src/pages/notFound'));

const RouterConfig = () => {
  const { isLoggedIn } = useAccount();

  return (
    <Suspense fallback={<Loader showTimedOutScreen />}>
      <Routes>
        <Route
          path={Path.Home}
          element={isLoggedIn ? <Navigate to={Path.Dashboard} /> : <Navigate to={Path.Login} />}
        />

        {/* Public routes */}
        <Route element={<PublicRoute isAuthenticated={isLoggedIn} />}>
          <Route path={Path.Register} element={<Register />} />
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.ResetPassword} element={<ResetPassword />} />
          <Route path={Path.ChangePassword} element={<ChangePassword />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
          <Route path={Path.Dashboard} element={<Dashboard />} />
          <Route path={Path.SendMoney} element={<SendMoney />} />
          <Route path={Path.Recipients} element={<Recipients />} />
          <Route path={Path.TransferHistory} element={<Transactions />} />
          <Route path={Path.TransferSchedule} element={<TransferSchedule />} />
          <Route path={Path.AddTransferSchedule} element={<AddTransferSchedule />} />
          <Route path={Path.Connect} element={<Connect />} />
          <Route path={Path.Cards} element={<Cards />} />
          <Route path={Path.Referrals} element={<Referrals />} />
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.Veriff} element={<Veriff />} />
          <Route path={Path.PaymentSuccess} element={<PaymentSuccess />} />
          <Route path={Path.DealsAndRewards} element={<Deals />} />
        </Route>

        {/* General pages */}
        <Route path={Path.VerifyEmail} element={<VerifyEmail />} />
        <Route path={Path.VolumeCallback} element={<VolumeCallback />} />
        <Route path={Path.ModulrCallback} element={<ModulrCallback />} />

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
