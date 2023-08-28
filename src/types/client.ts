/* eslint-disable no-unused-vars */
/**
 * This contains the types associated with the endpoints.
 */

import Api from '@sendsprint/api-types';
import { FormProps } from '@sendsprint/ui-react';
import { SetAddressFormData } from '@src/components/sendMoneyFlow/components/addressStep/addressStepForm';
import { TransferScheduleDataI } from '@src/components/sendMoneyFlow/components/scheduleStep/scheduleForm';
import { ReactNode } from 'react';
import { Location } from 'react-router-dom';

/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
module ClientApi {
  /** Allow empty string for properties of a FormData type */
  export type InitialFormData<T> = {
    [P in keyof T]-?: '' | T[P];
  };
  /** Location state when a user tries to access a protected route when logged out. We save the current location so we can redirect on login */
  export type NotLoggedInLocationState = { from: Location };

  /** Location state to Send money to a recipient */
  export type SendToRecipientLocationState = { selectedRecipient: Recipient };
  /** All possible options for LocationState in the app. You should use as type argument for `useLocation()` **/
  export type LocationState =
    | Partial<
        NotLoggedInLocationState & SendToRecipientLocationState & SendFromWebsiteLocationState
      >
    | undefined;

  /** This refers to the useLocation custom type */
  export interface AppLocationState extends Location {
    state: LocationState;
  }

  /** SendCountry data type */
  export type SendCountry = {
    id: number;
    name: string;
    telCode: string;
    initials: Api.Model.CountryInitials;
    currency: Api.Model.CurrencyCode;
  };

  /** ReceiveCountry data type */
  export type ReceiveCountry = {
    id: number;
    name: string;
    telCode: string;
    initials: Api.Model.CountryInitials;
    currency: Api.Model.CurrencyCode;
  };

  /** Rate info type */
  export type RateType = {
    rate: number;
    fee: number;
    amount: number;
  };

  export type Locales = string | string[];

  export type UserProfile = {
    status: Api.Model.UserStatus;
    role: Api.Model.UserRole;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    isEmailVerified: boolean;
    referralCode: string;
  };

  export type UserAddress = {
    city: string;
    country: Api.Model.CountryInitials;
    postCode: string;
    street: string;
    phone: string | null;
    state: string | null;
    dateOfBirth: string | null;
  };

  /** Location state to send money from the website */
  export type SendFromWebsiteLocationState = {
    sendFromWebsite: {
      receiveCountry: Api.Model.CountryInitials;
      sendAmount: number;
      sendCountry: Api.Model.CountryInitials;
    };
  };

  /**
   * Standardized data to carry information when a user is logged in. It is the final data returned by
   * the login & register functions of account service
   */
  export type LoggedInData = {
    user: UserProfile;
    hash: string;
    address: null | UserAddress;
  };

  /**
   * Recipient type is a convenient way to map valid country/paymentType combinations. They're used instead of complex
   * conditional statements that can be difficult to manage.
   *
   * You can find the mapping and utility functions to convert both ways in @src/utils/recipient-type.ts
   */
  export enum RecipientType {
    /** Nigerian domiciliary account */
    NG_DOM = 'NG-DOM',
    /** Nigerian Virtual domiciliary account */
    NG_V_DOM = 'NG-V-DOM',
    /** Cash pickup in Nigeria */
    NG_CASH = 'NG-CASH',
    /** Nigerian Auto Domiciliary Account */
    NG_A_DOM = 'NG-A-DOM',
    /** Nigerian bank account in naira */
    NEW_NG_BANK = 'NEW-NG-BANK',
    /** Ghanaian bank account */
    GH_BANK = 'GH-BANK',
    /** Ghanaian MoMo mobile money account */
    GH_MOBILE = 'GH-MOBILE',
    /** Kenyan Bank Account */
    KE_BANK = 'KE-BANK',
    /** Kenyan Mpesa Mobile Money Account */
    KE_MOBILE = 'KE-MOBILE',
    /** South African bank account */
    ZA_BANK = 'ZA-BANK'
  }

  export type Recipient = {
    id: number;
    ownerId: number;
    type: RecipientType;

    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;

    accountNumber: string;
    bankCode: string;
    branchCode: string;
    routingNumber: string;

    address: string;

    email: string;
    phoneNumber: string;
    paymentOperator: string;

    country: Api.Model.CountryInitials;
    paymentType: Api.Model.PaymentType;
    status: Api.Model.RecipientStatus;

    dateOfBirth: string | null | undefined;
  };

