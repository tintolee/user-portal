import React, { useMemo, FC } from 'react';
import Api from '@sendsprint/api-types';
import { useGetBanks, useGetBankBranches } from '@src/hooks';
import { Skeleton } from '@sendsprint/ui-react';

type ResolveBankBranchNameProps = {
  country: Api.Model.CountryInitials;
  bankCode: Api.Model.BankCode;
  branchCode: Api.Model.BranchCode;
};

const ResolveBankBranchName: FC<ResolveBankBranchNameProps> = ({
  country,
  bankCode,
  branchCode
}) => {
  const { data: banks = [], isLoading: isBankLoading } = useGetBanks({ country });

  const bank = useMemo(() => {
    return banks.find((b) => b.code === bankCode);
  }, [bankCode, banks]);

  const { data: branches = [], isLoading: isBranchLoading } = useGetBankBranches(
    {
      bankCode: bank?.code as string,
      country
    },
    {
      enabled: !!bank
    }
  );

  const branch = useMemo(() => {
    return branches.find((b) => b.code === branchCode);
  }, [branchCode, branches]);

  if (isBankLoading || !bank || isBranchLoading || !branch) {
    return <Skeleton />;
  }

  return <>{branch?.name || ''}</>;
};

export type { ResolveBankBranchNameProps };
export default ResolveBankBranchName;
