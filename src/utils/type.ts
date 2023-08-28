/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Check if the supplied value is a number
 * @param value
 */
export const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

/**
 * check if the supplied value is undefined
 * @param value
 */
export const isUndefined = (value: any): value is undefined => {
  return typeof value === 'undefined';
};
