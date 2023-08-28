import ClientApi from '@src/types/client';
import Api from '@sendsprint/api-types';

export type RecipientTypeOptions = {
  country: Api.Model.CountryInitials;
  paymentType: Api.Model.PaymentType;
};

const RECIPIENT_TYPE_MAPPING: Record<ClientApi.RecipientType, RecipientTypeOptions> = {
  [ClientApi.RecipientType.NEW_NG_BANK]: {
    country: Api.Model.CountryInitials.NigeriaNig,
    paymentType: Api.Model.PaymentType.BankAcc
  },
  [ClientApi.RecipientType.NG_DOM]: {
    country: Api.Model.CountryInitials.Nigeria,
    paymentType: Api.Model.PaymentType.DomAcc
  },
  [ClientApi.RecipientType.NG_V_DOM]: {
    country: Api.Model.CountryInitials.Nigeria,
    paymentType: Api.Model.PaymentType.VDomAcc
  },
  /** Auto dom */
  [ClientApi.RecipientType.NG_A_DOM]: {
    country: Api.Model.CountryInitials.Nigeria,
    paymentType: Api.Model.PaymentType.ADomAcc
  },
  [ClientApi.RecipientType.NG_CASH]: {
    country: Api.Model.CountryInitials.Nigeria,
    paymentType: Api.Model.PaymentType.Cash
  },
  [ClientApi.RecipientType.GH_BANK]: {
    country: Api.Model.CountryInitials.Ghana,
    paymentType: Api.Model.PaymentType.BankAcc
  },
  [ClientApi.RecipientType.GH_MOBILE]: {
    country: Api.Model.CountryInitials.Ghana,
    paymentType: Api.Model.PaymentType.MobileMoney
  },
  [ClientApi.RecipientType.KE_BANK]: {
    country: Api.Model.CountryInitials.Kenya,
    paymentType: Api.Model.PaymentType.BankAcc
  },
  [ClientApi.RecipientType.KE_MOBILE]: {
    country: Api.Model.CountryInitials.Kenya,
    paymentType: Api.Model.PaymentType.MobileMoney
  },
  [ClientApi.RecipientType.ZA_BANK]: {
    country: Api.Model.CountryInitials.SouthAfrica,
    paymentType: Api.Model.PaymentType.BankAcc
  }
};

export const getRecipientTypeFromMapping = ({
  country,
  paymentType
}: RecipientTypeOptions): ClientApi.RecipientType | null => {
  const type = Object.keys(RECIPIENT_TYPE_MAPPING).find((t) => {
    const obj = RECIPIENT_TYPE_MAPPING[t as ClientApi.RecipientType];
    return obj.paymentType === paymentType && obj.country === country;
  });

  return (type as ClientApi.RecipientType) || null;
};

export const getOptionsFromRecipientType = (
  type: ClientApi.RecipientType
): RecipientTypeOptions => {
  return RECIPIENT_TYPE_MAPPING[type];
};
