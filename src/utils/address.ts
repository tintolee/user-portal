import Api from '@sendsprint/api-types';

export const getPostCodeLabel = (country: Api.Model.CountryInitials | string): string => {
  switch (country) {
    case Api.Model.CountryInitials.Canada:
      return 'Postal code';
    case Api.Model.CountryInitials.UnitedStates:
      return 'Zip code';
    case Api.Model.CountryInitials.UnitedKingdom:
      return 'Postcode';
    default:
      return 'Post code';
  }
};

export const getCountryNameFromInitials = (country: Api.Model.CountryInitials) => {
  if (country === Api.Model.CountryInitials.Canada) return 'Canada';
  if (country === Api.Model.CountryInitials.UnitedKingdom) return 'United Kingdom';
  if (country === Api.Model.CountryInitials.UnitedStates) return 'United States';
  if (country === Api.Model.CountryInitials.Ghana) return 'Ghana';
  if (country === Api.Model.CountryInitials.Kenya) return 'Kenya';
  if (country === Api.Model.CountryInitials.SouthAfrica) return 'South Africa';

  return 'Nigeria';
};
