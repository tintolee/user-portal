import Api from '@sendsprint/api-types';
import { useGetRecipientById } from '@src/hooks';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import { format } from 'date-fns';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGeneralStatus, getStatusName } from '../utils';

interface UseTransactionRowOptions {
  item: ClientApi.Transaction;
  handleOpenModal?: () => void;
  as?: 'link' | 'button';
}

const useTransactionRow = (options: UseTransactionRowOptions) => {
  const { item, handleOpenModal, as } = options;
  const { recipientId, createdDate, status, txRef } = item;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: recipient } = useGetRecipientById({
    id: recipientId.toString()
  });

  const formattedDate = format(createdDate, 'MMM dd, hh:mm a');
  const displayedStatus = getStatusName(getGeneralStatus(status));
  const transactionType =
    recipient && recipient.paymentType === Api.Model.PaymentType.GiftCard ? 'gift' : 'money';

  const handleOpenTransactionModal = () => {
    if (handleOpenModal) {
      setSearchParams({
        txref: txRef,
        type: transactionType
      });

      handleOpenModal();
    }
  };

  const handleRoute = () => {
    navigate(`${Path.TransferHistory}?txref=${txRef}&type=${transactionType}`);
  };

  const handleClick = () => {
    if (as && as === 'link') {
      handleRoute();
    } else {
      handleOpenTransactionModal();
    }
  };

  return { handleClick, recipient, formattedDate, displayedStatus };
};

export default useTransactionRow;
