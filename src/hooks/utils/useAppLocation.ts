import { useLocation } from 'react-router-dom';
import ClientApi from '@src/types/client';

/**
 * This is a custom useLocation hook
 * It gives us the flexibility to extend the location types
 *
 * @returns () => AppLocationState
 */
export const useAppLocation = (): ClientApi.AppLocationState =>
  useLocation() as ClientApi.AppLocationState;
