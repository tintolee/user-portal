/**
 * Format phone number for International format (by removing prepending zeros)
 * @param phone
 */
export const formatIntl = (phone: string): string => {
  return phone.replace(/^[0]*/, '');
};