  /** These fields must be filled and cannot be an empty string */
  type RecipientFormRequiredFields =
    | 'firstName'
    | 'lastName'
    | 'address'
    | 'country'
    | 'routingNumber'
    | 'paymentType';

  /** These fields are optional and can be an empty string */
  type RecipientFormOptionalFields =
    | 'middleName'
    | 'accountNumber'
    | 'bankCode'
    | 'branchCode'
    // | "routingNumber"
    | 'email'
    | 'phoneNumber'
    | 'paymentOperator';

  /** Generic type for all Recipient forms. */
  export type RecipientFormData = Pick<Recipient, RecipientFormRequiredFields> &
    Partial<Pick<Recipient, RecipientFormOptionalFields>> & {
      accountName: string;
      saveDetails: boolean;
    };

  /** Submit handler for all recipient forms */
  export type RecipientFormSubmitHandler = FormProps<RecipientFormData>['onSubmit'];

  /** Shared props between all recipient forms */
  export type RecipientFormProps = {
    initialFormData: RecipientFormData;
    onSubmit: RecipientFormSubmitHandler;
    showSaveDetailsField?: boolean;
    ctaContent?: ReactNode;
  };

  export type Bank = {
    id: number;
    code: Api.Model.BankCode;
    name: string;
  };

  export type BankBranch = {
    id: number;
    code: Api.Model.BranchCode;
    name: string;
  };

  export type ResolvedBankAccount = {
    accountNumber: string;
    accountName: string;
  };

  /** Recipient payment type info */
  export type PaymentTypeInfo = {
    id: number;
    country: Api.Model.CountryInitials;
    paymentName: string;
    paymentType: Api.Model.PaymentType;
    status: Api.Model.PaymentTypeStatus;
    recipientType: RecipientType;
  };

  export interface ExtendedTransactionRefInfo extends Api.Model.TransactionRefInfo {
    payment_plan?: string | number;
    URL?: string;
  }

  export type TransactionRefInfo = {
    txRef: string;
    amount: number;
    payment_plan?: string | number;
    URL?: string;
  };

  export type DateTimeTZ = string;

  export type Transaction = {
    id: number;
    txRef: string;
    receiveAmount: number;
    sendAmount: number;
    rate: number;
    fee: number;
    sendCurrency: Api.Model.CurrencyCode;
    receiveCurrency: Api.Model.CurrencyCode;
    securityQuestion: string;
    securityAnswer: string;
    status: Api.Model.TransactionStatus;
    createdDate: Date;
    createdDateISO: DateTimeTZ;
    updatedDate: Date;
    updatedDateISO: DateTimeTZ;
    recipientName: string;
    recipientId: number;
    ownerId: number;
    // paymentType?: Api.Model.PaymentType;
  };

  /**
   * Different stages for a Transaction time stamp, and how they map to statuses
   * Setup stage - created date means success
   * Charge stage - Pending (createdDate), Failed charge, Charged
   * Disbursement stage - Disbursed, Failed disburse, Completed
   * Return stage - Chargeback, - , Reversed
   */
  export type TransactionTimestamp = {
    createdDateISO: DateTimeTZ;
    failedChargeDateISO: null | DateTimeTZ;
    chargedDateISO: null | DateTimeTZ;
    disbursedDateISO: null | DateTimeTZ;
    failedDisburseISO: null | DateTimeTZ;
    completedDateISO: null | DateTimeTZ;
    chargebackDateISO: null | DateTimeTZ;
    reversedDateISO: null | DateTimeTZ;
  };

  export interface GiftCountries {
    Id: number;
    Name: string;
    Code: number;
    Initials: Api.Model.CountryInitials;
    Currency: string;
    Status: string;
    DateCreated: string;
    DateUpdated: string;
  }

  export interface GiftMerchants {
    Category: string;
    Country: Api.Model.CountryInitials | string;
    DateCreated: string;
    DateUpdated: string;
    Description: string;
    Id: number;
    MinimumPrice: number;
    Name: string;
    Picture: string;
    RedemptionDetails: string;
    ShortCode: string;
    ShortDesc: string;
    Status: string;
    StoreId: number;
    StoreLocations: string;
    StorePictures: string;
  }

