import { useAppLocation } from '@src/hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Path } from './routes';

interface Props {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ isAuthenticated }) => {
  const { pathname } = useAppLocation();

  if (!isAuthenticated) {
    /** this is used to get the page the user wanted to go to initially
     *  after getting it, we send it as state to the login page
     *  after successful login, we can take it from the state in the login page and redirect the user there
     */

    const previousPage = pathname;

    return <Navigate to={Path.Login} state={{ from: previousPage }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
