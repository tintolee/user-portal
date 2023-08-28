import { useToggle } from '@src/hooks';
import { DashboardLayout } from '@src/layouts';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DealsHeader } from './components';
import DealDetails from './components/dealDetails';
import DealsGrid from './components/dealsGrid';
import { dealsData } from './data';
import { useFilterDeals } from './hooks';

const Deals = () => {
  const [search, setSearch] = useState('');
  const { handleFalse, handleTrue, state } = useToggle();

  const [searchParams, setSearchParams] = useSearchParams();
  const idQuery = searchParams.get('id');

  const { filteredData, handleSetRedeemed, handleSetSender } = useFilterDeals({ data: dealsData });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  useEffect(() => {
    if (idQuery) {
      handleTrue();
    }
  }, [idQuery]);

  const handleModalClose = () => {
    handleFalse();

    searchParams.delete('id');
    setSearchParams(searchParams);
  };

  return (
    <DashboardLayout pageTitle="Deals and Rewards">
      <DealsHeader
        handleSetRedeemed={handleSetRedeemed}
        handleSetSender={handleSetSender}
        handleSearch={handleSearch}
        search={search}
      />
      <DealsGrid data={filteredData} />
      <DealDetails
        idQuery={idQuery}
        data={dealsData}
        handleClose={handleModalClose}
        isOpen={state}
      />
    </DashboardLayout>
  );
};

export default Deals;
