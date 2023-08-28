import { useMedia } from '@src/hooks';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import { isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resolvePaymentType } from '../utils';

interface UseRecipientRowOptions {
  recipient: ClientApi.Recipient;
  as?: 'link' | 'button';
  onClick?: () => void;
}

const useRecipientRow = (options: UseRecipientRowOptions) => {
  const { recipient, as, onClick } = options;
  const { country, paymentType, dateOfBirth } = recipient;

  const [isBirthdayShown, setIsBirthdayShown] = useState(false);
  const navigate = useNavigate();

  const { isDesktop } = useMedia();

  const recipientType = resolvePaymentType({ country, paymentType });

  useEffect(() => {
    if (isDesktop) {
      setIsBirthdayShown(false);
    } else {
      setIsBirthdayShown(true);
    }
  }, [isDesktop]);

  const handleDate = () => {
    if (!dateOfBirth) return false;

    return isSameDay(new Date(), new Date(dateOfBirth));
  };

  const isBirthdayToday = handleDate();

  const handleRoute = () => {
    navigate(`${Path.Recipients}?id=${recipient.id}`);
  };

  const handleClick = () => {
    if (as && as === 'link') {
      handleRoute();
    } else {
      if (onClick) {
        onClick();
      }
    }
  };

  return {
    isBirthdayToday,
    isBirthdayShown,
    setIsBirthdayShown,
    handleClick,
    isDesktop,
    recipientType
  };
};

export default useRecipientRow;
