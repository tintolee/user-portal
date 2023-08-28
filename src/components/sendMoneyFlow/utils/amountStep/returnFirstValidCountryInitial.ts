import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { isAValidCountry } from '@src/utils/country';

/** Return the first valid country initial from the list of provided initials. If there is none, return undefined */
const returnFirstValidCountryInitial = (
  countries: (ClientApi.SendCountry | ClientApi.ReceiveCountry)[],
  countryInitials: (Api.Model.CountryInitials | undefined)[]
): Api.Model.CountryInitials | undefined => {
  return countryInitials.find((c) => {
    return !!(c && isAValidCountry(countries, c));
  });
};

export default returnFirstValidCountryInitial;
