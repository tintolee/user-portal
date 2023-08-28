import Api from '@sendsprint/api-types';

// export const getCurrencySymbol = (country: Api.Model.CountryInitials | string | undefined) => {
//   let currency = '';

//   switch (country) {
//     case Api.Model.CountryInitials.Canada || 'CA':
//       currency = 'CA$';
//       break;
//     case Api.Model.CountryInitials.Ghana || 'GH':
//       currency = 'GH₵';
//       break;
//     case Api.Model.CountryInitials.Kenya || 'KE':
//       currency = 'KES';
//       // currency = "KSh";
//       break;
//     case Api.Model.CountryInitials.Nigeria || 'NG':
//       currency = '₦';
//       break;
//     case Api.Model.CountryInitials.SouthAfrica || 'ZA':
//       currency = 'R';
//       break;
//     case Api.Model.CountryInitials.UnitedKingdom || 'GB':
//       currency = '£';
//       break;
//     case Api.Model.CountryInitials.UnitedStates || 'US':
//       currency = '$';
//       break;
//     default:
//       currency = '$';
//       break;
//   }

//   return currency;
// };

export const getCurrencySymbol = (country: Api.Model.CountryInitials | string | undefined) => {
  let currency = '';

  switch (country) {
    case Api.Model.CountryInitials.Canada:
      currency = 'CAD';
      break;
    case Api.Model.CountryInitials.Ghana:
      currency = 'GHS';
      break;
    case Api.Model.CountryInitials.Kenya:
      currency = 'KES';
      // currency = "KSh";
      break;
    case Api.Model.CountryInitials.Nigeria:
    case Api.Model.CountryInitials.NigeriaNig:
      currency = 'NGN';
      break;
    case Api.Model.CountryInitials.SouthAfrica:
      currency = 'ZAR';
      break;
    case Api.Model.CountryInitials.UnitedKingdom:
      currency = 'GBP';
      break;
    case Api.Model.CountryInitials.UnitedStates:
      currency = 'USD';
      break;
    default:
      currency = 'USD';
      break;
  }

  return currency;
};
