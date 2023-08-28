import { useAddressUpdate } from '@src/hooks';
import { useEffect } from 'react';

const useUpdatePhoneNumber = (isUserVerified: boolean) => {
  const {
    handleChangePhoneNo,
    handlePhoneNumberSuccessClose,
    handleUserDetailsUpdate,
    isPhoneNumberModalShown,
    isPhoneNumberSuccessModalShown,
    phoneUpdateLoading,
    verifyStatus,
    stepsForPhoneUpdate,
    setIsPhoneNumberModalShown,
    handlePhoneNumberClose
  } = useAddressUpdate({
    type: 'phoneUpdate'
  });

  // UPDATE_PHONE key is set on login if there is no phone in the user details
  const phoneSessionStorage = sessionStorage.getItem('UPDATE_PHONE');

  useEffect(() => {
    let timer;
    if (isUserVerified) {
      if (phoneSessionStorage) {
        timer = setTimeout(() => {
          setIsPhoneNumberModalShown(true);
        }, 2000);
      }
    } else {
      clearTimeout(timer);
    }
  }, [phoneSessionStorage]);

  return {
    handleChangePhoneNo,
    handlePhoneNumberSuccessClose,
    handleUserDetailsUpdate,
    isPhoneNumberModalShown,
    isPhoneNumberSuccessModalShown,
    phoneUpdateLoading,
    verifyStatus,
    stepsForPhoneUpdate,
    setIsPhoneNumberModalShown,
    handlePhoneNumberClose
  };
};

export default useUpdatePhoneNumber;
