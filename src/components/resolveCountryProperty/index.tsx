import React, { useMemo, FC } from 'react';
import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { useGetSendCountries, useGetReceiveCountries } from '@src/hooks/queries';
import { Skeleton } from '@sendsprint/ui-react';

type ResolveCountryPropertyProps = {
  countryInitials: Api.Model.CountryInitials;
  propertyName: Exclude<
    keyof (ClientApi.SendCountry | ClientApi.ReceiveCountry),
    'initials' | 'id'
  >;
};

/**
 * Resolve and display a property of SendCountry or ReceiveCountry
 */
const ResolveCountryProperty: FC<ResolveCountryPropertyProps> = ({
  countryInitials,
  propertyName
}) => {
  const { data: sData = [], isLoading: isSLoading } = useGetSendCountries();
  const { data: rData = [], isLoading: isRLoading } = useGetReceiveCountries();

  const country = useMemo(() => {
    return [...sData, ...rData].find((c) => c.initials === countryInitials);
  }, [countryInitials, sData, rData]);

  const isLoading = isSLoading || isRLoading;

  if (isLoading) {
    return <Skeleton />;
  }

  return <>{(country && country[propertyName]) || ''}</>;
};

export type { ResolveCountryPropertyProps };
export default ResolveCountryProperty;
