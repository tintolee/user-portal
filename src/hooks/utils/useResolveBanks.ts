import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';
import { useEffect, useState } from 'react';
import {
  useGetBankBranches,
  useGetBanks,
  useGetBanksForAutoDom
  //   useGetBanksForCashPickup,
  //   useGetBanksGh
} from '../queries';

interface UseResolveBanksOptions {
  country: Api.Model.CountryInitials;
  paymentType: ClientApi.RecipientType | null | undefined;
  branchCode: string;
}

const useResolveBanks = ({ country, paymentType, branchCode }: UseResolveBanksOptions) => {
  const [resolvedBanks, setResolvedBanks] = useState<ClientApi.Bank[]>([]);
  const [areBanksLoading, setAreBanksLoading] = useState(false);

  const { data: banks = [], isLoading: banksLoading } = useGetBanks(
    { country: country },
    { enabled: !!country || false }
  );

  //   const { data: banksForCashPickup = [], isLoading: banksForCashPickupLoading } =
  //     useGetBanksForCashPickup({
  //       enabled: paymentType === 'NG-CASH'
  //     });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { data: banksForAutoDom = [], isLoading: banksForAutoDomLoading } = useGetBanksForAutoDom({
    enabled: paymentType === 'NG-A-DOM'
  });
  //   const { data: banksForGh = [], isLoading: banksForGhLoading } = useGetBanksGh(
  //     {
  //       type: paymentType === 'GH-BANK' ? 'bank' : 'mobile',
  //       options: { country: country || ('' as Api.Model.CountryInitials) }
  //     },
  //     {
  //       enabled: country === Api.Model.CountryInitials.Ghana || false
  //     }
  //   );

  const { data: bankBranches = [], isLoading: bankBranchesLoading } = useGetBankBranches(
    {
      bankCode: branchCode || '',
      country: country || ''
    },
    { enabled: !!branchCode }
  );

  useEffect(() => {
    if (!paymentType) return;

    if (paymentType === 'NG-A-DOM') {
      if (!banksForAutoDom.length) return;
      setResolvedBanks(banksForAutoDom);
      setAreBanksLoading(banksLoading);
    } else {
      if (!banks.length) return;
      setResolvedBanks(banks);
      setAreBanksLoading(banksLoading);
    }
  }, [paymentType, banks, banksForAutoDom]);

  return { resolvedBanks, areBanksLoading, bankBranches, bankBranchesLoading };
};

export default useResolveBanks;
