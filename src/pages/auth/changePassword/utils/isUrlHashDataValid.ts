import { UrlHashData } from './getUrlHashData';
import * as yup from 'yup';

/**
 * Returns true when the url hash data is valid
 * @param data
 */
export const isUrlHashDataValid = (data: UrlHashData): boolean => {
  const emailSchema = yup.string().email();
  return !!(data && data.password && data.email && emailSchema.isValidSync(data.email));
};
