import { useEffect, useState } from 'react';

interface UseDelayOptions {
  delay?: number;
}

const useDelay = (options?: UseDelayOptions) => {
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSettled(true);
    }, options?.delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [options?.delay]);

  return { isSettled };
};

export default useDelay;
