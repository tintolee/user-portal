import State from 'country-state-city/lib/state';
import { useMemo } from 'react';

interface UseGetStatesOptions {
  country: string;
}

const useGetStates = (options: UseGetStatesOptions) => {
  const { country } = options;

  const stateData = useMemo(() => State.getStatesOfCountry(country), [country]);

  return { stateData };
};

export default useGetStates;
