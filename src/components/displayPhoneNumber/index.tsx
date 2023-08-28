import React, { FC } from 'react';
import Api from '@sendsprint/api-types';
import ResolveCountryProperty from '@src/components/resolveCountryProperty';
import { formatIntl } from '@src/utils/phone';

type DisplayPhoneNumberProps = {
  country: Api.Model.CountryInitials;
  phoneNumber: string;
};

const DisplayPhoneNumber: FC<DisplayPhoneNumberProps> = ({ country, phoneNumber }) => {
  return (
    <>
      <ResolveCountryProperty countryInitials={country} propertyName="telCode" />
      {formatIntl(phoneNumber)}
    </>
  );
};

export type { DisplayPhoneNumberProps };
export default DisplayPhoneNumber;
