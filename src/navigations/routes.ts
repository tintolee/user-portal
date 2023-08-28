/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum Path {
  Home = '/',
  Login = '/login',
  Register = '/register',
  ResetPassword = '/reset-password',
  ChangePassword = '/change-password',
  SendMoney = '/send',
  /**
   * Dashboard is an alias for the SendMoney page. This can be changed if we have a distinct Dashboard page later on.
   * If you change this in the future, please add an entry to `routes` & update `Dashboard` in `@src/screens.tsx`
   */
  Dashboard = '/dashboard',
  Cards = '/cards',
  TransferHistory = '/transfers',
  ViewTransfer = '/transfers/:txRef',
  ViewGiftTransfer = '/transfers/gift/:txRef',
  Recipients = '/recipients',
  NewRecipient = '/recipients/new',
  ViewRecipient = '/recipients/:recipientId',
  Profile = '/profile',
  VerifyEmail = '/verify-successful',
  Referrals = '/referrals',
  TransferSchedule = '/scheduled-transfers',
  AddTransferSchedule = '/scheduled-transfers/add',
  Veriff = '/veriff',
  Connect = '/connect',
  CuratedPage = '/connect/curated-list',
  ConnectMarketPlace = '/connect/marketplace',
  Checkout = '/checkout',
  ConnectProductPage = '/connect/product/:id',
  VolumeCallback = '/volume-callback',
  ModulrCallback = '/modulr-callback',
  PaymentSuccess = '/payment-success',
  DealsAndRewards = '/deals-and-rewards',
  /**
   * B2B routes
   */
  B2BOnboarding = '/b2b/onboarding'
}
