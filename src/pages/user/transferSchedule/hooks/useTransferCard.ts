import { useToasts } from '@src/contexts';
import {
  useActivateRecurring,
  useCancelRecurring,
  useLoadUserRecurringTransactionByTxref,
  useMedia,
  usePauseRecurring
} from '@src/hooks';
import ClientApi from '@src/types/client';
import { transformString } from '@src/utils/recurring';
import { useEffect, useState } from 'react';
import { CardData } from '../components/transferCard';

interface UseTransferCardOptions {
  item: ClientApi.RecurringTransactionI;
  handleRetry: () => void;
}

const useTransferCard = (options: UseTransferCardOptions) => {
  const { item, handleRetry } = options;

  const { MaskedPAN, TxRef } = item;

  const [cardData, setCardData] = useState<CardData>();
  const [status, setStatus] = useState('');
  const [showMore, setShowMore] = useState(false);

  const { isMobile } = useMedia();

  const handleToggle = () => setShowMore(!showMore);
  const { addToast } = useToasts();

  const { data, isLoading, refetch } = useLoadUserRecurringTransactionByTxref({
    txref: TxRef
  });

  const { mutate, isLoading: cancelLoading } = useCancelRecurring({
    onSuccess: () => {
      addToast({ body: 'Cancelled Successfully' });
      setStatus('Cancelled');

      handleToggle();
      refetch();
      handleRetry();
    }
  });

  const { mutate: activateMutate, isLoading: activateLoading } = useActivateRecurring({
    onSuccess: () => {
      addToast({ body: 'Activated Successfully' });
      setStatus('Active');

      handleToggle();
      refetch();
      handleRetry();
    }
  });

  const { mutate: pauseMutate, isLoading: pauseLoading } = usePauseRecurring({
    onSuccess: () => {
      addToast({ body: 'Paused Successfully' });
      setStatus('Active');

      handleToggle();
      refetch();
      handleRetry();
    }
  });

  const handleCancel = () => {
    mutate({
      txref: TxRef
    });
  };

  const handleActivate = () => {
    activateMutate({
      txref: TxRef
    });
  };

  const handlePause = () => {
    pauseMutate({
      txref: TxRef
    });
  };

  useEffect(() => {
    if (data) {
      const payload = data[0].Payload;
      const parsedPayload: CardData = JSON.parse(payload);

      setStatus(parsedPayload.status);

      setCardData({
        ...parsedPayload,
        status: data[0].Status,
        interval: transformString(parsedPayload.interval as ClientApi.RecurringIntervalI)
      });
    }
  }, [data]);

  const nameLength = isMobile ? 18 : 23;
  const name =
    cardData && cardData?.name?.length > nameLength
      ? cardData?.name.slice(0, nameLength) + '...'
      : cardData?.name;

  const cardDetails = MaskedPAN ? '....' + MaskedPAN.slice(-4) : '';

  return {
    cardDetails,
    handlePause,
    handleActivate,
    handleCancel,
    status,
    isLoading,
    cancelLoading,
    activateLoading,
    pauseLoading,
    name,
    cardData
  };
};

export default useTransferCard;
