import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';

export const mapReceiveCountries = (receiveCountries: ClientApi.ReceiveCountry[]) =>
  receiveCountries.map((country) => {
    if (country.initials === Api.Model.CountryInitials.NigeriaNig) {
      return {
        ...country,
        name: 'Nigeria (NGN)'
      };
    }

    if (country.initials === Api.Model.CountryInitials.Nigeria) {
      return {
        ...country,
        name: 'Nigeria (USD)'
      };
    }
    return country;
  });
