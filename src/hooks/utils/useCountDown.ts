import { useCallback, useEffect, useState } from 'react';

interface CountDownOptionsI {
  countDownValue?: number;
  delay?: number;
  isPaused?: boolean;
}

const useCountDown = (options?: CountDownOptionsI) => {
  const [countDown, setCountDown] = useState(options?.countDownValue || 60);
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState<number>();

  const handleStartTimer = useCallback(() => {
    // clearTimeout(timer);

    const timerRef = setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, options?.delay || 1000);

    setTimer(timerRef as unknown as number);
    setIsStarted(true);
  }, [options?.delay]);

  const handleResetTimer = useCallback(() => {
    clearTimeout(timer);
    setCountDown(options?.countDownValue || 60);
    setIsStarted(false);
    // handleStartTimer();
  }, [options?.countDownValue, timer]);

  const handleStopTimer = () => clearTimeout(timer);

  const handleReset = () => {
    setCountDown(options?.countDownValue || 60);
    handleStartTimer();
  };

  useEffect(() => {
    if (options?.countDownValue) {
      setCountDown(options.countDownValue);
    }
  }, [options?.countDownValue]);

  useEffect(() => {
    if (isStarted) {
      if (countDown <= 0) {
        setCountDown(options?.countDownValue || 60);
        setIsStarted(false);
        handleStopTimer();
      } else {
        handleStartTimer();
      }
    }

    return () => handleStopTimer();
  }, [countDown]);

  // useEffect(() => {
  //   if (isSettled && !options?.isPaused) {
  //     if (isStarted) {
  //       if (countDown <= 0) {
  //         setCountDown(0);
  //       } else {
  //         handleStartTimer();
  //       }
  //     }
  //   }

  //   return () => handleStopTimer();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   countDown,
  //   isSettled,
  //   options?.isPaused,
  //   options?.delay,
  //   isStarted,
  //   handleStartTimer,
  // ]);

  return {
    countDown,
    handleResetTimer,
    handleStartTimer,
    handleStopTimer,
    isStarted,
    handleReset
  };
};

export default useCountDown;
