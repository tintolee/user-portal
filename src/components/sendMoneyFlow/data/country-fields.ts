import ClientApi from '@src/types/client';

export const ghanaBankAccFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'bankCode',
  'branchCode',
  'accountNumber',
  'address',
  'email',
  'phoneNumber',
  'birthday'
];

export const ghanaMobileFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'bankCode',
  'address',
  'email',
  'phoneNumber',
  'birthday'
];

export const kenyaMobileFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'address',
  'email',
  'phoneNumber',
  'birthday'
];

export const kenyaBankFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'address',
  'email',
  'phoneNumber',
  'bankCode',
  'accountNumber',
  'birthday'
];

export const southAfricaBankFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'address',
  'email',
  'phoneNumber',
  'bankCode',
  'accountNumber',
  'birthday'
];

export const nigeriaCashFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'address',
  'email',
  'phoneNumber',
  'bankCode',
  // 'accountNumber',
  'birthday'
];

export const nigeriaDomAccFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'address',
  'email',
  'phoneNumber',
  'bankCode',
  'accountNumber',
  'accountName',
  'routingNumber',
  'birthday'
];

export const nigeriaVDomAccFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'address',
  'email',
  'phoneNumber',
  'birthday'
];

export const newNigeriaBankFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'address',
  'email',
  'phoneNumber',
  'bankCode',
  'accountNumber',
  'accountName',
  'birthday'
];

export const nigeriaADomAccFormFields = [
  'firstName',
  'middleName',
  'lastName',
  'address',
  'email',
  'phoneNumber',
  'bankCode',
  'accountNumber',
  'accountName',
  'birthday'
];

export const resolveCountryFields = (paymentType: ClientApi.RecipientType) => {
  switch (paymentType) {
    case ClientApi.RecipientType.GH_BANK:
      return ghanaBankAccFormFields;
    case ClientApi.RecipientType.GH_MOBILE:
      return ghanaMobileFormFields;
    case ClientApi.RecipientType.KE_MOBILE:
      return kenyaMobileFormFields;
    case ClientApi.RecipientType.KE_BANK:
      return kenyaBankFormFields;
    case ClientApi.RecipientType.NG_CASH:
      return nigeriaCashFormFields;
    case ClientApi.RecipientType.NG_DOM:
      return nigeriaDomAccFormFields;
    case ClientApi.RecipientType.NG_V_DOM:
      return nigeriaVDomAccFormFields;
    case ClientApi.RecipientType.NG_A_DOM:
      return nigeriaADomAccFormFields;
    case ClientApi.RecipientType.NEW_NG_BANK:
      return newNigeriaBankFormFields;
    case ClientApi.RecipientType.ZA_BANK:
      return southAfricaBankFormFields;

    default:
      return [];
  }
};
