import { useState } from 'react';

interface UseToggleOptions {
  initialState: boolean;
}

const useToggle = (options?: UseToggleOptions) => {
  const [state, setState] = useState(options?.initialState || false);

  const handleTrue = () => setState(true);
  const handleFalse = () => setState(false);

  return { state, handleFalse, handleTrue };
};

export default useToggle;
