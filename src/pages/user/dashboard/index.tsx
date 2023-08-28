import DashboardLayout from '@src/layouts/dashboard';
import React from 'react';
import DashboardInner from './DashboardInner';

const Dashboard = () => {
  return (
    <DashboardLayout pageTitle="Dashboard">
      <DashboardInner />
    </DashboardLayout>
  );
};

export default Dashboard;
