import { useEffect, useState } from 'react';

interface UseShowNoResultOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  delay?: number;
}

/**
 * The aim of this hook is to slightly delay the no result screen so that
 * it won't show up before the list in the pages
 */
const useShowNoResult = ({ data, delay = 100 }: UseShowNoResultOptions) => {
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (data) {
      if (!data.length) {
        timer = setTimeout(() => {
          setShowNoResult(true);
        }, delay);
      } else {
        setShowNoResult(false);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  return { showNoResult };
};

export default useShowNoResult;
