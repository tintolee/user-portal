import { format } from 'date-fns';
import { mastercard, verve, visa } from '../assets';

export const formatDate = (date: string) => {
  return format(new Date(`${date}Z`), 'dd/MM/yyyy hh:mm aaa');
};

export const getImgSrc = (cardType: string) => {
  if (cardType === 'MASTERCARD') {
    return mastercard;
  } else if (cardType === 'VISA') {
    return visa;
  } else if (cardType === 'MAESTRO') {
    return verve;
  }
};
