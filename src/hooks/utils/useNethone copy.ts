import { useEnv } from '@src/contexts';
import loadjs from 'loadjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNethoneCheckMutation } from '../queries';

interface ExtendWindow extends Window {
  dftp?: any;
  profileCompleted?: any;
}

interface ExportedObjI {
  dftpPromise: Promise<void> | null;
  handleNethoneProfileCompleted: (() => void) | null;
  isNethoneCheck: boolean;
  isNethoneFailed: boolean;
}

const useNethone = (txref: string) => {
  const [isNethoneCheck, setIsNethoneCheck] = useState(false);
  const [isNethoneFailed, setIsNethoneFailed] = useState(false);
  const [usedTxref, setUsedTxref] = useState(txref);

  const { NETHONE_SRC } = useEnv();
  const nethoneMutation = useNethoneCheckMutation();

  const options = useMemo(
    () => ({
      attemptReference: `${usedTxref}`, // inserted by the backend
      sensitiveFields: ['ccn', 'cvv'] // list of sensitive fields
    }),
    [usedTxref]
  );

  const handleLoad = useCallback(async () => {
    try {
      await loadjs(NETHONE_SRC, {
        returnPromise: true,
        before: (path, scriptEl: HTMLScriptElement) => (scriptEl.crossOrigin = 'use-credentials')
      });
    } catch (error) {
      console.error(error, 'err');
    }
  }, [NETHONE_SRC]);

  const handleInit = useCallback(() => {
    if ((window as ExtendWindow)?.dftp) {
      (window as ExtendWindow).dftp?.init(options);
    }
  }, [options]);

  const handleNethoneCheck = useCallback(async () => {
    try {
      const nethoneData = await nethoneMutation.mutateAsync({ txref: usedTxref });

      if (nethoneData?.ResponseMessage === 'Successful') {
        setIsNethoneCheck(true);
        setIsNethoneFailed(false);
      }
    } catch (error) {
      console.log(error);
      setIsNethoneFailed(true);
      setIsNethoneCheck(false);
    }
  }, [usedTxref]);

  //   to load the script and add dftp to the window object
  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  useEffect(() => {
    // if (volumeTxref) {
    //   setUsedTxref(volumeTxref);
    // } else
    if (txref) {
      setUsedTxref(txref);
    }
  }, [txref]);

  // effect to initialize profiler
  useEffect(() => {
    if (usedTxref) {
      handleInit();
    }
  }, [usedTxref, handleInit]);

  // effect to delay nethone check by 4s
  useEffect(() => {
    let timer: NodeJS.Timer;
    const NETHONE_DELAY_TIME = 4000;

    if (usedTxref) {
      timer = setTimeout(() => {
        handleNethoneCheck();
      }, NETHONE_DELAY_TIME);
    }

    return () => clearTimeout(timer);
  }, [usedTxref, handleNethoneCheck]);

  const exportedObj: ExportedObjI = {
    dftpPromise: null,
    handleNethoneProfileCompleted: null,
    isNethoneCheck,
    isNethoneFailed
  };

  return { ...exportedObj };
};

export default useNethone;
