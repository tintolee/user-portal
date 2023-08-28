import { useNethoneCheckMutation } from '@src/hooks';
import { isUndefined } from '@src/utils/type';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useEnv } from './env-context';
import loadjs from 'loadjs';

interface NethoneContext {
  handleSetNethoneTxref: (txref: string) => void;
  isNethoneCheck: boolean;
  isNethoneFailed: boolean;
}

interface ExtendWindow extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dftp?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileCompleted?: any;
}

interface ProfilerOptions {
  attemptReference: string;
  sensitiveFields: string[];
}

const Context = createContext<NethoneContext | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NethoneProvider = (props: React.PropsWithChildren<any>) => {
  const [isNethoneCheck, setIsNethoneCheck] = useState(false);
  const [isNethoneFailed, setIsNethoneFailed] = useState(false);
  const [usedTxref, setUsedTxref] = useState('');

  const { NETHONE_SRC } = useEnv();
  const nethoneMutation = useNethoneCheckMutation();

  const handleSetNethoneTxref = async (txref: string) => {
    setIsNethoneCheck(false);
    setIsNethoneFailed(false);

    if (txref) {
      if ((window as ExtendWindow)?.dftp) {
        (window as ExtendWindow).dftp = null;
      }

      await handleLoad();

      // from the docs, this should be set once till reload
      // https://panel.nethone.io/api-docs/fingerprint/web_services_cdn.html#page-lifecycle
      handleInit({
        attemptReference: `${txref}`, // inserted by the backend
        sensitiveFields: ['ccn', 'cvv'] // list of sensitive fields
      });
      setUsedTxref(txref);
    }
  };

  const handleLoad = useCallback(async () => {
    if ((window as ExtendWindow)?.dftp) {
      return;
    } else {
      try {
        await loadjs(NETHONE_SRC, {
          returnPromise: true,
          before: (path, scriptEl: HTMLScriptElement) => (scriptEl.crossOrigin = 'use-credentials')
        });
      } catch (error) {
        console.error(error, 'err');
      }
    }
  }, [NETHONE_SRC]);

  const handleInit = useCallback((profilerOptions: ProfilerOptions) => {
    if ((window as ExtendWindow)?.dftp) {
      (window as ExtendWindow).dftp?.init(profilerOptions);
    }
  }, []);

  const handleNethoneCheck = useCallback(async () => {
    try {
      if ((window as ExtendWindow)?.dftp) {
        await (window as ExtendWindow).dftp?.profileCompleted();
      }

      const nethoneData = await nethoneMutation.mutateAsync({ txref: usedTxref });

      if (nethoneData?.ResponseMessage === 'Successful') {
        setIsNethoneCheck(true);
        setIsNethoneFailed(false);

        if ((window as ExtendWindow)?.dftp) {
          (window as ExtendWindow).dftp?.finishBehavGathering();
        }
      }
    } catch (error) {
      console.log(error);
      setIsNethoneFailed(true);
      setIsNethoneCheck(false);

      if ((window as ExtendWindow)?.dftp) {
        (window as ExtendWindow).dftp?.finishBehavGathering();
      }
    }
  }, [usedTxref]);

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

  const value: NethoneContext = { handleSetNethoneTxref, isNethoneCheck, isNethoneFailed };

  return <Context.Provider value={value} {...props} />;
};

const useNethone = () => {
  const context = React.useContext(Context);
  if (isUndefined(context)) {
    throw new Error(`useNethone must be used within a NethoneProvider`);
  }

  return { ...context };
};

export type { NethoneContext };
export { NethoneProvider, useNethone };
