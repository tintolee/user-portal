import { useDashboardContext, useToasts } from '@src/contexts';
import { useCheckIfPinExists, useCreatePin, useToggle } from '@src/hooks';
import { useEffect, useState } from 'react';
import { FirstTimeUserFormI } from '../authenticationCode/FirstTimeUser';
import { RegularUserFormI } from '../authenticationCode/RegularUser';

interface UseTransactionPinOptionsI {
  // eslint-disable-next-line no-unused-vars
  handleFirstTimeCallback?: (values: FirstTimeUserFormI) => void | Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handleRegularCallback?: (values: RegularUserFormI) => void | Promise<boolean>;
  txRef: string | undefined;
  isNethoneCheck: boolean;
}

const useTransactionPin = (options?: UseTransactionPinOptionsI) => {
  const [isPinAvailable, setIsPinAvailable] = useState(false);
  const { state: isOpen, handleFalse: handleModalFalse, handleTrue } = useToggle();
  const {
    state: isVeriffOpen,
    handleFalse: handleVeriffClose,
    handleTrue: handleVeriffOpen
  } = useToggle();
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);
  const { isUserVerified } = useDashboardContext();

  const isTransactionComplete =
    isTransactionSuccessful && options?.txRef && options?.isNethoneCheck;

  const toast = useToasts();

  const { mutateAsync: createPinMutate, isLoading: createPinLoading } = useCreatePin({
    onSuccess: () => {
      toast.addToast({ body: 'Code created successfully' });
    }
  });

  const { mutate: checkPinMutate, isLoading: checkPinLoading } = useCheckIfPinExists({
    onSuccess: () => {
      handleTrue();
      setIsPinAvailable(true);
    },
    onError: () => {
      handleTrue();
      setIsPinAvailable(false);
    }
  });

  useEffect(() => {
    if (isTransactionComplete) {
      handleModalClose();
    }
  }, [isTransactionComplete]);

  const handleCheckPin = () => {
    if (!isUserVerified) {
      return handleVeriffOpen();
    }

    checkPinMutate({});
  };

  const handleModalClose = () => {
    setIsTransactionSuccessful(false);
    handleModalFalse();
  };

  const handleFirstTimeSubmit = async (values: FirstTimeUserFormI) => {
    try {
      const res = await createPinMutate({
        PIN: values.code
      });

      if (res.ResponseMessage === 'Successful') {
        if (options?.handleFirstTimeCallback) {
          const res = await options.handleFirstTimeCallback(values);

          if (res) {
            setIsTransactionSuccessful(true);
          }
        }
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const handleRegularSubmit = async (values: RegularUserFormI) => {
    if (options?.handleRegularCallback) {
      const res = await options.handleRegularCallback(values);

      if (res) {
        setIsTransactionSuccessful(true);
      }
    }
  };

  return {
    isPinAvailable,
    isOpen,
    handleCheckPin,
    handleModalClose,
    handleFirstTimeSubmit,
    handleRegularSubmit,
    createPinLoading,
    checkPinLoading,
    isTransactionComplete,
    handleVeriffClose,
    isVeriffOpen
  };
};

export default useTransactionPin;
