import ClientApi from '@src/types/client';

export const transformString = (str: ClientApi.RecurringIntervalI) => {
  let value: string;
  if (str === 'bi-anually') {
    value = 'Bi-Anually';
  } else {
    value = `${str[0].toUpperCase()}${str.slice(1)}`;
  }

  return value;
};
