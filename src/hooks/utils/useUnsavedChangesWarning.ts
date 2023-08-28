/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { History, Location } from 'history';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

/**
 *This brings a prompt to the user if there is an activity like filling a form,
 that the user has started and the page is either refreshed or route change
 * 
 * @param message
 * @returns  handleDirtyState - a function to set the dirty state
 */
const useUnsavedChangesWarning = (
  dirtyState: boolean | undefined,
  handleBlockedNavigation: (nextLocation: Location) => boolean
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDirty, setIsDirty] = useState(dirtyState);

  const message = '';

  // this effect handles the reload of the page
  useEffect(() => {
    if (dirtyState) {
      window.onbeforeunload = () => message;
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [dirtyState, message]);

  // this hook handles the change of routes
  usePrompt(handleBlockedNavigation, dirtyState);

  const handleDirtyState = (arg: boolean) => setIsDirty(arg);

  return { handleDirtyState };
};

type ExtendNavigator = Navigator & Pick<History, 'block'>;

// export const useBlocker = (blocker: (tx: Transition) => void, when = true) => {
export const useBlocker = (
  handleBlockedNavigation: (nextLocation: Location) => boolean,
  when = true
) => {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unblock = (navigator as any as ExtendNavigator)?.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        }
      };

      handleBlockedNavigation(autoUnblockingTx.location);
    });

    return unblock;
  }, [navigator, handleBlockedNavigation, when]);
  // }, [navigator, blocker, when]);
};

// export const usePrompt = (message: string, when = true) => {
export const usePrompt = (
  handleBlockedNavigation: (nextLocation: Location) => boolean,
  when = true
) => {
  // const blocker = useCallback(
  //   (tx: Transition) => {
  //     if (window.confirm(message)) tx.retry();
  //   },
  //   [message]
  // );

  useBlocker(handleBlockedNavigation, when);
};

export default useUnsavedChangesWarning;
