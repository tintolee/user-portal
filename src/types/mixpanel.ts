/* eslint-disable no-unused-vars */
export enum mixpanelEvents {
  // page view
  PageView = 'Page View',
  // signup
  SignUpFormFilling = 'Start Filling Signup Form',
  SignUpStarted = 'Sign up started',
  SignUpFailed = 'Sign up failed',
  SignUpSuccessful = 'Sign up successful',
  EmailVerified = 'Email Verified',
  // login
  LoginFormFilling = 'Start Filling Login Form',
  LoginStarted = 'Login started',
  LoginFailed = 'Login failed',
  LoginSuccessful = 'Login successful',
  // Veriff
  VeriffStarted = 'Veriff started',
  VeriffPending = 'Veriff pending',
  VeriffSuccess = 'Veriff success',
  VeriffFailed = 'Veriff failed',
  VeriffRetry = 'Veriff retry',
  // Send money
  ViewingAmountStep = 'Viewing amount step',
  AmountFormFilling = 'Start filling amount form',
  CompleteAmountStep = 'Complete amount step',
  ViewingAddressStep = 'Viewing address step',
  AddressFormFilling = 'Start filling address form',
  CompleteAddressStep = 'Complete address step',
  ViewingPhoneNumberStep = 'Viewing phone number step',
  PhoneNumberFormFilling = 'Start filling phone number form',
  CompletePhoneNumberStep = 'Complete phone number step',
  ViewingRecipientStep = 'Viewing recipient step',
  RecepientFormFilling = 'Start filling recipient form',
  CompleteRecipientStep = 'Complete recipient step',
  ViewingConfirmPaymentStep = 'Viewing confirm payment step',
  ReEditForm = 'Re-edit form',
  CancelTransfer = 'Cancel transfer',
  TriggerTransfer = 'Trigger transfer',
  InitiatePayment = 'Initiate payment',
  PaymentSuccessful = 'Payment successful (gateway)',
  TransferFailed = 'Transfer Failed',
  SendMoneyTopNav = 'Send money top nav',
  // OTP
  GenerateOTPSuccess = 'Generate OTP success',
  GenerateOTPFailed = 'Generate OTP failed',
  ResendOTP = 'Resend OTP',
  OTPFieldFilling = 'Start filling OTP form',
  TriggerVerifyOTP = 'Trigger verify OTP',
  VerifyOTPSuccess = 'Verify OTP success',
  VerifyOTPFailed = 'Verify OTP failed',
  // Connect
  AddToCart = 'Add to cart',
  RemoveFromCart = 'Remove from cart',
  ChangeRecipientCountry = 'Change recipient country (connect)',
  ChangeSenderCountry = 'Change sender country (connect)',
  AddConnectRecipient = 'Add connect recipient',
  ConnectRecepientFormFilling = 'Start filling recipient form (connect)',
  TriggerCheckout = 'Trigger checkout',
  InitiateConnectPayment = 'Initiate connect payment',
  CheckoutSuccess = 'Checkout success',
  CheckoutFailed = 'Checkout failed',
  CancelCheckout = 'Cancel checkout',

  Login = 'Login',
  StartRegistration = 'Start registration',
  CanceledTransfer = 'Canceled Transfer',
  CompleteRegistration = 'Complete registration',
  ConfirmPayment = 'Confirm payment (gateway)',
  FinishVerificationVeriff = 'Finish Verification (Veriff)',
  // InitiatePayment = "Initiate payment",
  SelectRecipient = 'Select recipient',
  // SendMoneyTopNav = "Send money top nav",
  StartTransfer = 'Start transfer',
  StartVerificationVeriff = 'Start Verification (Veriff)',
  ViewSingleTransfer = 'View single transfer'
}

export enum SignUpProperties {
  SendMoney = 'send money',
  Connect = 'connect'
}
