import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '@src/navigations/routes';
import { PaymentType } from '@src/pages/callbacks/paymentSuccess';
import { useConnect } from '@src/contexts';

interface Props {
  markPageAsClean: () => void;
  variant?: PaymentType;
}

const ModulrPrompt = ({ markPageAsClean, variant }: Props) => {
  const navigate = useNavigate();
  const { handleClearCart } = useConnect();

  const url =
    variant === 'gift'
      ? `${Path.PaymentSuccess}?isModulr=true&paymentType=gift`
      : `${Path.PaymentSuccess}?isModulr=true`;

  useEffect(() => {
    window.addEventListener('storage', () => {
      const modulrCallbackFromStorage = localStorage.getItem('modulr-callback');

      if (modulrCallbackFromStorage) {
        localStorage.removeItem('modulr-callback');
        markPageAsClean();

        setTimeout(() => {
          markPageAsClean();
          handleClearCart();
          navigate(url);
        }, 1000);
      }
    });
  }, []);

  return null;
};

export default ModulrPrompt;