  export interface GiftCategories {
    Category: string;
  }

  export interface GenerateOtpI {
    phone: string;
    email: string;
    hash: string;
    otp: string;
  }

  /**
   * Types for recurring
   */
  export type RecurringIntervalI =
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'quarterly'
    | 'bi-anually';

  export interface RecurringIntervalObjI {
    Id: number;
    Name: RecurringIntervalI;
    DateCreated: string;
    DateUpdated: string;
  }

  export interface RecurringTransactionI {
    Id: number;
    TxRef: string;
    Amount: number;
    Fee: number;
    SourceCurrency: string;
    TargetCurrency: string;
    ChargedAmount: number;
    Rate: number;
    Status: Api.Model.TransactionStatus;
    DateCreated: string;
    DateUpdated: string;
    RecipientId: number;
    OwnerId: number;
    SecurityQuestion: string;
    SecurityAnswer: string;
    RecipientName: string;
    PaymentType: Api.Model.PaymentType;
    MaskedPAN: string;
    IsCompleted: 0 | 1;
    SentCount: number;
    Duration: string;
    RecurringStatus: string;
    CardType: string;
  }

  export interface RecurringTransactionByTxref {
    Id: number;
    TxRef: string;
    Payload: string;
    Status: string;
    DateCreated: string;
    DateUpdated: string;
  }

  export interface CartI extends GiftMerchants {
    Quantity: number;
    Amount: number;
  }

  export namespace Account {
    export namespace Login {
      export type Request = Omit<
        Api.Account.Login.Request,
        'ApplicationID' | 'SecretKey' | 'LoginType'
      >;
    }

    export namespace Register {
      export interface Request
        extends Omit<Api.Account.Register.Request, 'ApplicationID' | 'SecretKey' | 'LoginType'> {
        Referrer: string;
        SignUpSourceId: string;
      }
    }

    export namespace SignUpSource {
      export interface SignUpSourceData {
        Id: number;
        Name: string;
      }
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: SignUpSourceData[];
      }
    }

    export namespace SetAddress {
      export interface Request extends SetAddressFormData {
        email?: string;
        hash?: string;
      }
    }

    export namespace ResetPasswordByEmail {
      export interface Request {
        Email: string;
      }
    }

    export namespace ChangePassword {
      export type Request = Omit<Api.Account.ChangePassword.Request, 'ApplicationID' | 'SecretKey'>;
    }

    export namespace ChangePasswordFromProfile {
      export type Request = Omit<
        Api.Account.ChangePasswordFromProfile.Request,
        'ApplicationID' | 'SecretKey'
      >;
    }

    export namespace GenerateOtp {
      export type Request = Omit<GenerateOtpI, 'otp'>;
    }

    export namespace VerifyOtp {
      export type Request = GenerateOtpI;
    }

    export namespace LoadChargeRoute {
      export interface Request {
        country: string;
      }
    }

    export namespace GetVeriffStatus {
      export interface Request {
        email: string;
      }
    }

