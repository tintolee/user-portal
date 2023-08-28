import React, { useMemo, FC } from 'react';
import Api from '@sendsprint/api-types';
import { useGetBanks } from '@src/hooks/queries';
import { Skeleton } from '@sendsprint/ui-react';

type ResolveBankNameProps = {
  country: Api.Model.CountryInitials;
  code: Api.Model.BankCode;
};

const ResolveBankName: FC<ResolveBankNameProps> = ({ country, code }) => {
  const { data: banks = [], isLoading } = useGetBanks({ country });
  const bank = useMemo(() => {
    return banks.find((b) => b.code === code);
  }, [code, banks]);

  if (isLoading) {
    return <Skeleton />;
  }

  return <>{bank?.name || ''}</>;
};

export type { ResolveBankNameProps };
export default ResolveBankName;
