import React, { createContext, useContext, ReactNode } from 'react';
import { getEnvData, EnvData } from '@src/utils/env';
import { isUndefined } from '@src/utils/type';

type EnvContext = EnvData;

const Context = createContext<EnvContext | undefined>(undefined);

interface Props {
  children?: ReactNode;
}

const EnvProvider = (props: Props) => {
  const value: EnvContext = getEnvData();

  return <Context.Provider value={value} {...props} />;
};

const useEnv = () => {
  const context = useContext(Context);
  if (isUndefined(context)) {
    throw new Error(`useEnv must be used within an EnvProvider`);
  }

  return context;
};

export type { EnvContext };
export { useEnv, EnvProvider };