    export namespace VeriffSessions {
      export interface Request {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any;
      }
    }
  }

  export namespace Banks {
    export namespace GetBanks {
      export interface Request {
        country: Api.Model.CountryInitials;
      }
    }

    export namespace ResolveBankAccount {
      export interface Request {
        AccountNo: string;
        BankCode: string;
      }
    }

    export namespace GetBankBranches {
      export interface Request {
        country: string;
        bankCode: string;
      }
    }

    export namespace GetModulrBanks {
      interface ModulrBankCapacityI {
        type: string;
        status: string;
      }

      export interface ModulrBankI {
        id: string;
        name: string;
        capabilities: ModulrBankCapacityI[];
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: ModulrBankI[];
      }
    }
  }

  export namespace Recipients {
    export namespace GetPaymentTypesByCountry {
      export interface Request {
        country: Api.Model.CountryInitials;
      }
    }

    export namespace GetRecipientById {
      export interface Request {
        id: string;
      }
    }

    export namespace GetRecipientsByType {
      export interface Request {
        type: RecipientType;
      }
    }

    export namespace DeleteRecipientById {
      export interface Request {
        id: string;
      }
    }

    export namespace AddRecipient {
      export interface Request extends Api.Recipient.AddRecipient.Request {
        DateOfBirth: string;
      }
    }
  }

  export namespace Transactions {
    export namespace GetTransactionByTxref {
      export interface Request {
        txref: string;
      }
    }

    export namespace GetTransactionTimestamp {
      export interface Request {
        txref: string;
      }
    }

    export namespace LoadVoucher {
      export interface Request {
        voucher: string;
      }
    }

    export namespace NethoneCheckByTxref {
      export interface Request {
        txref: string;
      }
    }

    export namespace CheckIfPinExists {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: null;
      }
    }

    export namespace CreatePin {
      export interface Request {
        PIN: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: null;
      }
    }

    export namespace ChangePin {
      export interface Request {
        OldPIN: string;
        NewPIN: string;
        Password: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: null;
      }
    }

    export namespace ResetPin {
      export interface Request {
        OTPCode: string;
        NewPIN: string;
        Password: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: null;
      }
    }

    export namespace CreateTransaction {
      interface GiftRequestPayload {
        DeliveryDate: string;
        OrderItemRequests:
          | {
              MerchantId: number | undefined;
              TemplateId: string;
              EventName: string;
              Amount: number;
              Quantity: number;
              RecipientEmail: string;
              RecipientPhone: string;
              RecipientFirstName: string;
              RecipientLastName: string;
            }[]
          | undefined;
      }

      interface WireFxRequest {
        aba: string;
        account: string;
        type: string;
      }

      export interface Request {
        recipientId: number;
        amount: number;
        sendCurrency: Api.Model.CurrencyCode;
        receiveCurrency: Api.Model.CurrencyCode;
        securityQuestion: string;
        securityAnswer: string;
        transferScheduleData?: TransferScheduleDataI;
        gift?: GiftRequestPayload;
        chargeRoute?: string;
        wireFxRequest?: WireFxRequest;
        PIN: string;
        ModulrBank?: string;
        Voucher?: string;
      }
    }
  }

  export namespace Rate {
    export namespace CheckRateSprint {
      export interface Request {
        sendCurrency: string;
        receiveCurrency: string;
        amount?: number;
      }
    }
  }

  export namespace Recurring {
    export namespace RecurringTransactions {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: RecurringTransactionI[];
      }
    }

    export namespace RecurringTransactionsByTxref {
      export interface Request {
        txref: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: RecurringTransactionByTxref[];
      }
    }

    export namespace RecurringIntervals {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: RecurringIntervalObjI[];
      }
    }

    export namespace CancelRecurring {
      export interface Request {
        txref: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: RecurringTransactionI[];
      }
    }

    export namespace ActivateRecurring {
      export interface Request {
        txref: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: RecurringTransactionI[];
      }
    }

    export namespace PauseRecurring {
      export interface Request {
        txref: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: RecurringTransactionI[];
      }
    }
  }

  export namespace Connect {
    export namespace LoadGiftCountries {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftCountries[];
      }
    }

    export namespace LoadGiftCategories {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftCategories[];
      }
    }

    export namespace LoadGiftCategoriesByCountry {
      export interface Request {
        country: Api.Model.CountryInitials | string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftCategories[];
      }
    }

    export namespace LoadGiftMerchants {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftMerchants[];
      }
    }

    export namespace LoadGiftMerchantsByCountry {
      export interface Request {
        country: Api.Model.CountryInitials | string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftMerchants[];
      }
    }

    export namespace LoadGiftMerchantsByCategory {
      export interface Request {
        category: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftMerchants[];
      }
    }

    export namespace LoadGiftMerchantsByCountryAndCategory {
      export interface Request {
        country: Api.Model.CountryInitials | string;
        category: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftMerchants[];
      }
    }

    export namespace LoadGiftCurated {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftMerchants[];
      }
    }

    export namespace LoadGiftCuratedByGroup {
      export interface Request {
        name: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftMerchants[];
      }
    }

    export namespace LoadGiftPopular {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftMerchants[];
      }
    }

    export namespace LoadGiftBestSelling {
      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: GiftMerchants[];
      }
    }
  }

  export namespace Referral {
    export namespace LoadReferralCount {
      export interface ReferralI {
        ReferralCount: number;
      }

      export interface Request {
        email: string;
      }

      export interface Response extends Api.Endpoint.Response.SuccessResponse {
        Data: ReferralI[];
      }
    }
  }
}

export default ClientApi;
