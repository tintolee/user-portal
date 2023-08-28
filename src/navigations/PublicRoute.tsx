import useGetSendMoneyDetailsFromWebsite from '@src/pages/auth/register/hooks/useGetSendMoneyDetailsFromWebsite';
import { resolveQueryLink } from '@src/utils';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Path } from './routes';

interface Props {
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<Props> = ({ isAuthenticated }) => {
  const {
    receiveCountry,
    sendAmount,
    sendCountry,
    cartFromQuery,
    connectQuery,
    recipientCurrency,
    senderCurrency,
    totalAmountFromQuery,
    totalAmountPlusFeeFromQuery,
    rateFromQuery
  } = useGetSendMoneyDetailsFromWebsite();

  if (isAuthenticated) {
    /**
     * when logged in and send money info is sent from the website, this handles the route to the send money page
     */
    if (receiveCountry && sendAmount && sendCountry) {
      return (
        <Navigate
          state={{
            sendFromWebsite: {
              receiveCountry,
              sendAmount,
              sendCountry
            }
          }}
          to={Path.SendMoney}
        />
      );
    }

    /**
     * when logged in and connect info is sent from the website, this handles the route to the connect page
     */
    if (cartFromQuery && connectQuery && recipientCurrency && senderCurrency) {
      const connectUrl = `${Path.Connect}${resolveQueryLink({
        cartFromQuery,
        connectQuery,
        recipientCurrency,
        senderCurrency,
        totalAmountFromQuery,
        totalAmountPlusFeeFromQuery,
        rateFromQuery,
        campaignIdQuery: '',
        receiveCountry: '',
        sendAmount: '',
        sendCountry: ''
      })}`;

      return <Navigate to={connectUrl} />;
    }

    /**
     * When logged in we want the public pages like login etc, to be directed to the dashboard
     */
    return <Navigate to={Path.Dashboard} />;
  }

  return <Outlet />;
};

export default PublicRoute;
