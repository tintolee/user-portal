import { temporaryStorage as storage } from './browserStorage';
import ClientApi from '@src/types/client';
import { getEnvData } from './env';
import { decryptData, encryptData } from './userEncrypt';

type State = {
  hash?: ClientApi.LoggedInData['hash'];
  user?: ClientApi.LoggedInData['user'];
  address?: ClientApi.LoggedInData['address'];
  isBrowserSupportNoticeDismissed?: boolean;
};

const STATE_KEY = 'SPRINT';
export const getState = (): State | undefined => {
  try {
    const serializedState = storage.getItem(STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const encryptionSecret = getEnvData().LOGGED_IN_ENCRYPTION_SECRET;
    const decryptedState = decryptData(serializedState, encryptionSecret);
    return decryptedState as State;
  } catch (err) {
    return undefined;
  }
};

export const setState = (state: State, mergeWithOldState = true): void => {
  try {
    const oldState: State = getState() || {};
    const newState = mergeWithOldState ? { ...oldState, ...state } : state;
    const serializedState = JSON.stringify(newState);

    const encryptionSecret = getEnvData().LOGGED_IN_ENCRYPTION_SECRET;
    const encryptedState = encryptData(serializedState, encryptionSecret);

    storage.setItem(STATE_KEY, encryptedState);
    // eslint-disable-next-line no-empty
  } catch (err) {}
};

export const clearState = (): void => {
  try {
    storage.clearItem(STATE_KEY);
    // eslint-disable-next-line no-empty
  } catch (err) {}
};
