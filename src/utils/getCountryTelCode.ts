import Api from '@sendsprint/api-types';

const getCountryTelCode = (country: Api.Model.CountryInitials) => {
  let telCode = '';

  switch (country) {
    case Api.Model.CountryInitials.Canada:
      telCode = '+1';
      break;

    case Api.Model.CountryInitials.UnitedKingdom:
      telCode = '+44';
      break;

    case Api.Model.CountryInitials.UnitedStates:
      telCode = '+1';
      break;

    case Api.Model.CountryInitials.Ghana:
      telCode = '+233';
      break;

    case Api.Model.CountryInitials.Kenya:
      telCode = '+254';
      break;

    case Api.Model.CountryInitials.Nigeria:
      telCode = '+234';
      break;

    case Api.Model.CountryInitials.SouthAfrica:
      telCode = '+27';
      break;
    default:
      telCode = '+44';
      break;
  }

  return telCode;
};

const addTelCode = (country: Api.Model.CountryInitials, phone: string) => {
  return `${getCountryTelCode(country)}${phone}`;
};

const removeTelCodeFromNumber = (country: Api.Model.CountryInitials, phoneNumber: string) => {
  const telCode = getCountryTelCode(country);
  const telCodeLength = telCode.length;

  return phoneNumber.includes(telCode) ? phoneNumber.slice(telCodeLength) : phoneNumber;
};

export { getCountryTelCode, addTelCode, removeTelCodeFromNumber };
