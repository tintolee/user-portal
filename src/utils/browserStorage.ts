// eslint-disable-next-line no-unused-vars
enum StorageType {
  // eslint-disable-next-line no-unused-vars
  temporary = 'temporary',
  // eslint-disable-next-line no-unused-vars
  permanent = 'permanent'
}

export type StorageKey = string;
type StorageI = 'permanent' | 'temporary';

const getItem = (type: StorageType, key: StorageKey): string | null => {
  let fn;
  switch (type) {
    case StorageType.temporary:
      fn = sessionStorage.getItem.bind(sessionStorage);
      break;
    case StorageType.permanent:
      fn = localStorage.getItem.bind(localStorage);
      break;
  }
  return fn(key);
};

const setItem = (type: StorageType, key: StorageKey, value: string): void => {
  let fn;
  switch (type) {
    case StorageType.temporary:
      fn = sessionStorage.setItem.bind(sessionStorage);
      break;
    case StorageType.permanent:
      fn = localStorage.setItem.bind(localStorage);
      break;
  }
  fn(key, value);
};

const clearItem = (type: StorageType, key: StorageKey): void => {
  let clearFn;
  switch (type) {
    case StorageType.temporary:
      clearFn = sessionStorage.removeItem.bind(sessionStorage);
      break;
    case StorageType.permanent:
      clearFn = localStorage.removeItem.bind(localStorage);
      break;
  }
  clearFn(key);
};

const browserStorage = {
  getItem,
  setItem,
  clearItem
};

export default browserStorage;

export const permanentStorage = {
  getItem: (key: StorageKey) => getItem(StorageType.permanent, key),
  setItem: (key: StorageKey, value: string) => setItem(StorageType.permanent, key, value),
  clearItem: (key: StorageKey) => clearItem(StorageType.permanent, key)
};

export const temporaryStorage = {
  getItem: (key: StorageKey) => getItem(StorageType.temporary, key),
  setItem: (key: StorageKey, value: string) => setItem(StorageType.temporary, key, value),
  clearItem: (key: StorageKey) => clearItem(StorageType.temporary, key)
};

export const storage = (type: StorageI = 'temporary') => {
  if (type === 'temporary') return temporaryStorage;

  return permanentStorage;
};
