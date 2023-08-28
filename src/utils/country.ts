import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';

type Countries = (ClientApi.SendCountry | ClientApi.ReceiveCountry)[];
type CountryInitials = Api.Model.CountryInitials;

/** Check if a country initial exists in the provided list of countries */
const isAValidCountry = (countries: Countries, countryInitial: CountryInitials): boolean => {
  return !!countries.find((c) => c.initials === countryInitial);
};

export { isAValidCountry };
